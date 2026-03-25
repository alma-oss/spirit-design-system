import { type Dirent, readdirSync } from 'fs';
import { fetchAllComponents } from '../componentsRepository';

jest.mock('fs', () => ({
  readdirSync: jest.fn(),
}));

const readdirSyncMock = readdirSync as jest.Mock;

const makeDirent = (name: string, isDir: boolean): Dirent =>
  ({
    name,
    isDirectory: () => isDir,
    isFile: () => !isDir,
  }) as unknown as Dirent;

describe('fetchAllComponents', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return only directory names', () => {
    readdirSyncMock.mockReturnValue([
      makeDirent('Accordion', true),
      makeDirent('Button', true),
      makeDirent('.DS_Store', false),
      makeDirent('index.ts', false),
    ]);

    const result = fetchAllComponents();

    expect(result).toEqual(['Accordion', 'Button']);
  });

  it('should return an empty array when no directories exist', () => {
    readdirSyncMock.mockReturnValue([]);

    const result = fetchAllComponents();

    expect(result).toEqual([]);
  });

  it('should call readdirSync with withFileTypes option', () => {
    readdirSyncMock.mockReturnValue([]);

    fetchAllComponents();

    expect(readdirSyncMock).toHaveBeenCalledWith(expect.any(String), { withFileTypes: true });
  });

  it('should resolve the path to web-react components directory', () => {
    readdirSyncMock.mockReturnValue([]);

    fetchAllComponents();

    expect(readdirSyncMock).toHaveBeenCalledWith(
      expect.stringContaining('packages/web-react/src/components'),
      expect.any(Object),
    );
  });

  it('should propagate errors when the directory cannot be read', () => {
    readdirSyncMock.mockImplementation(() => {
      throw new Error('ENOENT');
    });

    expect(() => fetchAllComponents()).toThrow('ENOENT');
  });
});
