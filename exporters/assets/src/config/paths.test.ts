import { assertRelativeOutputPath } from './paths';

describe('assertRelativeOutputPath', () => {
  it('rejects absolute and parent-directory output paths', () => {
    expect(() => assertRelativeOutputPath('/tmp/svg')).toThrow(/relative path/);
    expect(() => assertRelativeOutputPath('C:\\Windows\\Temp')).toThrow(/relative path/);
    expect(() => assertRelativeOutputPath('../escape')).toThrow(/\.\./);
    expect(() => assertRelativeOutputPath('packages/icons/src/svg')).not.toThrow();
  });
});
