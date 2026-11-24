/**
 * Host that serves this docsite today.
 * https://spirit.design is the production domain once the docsite is finalized and that
 * domain is attached. Until then, links must use the host that actually serves `?format=md`.
 */
export const NETLIFY_DOC_SITE_ORIGIN = 'https://spirit-design-system-docsite.netlify.app';

const configuredOrigin = (value: string | undefined): string | undefined => {
  const origin = value?.trim().replace(/\/$/, '');

  return origin || undefined;
};

/**
 * Absolute origin for documentation links and metadata.
 *
 * 1. `NEXT_PUBLIC_SITE_URL`, for an explicit override such as `https://spirit.design`
 * 2. `DEPLOY_PRIME_URL` on a Netlify deploy preview or branch deploy
 * 3. `URL`, Netlify's primary site address (this becomes `https://spirit.design` when that domain is attached)
 * 4. the current Netlify site
 */
export const getSiteOrigin = (): string => {
  const configured = configuredOrigin(process.env.NEXT_PUBLIC_SITE_URL);

  if (configured) {
    return configured;
  }

  const context = process.env.CONTEXT;
  const prime = configuredOrigin(process.env.DEPLOY_PRIME_URL);

  if ((context === 'deploy-preview' || context === 'branch-deploy') && prime) {
    return prime;
  }

  return configuredOrigin(process.env.URL) ?? NETLIFY_DOC_SITE_ORIGIN;
};
