import { createHash, createSign, timingSafeEqual } from 'node:crypto';

import { getDeployStore, getStore, type Store } from '@netlify/blobs';
import type { Config } from '@netlify/functions';

const MAX_BODY_BYTES = 64 * 1024;
const MAX_EVENT_AGE_MS = 4 * 60 * 60 * 1000;
const MAX_EVENT_CLOCK_SKEW_MS = 5 * 60 * 1000;
const DELIVERY_STORE_NAME = 'figma-assets-webhook-deliveries';
const GITHUB_API_ORIGIN = 'https://api.github.com';
const GITHUB_API_VERSION = '2022-11-28';
const GITHUB_REPOSITORY = 'alma-oss/spirit-design-system';
const DISPATCH_EVENT_TYPE = 'figma-library-publish';

type FetchImplementation = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

interface HandlerDependencies {
  deliveryStore: DeliveryStore;
  fetchImplementation: FetchImplementation;
  getEnvironmentVariable: (name: string) => string | undefined;
  now: () => number;
}

interface DeliveryStore {
  claim: (key: string) => Promise<boolean>;
  complete: (key: string) => Promise<void>;
  release: (key: string) => Promise<void>;
}

interface DispatchConfig {
  clientId: string;
  fileKey: string;
  installationId: string;
  privateKey: string;
  webhookId: string;
}

const jsonResponse = (status: number, message: string, headers?: HeadersInit): Response =>
  Response.json(
    { message },
    {
      status,
      headers,
    },
  );

const isJsonRequest = (request: Request): boolean =>
  request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase() === 'application/json';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const readRequiredEnvironmentVariable = (
  getEnvironmentVariable: HandlerDependencies['getEnvironmentVariable'],
  name: string,
): string => {
  const value = getEnvironmentVariable(name)?.trim();

  if (!value) {
    throw new Error('Webhook configuration is incomplete.');
  }

  return value;
};

const secretsMatch = (actual: unknown, expected: string): boolean => {
  if (typeof actual !== 'string') {
    return false;
  }

  const actualHash = createHash('sha256').update(actual).digest();
  const expectedHash = createHash('sha256').update(expected).digest();

  return timingSafeEqual(actualHash, expectedHash);
};

export const createNetlifyDeliveryStore = (store: Pick<Store, 'delete' | 'set'>): DeliveryStore => ({
  claim: async (key) => (await store.set(key, 'processing', { onlyIfNew: true })).modified,
  complete: async (key) => {
    await store.set(key, 'complete');
  },
  release: async (key) => {
    await store.delete(key);
  },
});

export const selectNetlifyBlobStore = (deployContext: string, globalStore: Store, deployStore: Store): Store =>
  deployContext === 'production' ? globalStore : deployStore;

const createDeliveryKey = (payload: Record<string, unknown>, now: number): string | null => {
  if (typeof payload.timestamp !== 'string') {
    return null;
  }

  const eventTimestamp = Date.parse(payload.timestamp);
  const eventAge = now - eventTimestamp;

  if (!Number.isFinite(eventTimestamp) || eventAge > MAX_EVENT_AGE_MS || eventAge < -MAX_EVENT_CLOCK_SKEW_MS) {
    return null;
  }

  const fingerprint = createHash('sha256')
    .update(JSON.stringify([payload.event_type, payload.file_key, String(payload.webhook_id), payload.timestamp]))
    .digest('hex');

  return `deliveries/${fingerprint}`;
};

const toBase64Url = (value: object): string => Buffer.from(JSON.stringify(value)).toString('base64url');

const createGitHubAppJwt = (clientId: string, privateKey: string, now: number): string => {
  const issuedAt = Math.floor(now / 1000) - 60;
  const header = toBase64Url({ alg: 'RS256', typ: 'JWT' });
  const payload = toBase64Url({
    iat: issuedAt,
    exp: issuedAt + 9 * 60,
    iss: clientId,
  });
  const unsignedToken = `${header}.${payload}`;
  const signature = createSign('RSA-SHA256')
    .update(unsignedToken)
    .end()
    .sign(privateKey.replace(/\\n/g, '\n'))
    .toString('base64url');

  return `${unsignedToken}.${signature}`;
};

const loadDispatchConfig = (getEnvironmentVariable: HandlerDependencies['getEnvironmentVariable']): DispatchConfig => {
  const repository = readRequiredEnvironmentVariable(getEnvironmentVariable, 'GITHUB_REPOSITORY');
  const installationId = readRequiredEnvironmentVariable(getEnvironmentVariable, 'GH_APP_INSTALLATION_ID');
  const webhookId = readRequiredEnvironmentVariable(getEnvironmentVariable, 'FIGMA_WEBHOOK_ID');

  if (repository !== GITHUB_REPOSITORY || !/^\d+$/.test(installationId) || !/^\d+$/.test(webhookId)) {
    throw new Error('Webhook configuration is invalid.');
  }

  return {
    clientId: readRequiredEnvironmentVariable(getEnvironmentVariable, 'GH_APP_CLIENT_ID'),
    fileKey: readRequiredEnvironmentVariable(getEnvironmentVariable, 'FIGMA_ASSETS_FILE_KEY'),
    installationId,
    privateKey: readRequiredEnvironmentVariable(getEnvironmentVariable, 'GH_APP_PRIVATE_KEY'),
    webhookId,
  };
};

const getInstallationToken = async (config: DispatchConfig, dependencies: HandlerDependencies): Promise<string> => {
  const jwt = createGitHubAppJwt(config.clientId, config.privateKey, dependencies.now());
  const response = await dependencies.fetchImplementation(
    `${GITHUB_API_ORIGIN}/app/installations/${config.installationId}/access_tokens`,
    {
      method: 'POST',
      headers: {
        accept: 'application/vnd.github+json',
        authorization: `Bearer ${jwt}`,
        'content-type': 'application/json',
        'x-github-api-version': GITHUB_API_VERSION,
      },
      body: JSON.stringify({
        repositories: ['spirit-design-system'],
        permissions: {
          contents: 'write',
        },
      }),
    },
  );

  if (response.status !== 201) {
    throw new Error('GitHub rejected installation authentication.');
  }

  const body: unknown = await response.json();

  if (!isRecord(body) || typeof body.token !== 'string' || body.token.length === 0) {
    throw new Error('GitHub returned an invalid installation token.');
  }

  return body.token;
};

const dispatchSync = async (config: DispatchConfig, dependencies: HandlerDependencies): Promise<void> => {
  const token = await getInstallationToken(config, dependencies);
  const response = await dependencies.fetchImplementation(
    `${GITHUB_API_ORIGIN}/repos/${GITHUB_REPOSITORY}/dispatches`,
    {
      method: 'POST',
      headers: {
        accept: 'application/vnd.github+json',
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
        'x-github-api-version': GITHUB_API_VERSION,
      },
      body: JSON.stringify({
        event_type: DISPATCH_EVENT_TYPE,
        client_payload: {
          file_key: config.fileKey,
          webhook_id: config.webhookId,
        },
      }),
    },
  );

  if (response.status !== 204) {
    throw new Error('GitHub rejected repository dispatch.');
  }
};

const parsePayload = async (request: Request): Promise<Record<string, unknown> | Response> => {
  const contentLength = Number(request.headers.get('content-length') ?? 0);

  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return jsonResponse(413, 'Request body is too large.');
  }

  const body = await request.text();

  if (Buffer.byteLength(body, 'utf8') > MAX_BODY_BYTES) {
    return jsonResponse(413, 'Request body is too large.');
  }

  try {
    const payload: unknown = JSON.parse(body);

    return isRecord(payload) ? payload : jsonResponse(400, 'Invalid request.');
  } catch {
    return jsonResponse(400, 'Invalid request.');
  }
};

export const createWebhookHandler =
  (dependencies: HandlerDependencies) =>
  async (request: Request): Promise<Response> => {
    if (request.method !== 'POST') {
      return jsonResponse(405, 'Method not allowed.', { allow: 'POST' });
    }

    if (!isJsonRequest(request)) {
      return jsonResponse(415, 'Content type must be application/json.');
    }

    const payload = await parsePayload(request);

    if (payload instanceof Response) {
      return payload;
    }

    let passcode: string;

    try {
      passcode = readRequiredEnvironmentVariable(dependencies.getEnvironmentVariable, 'FIGMA_WEBHOOK_PASSCODE');
    } catch {
      return jsonResponse(500, 'Webhook is not configured.');
    }

    if (!secretsMatch(payload.passcode, passcode)) {
      return jsonResponse(400, 'Invalid request.');
    }

    if (payload.event_type === 'PING') {
      return jsonResponse(200, 'Webhook verified.');
    }

    if (payload.event_type !== 'LIBRARY_PUBLISH') {
      return jsonResponse(400, 'Unsupported event.');
    }

    let config: DispatchConfig;

    try {
      config = loadDispatchConfig(dependencies.getEnvironmentVariable);
    } catch {
      return jsonResponse(500, 'Webhook is not configured.');
    }

    if (payload.file_key !== config.fileKey || String(payload.webhook_id) !== config.webhookId) {
      return jsonResponse(403, 'Event is not allowed.');
    }

    const deliveryKey = createDeliveryKey(payload, dependencies.now());

    if (!deliveryKey) {
      return jsonResponse(403, 'Event is not current.');
    }

    let claimed: boolean;

    try {
      claimed = await dependencies.deliveryStore.claim(deliveryKey);
    } catch {
      return jsonResponse(502, 'Unable to verify event delivery.');
    }

    if (!claimed) {
      return jsonResponse(200, 'Event already processed.');
    }

    try {
      await dispatchSync(config, dependencies);
    } catch {
      try {
        await dependencies.deliveryStore.release(deliveryKey);
      } catch {
        // Preserve the original retryable dispatch error without exposing storage details.
      }

      return jsonResponse(502, 'Unable to dispatch synchronization.');
    }

    try {
      await dependencies.deliveryStore.complete(deliveryKey);
    } catch {
      return jsonResponse(502, 'Unable to record event delivery.');
    }

    return jsonResponse(200, 'Synchronization dispatched.');
  };

export default async (request: Request): Promise<Response> => {
  let deliveryStore: DeliveryStore | undefined;
  const getDeliveryStore = (): DeliveryStore => {
    if (!deliveryStore) {
      const blobStoreOptions = { consistency: 'strong' as const };
      const store =
        Netlify.context?.deploy.context === 'production'
          ? getStore(DELIVERY_STORE_NAME, blobStoreOptions)
          : getDeployStore(DELIVERY_STORE_NAME, blobStoreOptions);
      deliveryStore = createNetlifyDeliveryStore(store);
    }

    return deliveryStore;
  };

  return createWebhookHandler({
    deliveryStore: {
      claim: (key) => getDeliveryStore().claim(key),
      complete: (key) => getDeliveryStore().complete(key),
      release: (key) => getDeliveryStore().release(key),
    },
    fetchImplementation: fetch,
    getEnvironmentVariable: (name) => Netlify.env.get(name),
    now: Date.now,
  })(request);
};

export const config: Config = {
  path: '/webhooks/figma-assets',
};
