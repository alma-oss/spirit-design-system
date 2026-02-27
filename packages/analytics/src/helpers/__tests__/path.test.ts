import { path } from 'zx';
import { getOutputPath } from '../path';

jest.mock('zx', () => ({
  path: {
    resolve: jest.fn((...args: string[]) => args.join('/')),
  },
}));

jest.mock('../../constants', () => ({
  OUTPUT_DIR: 'mocked-output-dir',
  OUTPUT_FILENAME_PREFIX: 'spirit-example',
}));

describe('path', () => {
  describe('getOutputPath', () => {
    it('should use the provided outputPath if available', () => {
      const outputPath = '/path/to/output';
      const name = 'example';
      const result = getOutputPath(outputPath, name);

      expect(path.resolve).toHaveBeenCalledWith(outputPath, `spirit-example-${name}.json`);
      expect(result).toBe(`${outputPath}/spirit-example-${name}.json`);
    });

    it('should use process.cwd() and OUTPUT_DIR if outputPath is not provided', () => {
      const name = 'another-example';
      const result = getOutputPath('', name);

      expect(path.resolve).toHaveBeenCalledWith(process.cwd(), `mocked-output-dir/spirit-example-${name}.json`);
      expect(result).toBe(`${process.cwd()}/mocked-output-dir/spirit-example-${name}.json`);
    });
  });
});
