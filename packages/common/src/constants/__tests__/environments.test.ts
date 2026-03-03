import { isDevelopment, isProduction, isTesting } from '../environments';

describe('environments', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    // Most important - it clears the cache
    jest.resetModules();
    // Make a copy
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    // Restore old environment
    process.env = OLD_ENV;
  });

  describe('isDevelopment', () => {
    it('should return true when NODE_ENV is set to `development`', () => {
      process.env.NODE_ENV = 'development';

      expect(isDevelopment()).toBeTruthy();
    });

    it('should return false when NODE_ENV is not set to `development`', () => {
      process.env.NODE_ENV = 'production';

      expect(isDevelopment()).toBeFalsy();
    });
  });

  describe('isTesting', () => {
    it('should return true when NODE_ENV is set to `testing`', () => {
      process.env.NODE_ENV = 'testing';

      expect(isTesting()).toBeTruthy();
    });

    it('should return false when NODE_ENV is not set to `testing`', () => {
      process.env.NODE_ENV = 'production';

      expect(isTesting()).toBeFalsy();
    });
  });

  describe('isProduction', () => {
    it('should return true when NODE_ENV is set to `production`', () => {
      process.env.NODE_ENV = 'production';

      expect(isProduction()).toBeTruthy();
    });

    it('should return false when NODE_ENV is not set to `production`', () => {
      process.env.NODE_ENV = 'development';

      expect(isProduction()).toBeFalsy();
    });
  });
});
