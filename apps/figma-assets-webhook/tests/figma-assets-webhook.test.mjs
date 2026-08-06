import assert from 'node:assert/strict';
import { generateKeyPairSync } from 'node:crypto';
import test from 'node:test';

import webhook, {
  config,
  createNetlifyDeliveryStore,
  createWebhookHandler,
  selectNetlifyBlobStore,
} from '../netlify/functions/figma-assets-webhook.mts';

const PASSPHRASE = 'correct horse battery staple';
const FILE_KEY = 'UMd06VnGrAE5xheb4C8QEg';
const WEBHOOK_ID = '123456';
const NOW = Date.UTC(2026, 7, 6, 9, 0, 0);
const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const PRIVATE_KEY = privateKey.export({ format: 'pem', type: 'pkcs8' }).toString();

const DEFAULT_ENVIRONMENT = {
  FIGMA_ASSETS_FILE_KEY: FILE_KEY,
  FIGMA_WEBHOOK_ID: WEBHOOK_ID,
  FIGMA_WEBHOOK_PASSCODE: PASSPHRASE,
  GH_APP_CLIENT_ID: 'Iv23liTestClient',
  GH_APP_INSTALLATION_ID: '987654',
  GH_APP_PRIVATE_KEY: PRIVATE_KEY,
  GITHUB_REPOSITORY: 'alma-oss/spirit-design-system',
};

const jsonRequest = (body, headers = {}) =>
  new Request('https://example.netlify.app/webhooks/figma-assets', {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...headers,
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

const environmentReader = (environment = DEFAULT_ENVIRONMENT) => (name) => environment[name];

const successfulFetch = async (_input, init) =>
  init?.body?.includes('"repositories"')
    ? Response.json({ token: 'installation-token' }, { status: 201 })
    : new Response(null, { status: 204 });

const createMemoryDeliveryStore = () => ({
  claim: async () => true,
  complete: async () => undefined,
  release: async () => undefined,
});

const createHandler = ({
  deliveryStore = createMemoryDeliveryStore(),
  environment = DEFAULT_ENVIRONMENT,
  fetchImplementation = successfulFetch,
} = {}) =>
  createWebhookHandler({
    deliveryStore,
    fetchImplementation,
    getEnvironmentVariable: environmentReader(environment),
    now: () => NOW,
  });

const libraryPublish = (overrides = {}) => ({
  event_type: 'LIBRARY_PUBLISH',
  file_key: FILE_KEY,
  passcode: PASSPHRASE,
  timestamp: new Date(NOW).toISOString(),
  webhook_id: WEBHOOK_ID,
  ...overrides,
});

const assertResponse = async (response, status, message) => {
  assert.equal(response.status, status);
  assert.deepEqual(await response.json(), { message });
};

test('exports the production webhook route', () => {
  assert.deepEqual(config, { path: '/webhooks/figma-assets' });
});

test('adapts a strongly consistent Netlify Blob store for delivery state', async () => {
  const calls = [];
  const store = {
    delete: async (key) => {
      calls.push(['delete', key]);
    },
    set: async (key, value, options) => {
      calls.push(['set', key, value, options]);

      return { modified: true };
    },
  };
  const deliveryStore = createNetlifyDeliveryStore(store);

  assert.equal(await deliveryStore.claim('delivery-key'), true);
  await deliveryStore.complete('delivery-key');
  await deliveryStore.release('delivery-key');
  assert.deepEqual(calls, [
    ['set', 'delivery-key', 'processing', { onlyIfNew: true }],
    ['set', 'delivery-key', 'complete', undefined],
    ['delete', 'delivery-key'],
  ]);
});

test('isolates delivery state by deploy context', () => {
  const globalStore = { name: 'global' };
  const deployStore = { name: 'deploy' };

  assert.equal(selectNetlifyBlobStore('production', globalStore, deployStore), globalStore);
  assert.equal(selectNetlifyBlobStore('deploy-preview', globalStore, deployStore), deployStore);
});

test('rejects unsupported methods', async () => {
  const response = await createHandler()(new Request('https://example.netlify.app', { method: 'GET' }));

  await assertResponse(response, 405, 'Method not allowed.');
  assert.equal(response.headers.get('allow'), 'POST');
});

test('requires a JSON content type', async () => {
  const request = new Request('https://example.netlify.app', {
    method: 'POST',
    body: '{}',
  });

  await assertResponse(await createHandler()(request), 415, 'Content type must be application/json.');
});

test('rejects a body declared above the size limit', async () => {
  const request = jsonRequest(libraryPublish(), { 'content-length': String(64 * 1024 + 1) });

  await assertResponse(await createHandler()(request), 413, 'Request body is too large.');
});

test('rejects an actual body above the size limit', async () => {
  const request = jsonRequest(`{"padding":"${'a'.repeat(64 * 1024)}"}`);

  await assertResponse(await createHandler()(request), 413, 'Request body is too large.');
});

test('rejects malformed and non-object JSON payloads', async () => {
  const handler = createHandler();

  await assertResponse(await handler(jsonRequest('{')), 400, 'Invalid request.');
  await assertResponse(await handler(jsonRequest([])), 400, 'Invalid request.');
  await assertResponse(await handler(jsonRequest(null)), 400, 'Invalid request.');
});

test('fails closed when the webhook passcode is missing or blank', async () => {
  const missingPasscode = { ...DEFAULT_ENVIRONMENT };
  const blankPasscode = { ...DEFAULT_ENVIRONMENT, FIGMA_WEBHOOK_PASSCODE: ' ' };

  delete missingPasscode.FIGMA_WEBHOOK_PASSCODE;

  await assertResponse(
    await createHandler({ environment: missingPasscode })(jsonRequest(libraryPublish())),
    500,
    'Webhook is not configured.',
  );
  await assertResponse(
    await createHandler({ environment: blankPasscode })(jsonRequest(libraryPublish())),
    500,
    'Webhook is not configured.',
  );
});

test('rejects missing and incorrect passcodes', async () => {
  const handler = createHandler();

  await assertResponse(
    await handler(jsonRequest(libraryPublish({ passcode: undefined }))),
    400,
    'Invalid request.',
  );
  await assertResponse(await handler(jsonRequest(libraryPublish({ passcode: 'wrong' }))), 400, 'Invalid request.');
});

test('acknowledges an authenticated PING before webhook ID configuration', async () => {
  const environment = {
    FIGMA_WEBHOOK_PASSCODE: PASSPHRASE,
  };
  const request = jsonRequest({
    event_type: 'PING',
    passcode: PASSPHRASE,
    webhook_id: WEBHOOK_ID,
  });

  await assertResponse(await createHandler({ environment })(request), 200, 'Webhook verified.');
});

test('rejects unsupported authenticated events', async () => {
  await assertResponse(
    await createHandler()(jsonRequest({ event_type: 'FILE_UPDATE', passcode: PASSPHRASE })),
    400,
    'Unsupported event.',
  );
});

test('fails closed for incomplete and invalid dispatch configuration', async () => {
  const cases = [
    { ...DEFAULT_ENVIRONMENT, GITHUB_REPOSITORY: 'attacker/repository' },
    { ...DEFAULT_ENVIRONMENT, GH_APP_INSTALLATION_ID: '../1' },
    { ...DEFAULT_ENVIRONMENT, FIGMA_WEBHOOK_ID: 'not-numeric' },
    { ...DEFAULT_ENVIRONMENT, GH_APP_CLIENT_ID: '' },
    { ...DEFAULT_ENVIRONMENT, FIGMA_ASSETS_FILE_KEY: '' },
    { ...DEFAULT_ENVIRONMENT, GH_APP_PRIVATE_KEY: '' },
  ];

  for (const environment of cases) {
    await assertResponse(
      await createHandler({ environment })(jsonRequest(libraryPublish())),
      500,
      'Webhook is not configured.',
    );
  }
});

test('rejects events from another file or webhook', async () => {
  const handler = createHandler();

  await assertResponse(
    await handler(jsonRequest(libraryPublish({ file_key: 'another-file' }))),
    403,
    'Event is not allowed.',
  );
  await assertResponse(
    await handler(jsonRequest(libraryPublish({ webhook_id: '654321' }))),
    403,
    'Event is not allowed.',
  );
});

test('rejects events without a current Figma timestamp', async () => {
  const handler = createHandler();
  const cases = [
    { timestamp: undefined },
    { timestamp: 'not-a-date' },
    { timestamp: new Date(NOW - 4 * 60 * 60 * 1000 - 1).toISOString() },
    { timestamp: new Date(NOW + 5 * 60 * 1000 + 1).toISOString() },
  ];

  for (const overrides of cases) {
    await assertResponse(
      await handler(jsonRequest(libraryPublish(overrides))),
      403,
      'Event is not current.',
    );
  }
});

test('returns a retryable error when delivery state cannot be claimed', async () => {
  const deliveryStore = {
    ...createMemoryDeliveryStore(),
    claim: async () => {
      throw new Error('storage unavailable');
    },
  };

  await assertResponse(
    await createHandler({ deliveryStore })(jsonRequest(libraryPublish())),
    502,
    'Unable to verify event delivery.',
  );
});

test('acknowledges duplicate delivery without dispatching it again', async () => {
  const deliveryStore = {
    ...createMemoryDeliveryStore(),
    claim: async () => false,
  };
  const fetchImplementation = async () => {
    throw new Error('GitHub must not be called');
  };

  await assertResponse(
    await createHandler({ deliveryStore, fetchImplementation })(jsonRequest(libraryPublish())),
    200,
    'Event already processed.',
  );
});

test('returns a retryable error when the GitHub private key is invalid', async () => {
  const environment = {
    ...DEFAULT_ENVIRONMENT,
    GH_APP_PRIVATE_KEY: 'not-a-private-key',
  };

  await assertResponse(
    await createHandler({ environment })(jsonRequest(libraryPublish())),
    502,
    'Unable to dispatch synchronization.',
  );
});

test('returns a retryable error when GitHub rejects installation authentication', async () => {
  const fetchImplementation = async () => new Response(null, { status: 401 });

  await assertResponse(
    await createHandler({ fetchImplementation })(jsonRequest(libraryPublish())),
    502,
    'Unable to dispatch synchronization.',
  );
});

test('rejects invalid GitHub installation token responses', async () => {
  for (const tokenBody of [[], { token: 123 }, { token: '' }]) {
    const fetchImplementation = async () => Response.json(tokenBody, { status: 201 });

    await assertResponse(
      await createHandler({ fetchImplementation })(jsonRequest(libraryPublish())),
      502,
      'Unable to dispatch synchronization.',
    );
  }
});

test('returns a retryable error when GitHub rejects repository dispatch', async () => {
  let requestCount = 0;
  const fetchImplementation = async () => {
    requestCount += 1;

    return requestCount === 1
      ? Response.json({ token: 'installation-token' }, { status: 201 })
      : Response.json({ message: 'Forbidden' }, { status: 403 });
  };

  await assertResponse(
    await createHandler({ fetchImplementation })(jsonRequest(libraryPublish())),
    502,
    'Unable to dispatch synchronization.',
  );
});

test('preserves the dispatch error when releasing delivery state also fails', async () => {
  const deliveryStore = {
    ...createMemoryDeliveryStore(),
    release: async () => {
      throw new Error('storage unavailable');
    },
  };
  const fetchImplementation = async () => new Response(null, { status: 401 });

  await assertResponse(
    await createHandler({ deliveryStore, fetchImplementation })(jsonRequest(libraryPublish())),
    502,
    'Unable to dispatch synchronization.',
  );
});

test('returns a retryable error when completed delivery state cannot be recorded', async () => {
  const deliveryStore = {
    ...createMemoryDeliveryStore(),
    complete: async () => {
      throw new Error('storage unavailable');
    },
  };

  await assertResponse(
    await createHandler({ deliveryStore })(jsonRequest(libraryPublish())),
    502,
    'Unable to record event delivery.',
  );
});

test('mints a scoped installation token and dispatches the sync event', async () => {
  const requests = [];
  const fetchImplementation = async (input, init) => {
    requests.push({ input: input.toString(), init });

    return requests.length === 1
      ? Response.json({ token: 'installation-token' }, { status: 201 })
      : new Response(null, { status: 204 });
  };
  const request = jsonRequest(libraryPublish(), { 'content-length': 'invalid' });

  await assertResponse(
    await createHandler({ fetchImplementation })(request),
    200,
    'Synchronization dispatched.',
  );
  assert.equal(
    requests[0].input,
    'https://api.github.com/app/installations/987654/access_tokens',
  );
  assert.match(requests[0].init.headers.authorization, /^Bearer [^.]+\.[^.]+\.[^.]+$/);
  assert.deepEqual(JSON.parse(requests[0].init.body), {
    repositories: ['spirit-design-system'],
    permissions: { contents: 'write' },
  });
  assert.equal(
    requests[1].input,
    'https://api.github.com/repos/alma-oss/spirit-design-system/dispatches',
  );
  assert.equal(requests[1].init.headers.authorization, 'Bearer installation-token');
  assert.deepEqual(JSON.parse(requests[1].init.body), {
    event_type: 'figma-library-publish',
    client_payload: {
      file_key: FILE_KEY,
      webhook_id: WEBHOOK_ID,
    },
  });
});

test('uses Netlify services and environment variables in the production handler', async (context) => {
  const originalNetlify = globalThis.Netlify;
  const originalFetch = globalThis.fetch;
  const originalBlobsContext = globalThis.netlifyBlobsContext;
  const requests = [];
  let rejectGitHubAuthentication = false;
  globalThis.netlifyBlobsContext = Buffer.from(
    JSON.stringify({
      deployID: '6a704c26ff7fe30008333ac6',
      edgeURL: 'https://example.netlify.app/.netlify/blobs',
      primaryRegion: 'eu-central-1',
      siteID: 'test-site',
      token: 'test-token',
      uncachedEdgeURL: 'https://example.netlify.app/.netlify/blobs-uncached',
    }),
  ).toString('base64');
  globalThis.Netlify = {
    context: {
      deploy: {
        context: 'production',
      },
    },
    env: {
      get: environmentReader(DEFAULT_ENVIRONMENT),
    },
  };
  globalThis.fetch = async (input, init) => {
    const url = input.toString();
    requests.push({ method: init?.method, url });

    if (url.endsWith('/access_tokens') && rejectGitHubAuthentication) {
      return new Response(null, { status: 401 });
    }

    if (url.endsWith('/access_tokens')) {
      return Response.json({ token: 'installation-token' }, { status: 201 });
    }

    if (url.endsWith('/dispatches')) {
      return new Response(null, { status: 204 });
    }

    return new Response(null, { status: 200, headers: { etag: 'test-etag' } });
  };
  context.after(() => {
    globalThis.Netlify = originalNetlify;
    globalThis.fetch = originalFetch;
    globalThis.netlifyBlobsContext = originalBlobsContext;
  });

  const request = jsonRequest(libraryPublish({ timestamp: new Date().toISOString() }));
  const response = await webhook(request);

  assert.equal(
    response.status,
    200,
    JSON.stringify({ body: await response.clone().text(), requests }),
  );
  await assertResponse(response, 200, 'Synchronization dispatched.');

  globalThis.Netlify.context.deploy.context = 'deploy-preview';
  rejectGitHubAuthentication = true;

  await assertResponse(
    await webhook(jsonRequest(libraryPublish({ timestamp: new Date(Date.now() + 1).toISOString() }))),
    502,
    'Unable to dispatch synchronization.',
  );
});
