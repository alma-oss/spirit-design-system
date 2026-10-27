import { notFound } from 'next/navigation';
import { guardMissingModule } from '../guardMissingModule';

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('guardMissingModule', () => {
  beforeEach(() => {
    jest.mocked(notFound).mockClear();
  });

  it.each([
    ['fs ENOENT error', { code: 'ENOENT' }],
    ['MODULE_NOT_FOUND error', { code: 'MODULE_NOT_FOUND' }],
    ['"Cannot find module" error', new Error('Cannot find module ./missing')],
  ])('should call notFound for %s', (_, error) => {
    guardMissingModule(error);

    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['generic error', new Error('boom')],
    ['error with a different code', { code: 'EACCES' }],
    ['null', null],
    ['string', 'boom'],
  ])('should not call notFound for %s', (_, error) => {
    expect(() => guardMissingModule(error)).not.toThrow();
    expect(notFound).not.toHaveBeenCalled();
  });
});
