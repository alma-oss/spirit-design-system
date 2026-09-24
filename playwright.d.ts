declare global {
  interface PlaywrightTestConfig {
    use?: {
      pageRetries?: number;
    } & Record<string, unknown>;
  }
}
