import { getSiteOrigin, SITE_ORIGIN } from '../siteOrigin';

const ENV_KEYS = ['NEXT_PUBLIC_SITE_URL', 'CONTEXT', 'DEPLOY_PRIME_URL', 'URL'] as const;

describe('getSiteOrigin', () => {
  const previous = new Map<string, string | undefined>();

  beforeEach(() => {
    ENV_KEYS.forEach((key) => {
      previous.set(key, process.env[key]);
      delete process.env[key];
    });
  });

  afterEach(() => {
    ENV_KEYS.forEach((key) => {
      const value = previous.get(key);

      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    });
  });

  it('prefers an explicit site url', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://spirit.design/';
    process.env.CONTEXT = 'deploy-preview';
    process.env.DEPLOY_PRIME_URL = 'https://preview.example';

    expect(getSiteOrigin()).toBe('https://spirit.design');
  });

  it('uses the deploy prime url for previews and branch deploys', () => {
    process.env.CONTEXT = 'branch-deploy';
    process.env.DEPLOY_PRIME_URL = 'https://branch--spirit-design-system-docsite.netlify.app/';
    process.env.URL = 'https://spirit.design';

    expect(getSiteOrigin()).toBe('https://branch--spirit-design-system-docsite.netlify.app');
  });

  it('uses the netlify primary url outside a preview', () => {
    process.env.CONTEXT = 'production';
    process.env.URL = 'https://spirit.design';
    process.env.DEPLOY_PRIME_URL = 'https://deploy-preview--spirit-design-system-docsite.netlify.app';

    expect(getSiteOrigin()).toBe('https://spirit.design');
  });

  it('falls back to the netlify site until a host is configured', () => {
    expect(getSiteOrigin()).toBe(SITE_ORIGIN);
  });
});
