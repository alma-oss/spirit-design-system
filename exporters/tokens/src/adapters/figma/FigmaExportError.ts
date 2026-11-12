export class FigmaExportError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FigmaExportError';
  }
}
