import { isProduction } from '../constants/environments';

const info = (condition: unknown, message: string): void => {
  // don't do anything in production
  // wrapping in production check for better dead code elimination
  if (!isProduction()) {
    // condition passed: do not log
    if (condition) {
      return;
    }

    // Condition not passed
    const text = `Info: ${message}`;

    if (typeof console !== 'undefined') {
      // eslint-disable-next-line no-console -- we want to log a warning; so usage of Console is required
      console.info(text);
    }
  }
};

export default info;
