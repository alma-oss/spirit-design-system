export class FigmaConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FigmaConfigError';
  }
}
