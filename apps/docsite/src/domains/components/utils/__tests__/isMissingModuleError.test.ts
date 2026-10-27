import { isMissingModuleError } from '../isMissingModuleError';

describe('isMissingModuleError', () => {
  it.each([
    ['fs ENOENT error', { code: 'ENOENT' }],
    ['MODULE_NOT_FOUND error', { code: 'MODULE_NOT_FOUND' }],
    ['"Cannot find module" error', new Error('Cannot find module ./missing')],
    ['"Cannot find module" error in a different letter case', new Error('cannot find module ./missing')],
    ['plain object from another realm', { message: 'Cannot find module x' }],
  ])('should return true for %s', (_, error) => {
    expect(isMissingModuleError(error)).toBe(true);
  });

  it.each([
    ['null', null],
    ['undefined', undefined],
    ['string', 'Cannot find module'],
    ['number', 404],
    ['error with a different code', { code: 'EACCES' }],
    ['error with a non-string code', { code: 404 }],
    ['generic error', new Error('boom')],
    ['object without code and message', {}],
  ])('should return false for %s', (_, error) => {
    expect(isMissingModuleError(error)).toBe(false);
  });
});
