export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  TESTING: 'testing',
  PRODUCTION: 'production',
};

export const isDevelopment = () => process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT;
export const isTesting = () => process.env.NODE_ENV === ENVIRONMENTS.TESTING;
export const isProduction = () => process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION;
