import { FigmaExportError } from './FigmaExportError';

/**
 * Collects the problems of a Figma file while it is mapped, so one run reports all of them at once instead of
 * stopping at the first. Warnings never fail the export.
 */
export class DiagnosticCollector {
  readonly errors: string[] = [];

  readonly warnings: string[] = [];

  error(message: string): void {
    this.errors.push(message);
  }

  warn(message: string): void {
    this.warnings.push(message);
  }

  throwIfErrors(): void {
    if (this.errors.length === 0) {
      return;
    }

    throw new FigmaExportError(`Figma token export failed:\n${this.errors.map((item) => `- ${item}`).join('\n')}`);
  }
}
