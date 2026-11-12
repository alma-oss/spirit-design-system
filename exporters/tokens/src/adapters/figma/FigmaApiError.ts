export class FigmaApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FigmaApiError';
  }
}
