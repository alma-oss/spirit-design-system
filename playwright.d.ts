import { PlaywrightTestConfig } from '@playwright/test';

declare global {
  interface PlaywrightTestConfig {
    use?: {
      pageRetries?: number;
    } & any;
  }
}
