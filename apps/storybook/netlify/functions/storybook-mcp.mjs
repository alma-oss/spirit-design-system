import { createStorybookMcpHandler } from '@storybook/mcp';

const handlerPromise = createStorybookMcpHandler({
  manifestProvider: async (request, path) => {
    const origin = new URL(request.url).origin;
    const manifestUrl = new URL(path, origin);
    const response = await fetch(manifestUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch manifest at ${manifestUrl.toString()} (${response.status})`);
    }

    return response.text();
  },
});

const withCors = (headers = {}) => ({
  ...headers,
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST, OPTIONS',
  'access-control-allow-headers': 'content-type, mcp-session-id',
});

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: withCors(),
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: withCors({ allow: 'POST, OPTIONS' }),
      body: 'Method Not Allowed',
    };
  }

  const host = event.headers['x-forwarded-host'] || event.headers.host;
  const protocol = event.headers['x-forwarded-proto'] || 'https';
  const requestUrl = `${protocol}://${host}${event.rawUrl ? new URL(event.rawUrl).pathname : event.path}`;
  const body =
    event.body == null ? undefined : event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body;

  const request = new Request(requestUrl, {
    method: event.httpMethod,
    headers: event.headers,
    body,
  });

  const storybookMcpHandler = await handlerPromise;
  const response = await storybookMcpHandler(request);
  const responseBody = await response.text();

  return {
    statusCode: response.status,
    headers: withCors(Object.fromEntries(response.headers.entries())),
    body: responseBody,
  };
};
