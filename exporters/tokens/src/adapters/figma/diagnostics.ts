import { FigmaExportError } from './FigmaExportError';

/**
 * Collects the problems of a Figma file while it is mapped, so one run reports all of them at once instead of
 * stopping at the first. Warnings never fail the export.
 */
export class DiagnosticCollector {
  readonly errors: string[] = [];

  readonly warnings: string[] = [];

  // A variable is mapped once per mode and the same problem comes up each time, so a finding is kept once.
  error(message: string): void {
    if (!this.errors.includes(message)) {
      this.errors.push(message);
    }
  }

  warn(message: string): void {
    if (!this.warnings.includes(message)) {
      this.warnings.push(message);
    }
  }

  throwIfErrors(): void {
    if (this.errors.length === 0) {
      return;
    }

    throw new FigmaExportError(`Figma token export failed:\n${this.errors.map((item) => `- ${item}`).join('\n')}`);
  }
}
