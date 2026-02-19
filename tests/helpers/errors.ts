/**
 * Custom error classes for distinguishing between different types of failures.
 * These help differentiate between transient issues (that can be retried) and real test failures.
 */

/**
 * Represents a network-related error that may be transient.
 * Examples: connection reset, connection refused, aborted requests
 */
export class NetworkError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);

    this.name = 'NetworkError';
  }
}

/**
 * Represents a timeout error that may be transient.
 * Can occur when page navigation or other operations exceed time limits.
 */
export class TimeoutError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);

    this.name = 'TimeoutError';
  }
}
