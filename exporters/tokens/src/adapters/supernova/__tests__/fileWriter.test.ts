import { type OutputTextFile } from '@supernovaio/sdk-exporters';
import { FileHelper } from '@supernovaio/export-helpers';
import { type OutputFile } from '../../../core/types';
import { textFileWriter } from '../fileWriter';

// Mock the FileHelper from @supernovaio/export-helpers
jest.mock('@supernovaio/export-helpers', () => ({
  FileHelper: {
    createTextFile: jest.fn(),
  },
}));

const mockCreateTextFile = FileHelper.createTextFile as jest.MockedFunction<typeof FileHelper.createTextFile>;

// Mock data for testing
const createMockOutputFile = (path: string, fileName: string, content: string): OutputFile => ({
  path,
  fileName,
  content,
});

describe('fileWriter', () => {
  describe('textFileWriter', () => {
    beforeEach(() => {
      mockCreateTextFile.mockClear();
    });

    it('should return empty array when input array is empty', () => {
      const result = textFileWriter([]);

      expect(result).toEqual([]);
      expect(mockCreateTextFile).not.toHaveBeenCalled();
    });

    it('should process single file and call FileHelper.createTextFile with correct parameters', () => {
      const file = createMockOutputFile('src/styles', 'colors.css', '.primary { color: #000; }');
      const mockOutput = {
        name: 'colors.css',
        path: 'src/styles',
        content: '.primary { color: #000; }',
        type: 'text',
      };

      mockCreateTextFile.mockReturnValue(mockOutput as OutputTextFile);

      const result = textFileWriter([file]);

      expect(mockCreateTextFile).toHaveBeenCalledTimes(1);
      expect(mockCreateTextFile).toHaveBeenCalledWith({
        relativePath: 'src/styles',
        fileName: 'colors.css',
        content: '.primary { color: #000; }',
      });
      expect(result).toEqual([mockOutput]);
    });

    it('should process multiple files and call FileHelper.createTextFile for each file', () => {
      const file1 = createMockOutputFile('src/styles', 'colors.css', '.primary { color: #000; }');
      const file2 = createMockOutputFile('src/components', 'button.css', '.btn { padding: 8px; }');
      const file3 = createMockOutputFile('dist', 'tokens.json', '{ "color": "#000" }');

      const mockOutput1 = {
        name: 'colors.css',
        path: 'src/styles',
        content: '.primary { color: #000; }',
        type: 'text',
      };
      const mockOutput2 = {
        name: 'button.css',
        path: 'src/components',
        content: '.btn { padding: 8px; }',
        type: 'text',
      };
      const mockOutput3 = { name: 'tokens.json', path: 'dist', content: '{ "color": "#000" }', type: 'text' };

      mockCreateTextFile
        .mockReturnValueOnce(mockOutput1 as OutputTextFile)
        .mockReturnValueOnce(mockOutput2 as OutputTextFile)
        .mockReturnValueOnce(mockOutput3 as OutputTextFile);

      const result = textFileWriter([file1, file2, file3]);

      expect(mockCreateTextFile).toHaveBeenCalledTimes(3);
      expect(mockCreateTextFile).toHaveBeenNthCalledWith(1, {
        relativePath: 'src/styles',
        fileName: 'colors.css',
        content: '.primary { color: #000; }',
      });
      expect(mockCreateTextFile).toHaveBeenNthCalledWith(2, {
        relativePath: 'src/components',
        fileName: 'button.css',
        content: '.btn { padding: 8px; }',
      });
      expect(mockCreateTextFile).toHaveBeenNthCalledWith(3, {
        relativePath: 'dist',
        fileName: 'tokens.json',
        content: '{ "color": "#000" }',
      });
      expect(result).toEqual([mockOutput1, mockOutput2, mockOutput3]);
    });

    it('should preserve the order of files in the output', () => {
      const files = [
        createMockOutputFile('path1', 'file1.css', 'content1'),
        createMockOutputFile('path2', 'file2.css', 'content2'),
        createMockOutputFile('path3', 'file3.css', 'content3'),
      ];

      const mockOutputs = [
        { name: 'file1.css', path: 'path1', content: 'content1', type: 'text' },
        { name: 'file2.css', path: 'path2', content: 'content2', type: 'text' },
        { name: 'file3.css', path: 'path3', content: 'content3', type: 'text' },
      ];

      mockCreateTextFile
        .mockReturnValueOnce(mockOutputs[0] as OutputTextFile)
        .mockReturnValueOnce(mockOutputs[1] as OutputTextFile)
        .mockReturnValueOnce(mockOutputs[2] as OutputTextFile);

      const result = textFileWriter(files);

      expect(result).toEqual(mockOutputs);
    });
  });
});
