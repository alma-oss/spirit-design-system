import { isProduction } from '../constants/environments';

const warning = (condition: unknown, message: string): void => {
  // don't do anything in production
  // wrapping in production check for better dead code elimination
  if (!isProduction()) {
    // condition passed: do not log
    if (condition) {
      return;
    }

    // Condition not passed
    const text = `Warning: ${message}`;

    if (typeof console !== 'undefined') {
      // eslint-disable-next-line no-console -- we want to log a warning; so usage of Console is required
      console.warn(text);
    }

    // Throwing an error and catching it immediately
    // to improve debugging
    // A consumer can use 'pause on caught exceptions'
    // https://github.com/facebook/react/issues/4216
    try {
      throw Error(text);
    } catch (x) {
      // empty
    }
  }
};

export default warning;
