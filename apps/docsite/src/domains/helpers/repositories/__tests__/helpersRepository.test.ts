import { type Dirent, readFileSync, readdirSync } from 'fs';
import { compilePreview } from '@local/domains/components/utils/compilePreview';

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  readdirSync: jest.fn(),
}));

jest.mock('@local/domains/components/utils/compilePreview', () => ({
  compilePreview: jest.fn(),
}));

const readdirSyncMock = readdirSync as jest.Mock;
const readFileSyncMock = readFileSync as jest.Mock;
const compilePreviewMock = compilePreview as jest.Mock;

const makeDirent = (name: string, isDir: boolean): Dirent =>
  ({
    name,
    isDirectory: () => isDir,
    isFile: () => !isDir,
  }) as unknown as Dirent;

// The repository memoizes the directory walk at module scope, so each test needs a fresh module
// instance to control what the "filesystem" returns.
const loadRepository = (): typeof import('../helpersRepository') => {
  let repository: typeof import('../helpersRepository') | undefined;

  jest.isolateModules(() => {
    repository = jest.requireActual<typeof import('../helpersRepository')>('../helpersRepository');
  });

  if (!repository) {
    throw new Error('Failed to load helpersRepository module');
  }

  return repository;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('fetchAllHelpers', () => {
  it('should return only directories that contain a preview.html file, title-cased', () => {
    readdirSyncMock.mockImplementation((path: string, options?: { withFileTypes: boolean }) => {
      if (options?.withFileTypes) {
        return [makeDirent('dynamic-color', true), makeDirent('buttons', true), makeDirent('README.md', false)];
      }

      return path.endsWith('dynamic-color') ? ['preview.html'] : ['index.html'];
    });

    const result = loadRepository().fetchAllHelpers();

    expect(result).toEqual([{ name: 'dynamic-color', title: 'Dynamic Color' }]);
  });

  it('should return an empty array when no helper directories exist', () => {
    readdirSyncMock.mockReturnValue([]);

    expect(loadRepository().fetchAllHelpers()).toEqual([]);
  });

  it('should only walk the directory tree once across repeated calls', () => {
    readdirSyncMock.mockImplementation((path: string, options?: { withFileTypes: boolean }) => {
      if (options?.withFileTypes) {
        return [makeDirent('buttons', true)];
      }

      return ['preview.html'];
    });

    const { fetchAllHelpers, fetchHelper } = loadRepository();

    fetchAllHelpers();
    fetchAllHelpers();
    fetchHelper('buttons');

    expect(readdirSyncMock).toHaveBeenCalledTimes(2);
  });
});

describe('fetchHelper', () => {
  it('should return undefined for a helper that does not exist', () => {
    readdirSyncMock.mockReturnValue([]);

    expect(loadRepository().fetchHelper('unknown')).toBeUndefined();
  });

  it('should return the compiled preview source for a valid helper', () => {
    readdirSyncMock.mockImplementation((path: string, options?: { withFileTypes: boolean }) => {
      if (options?.withFileTypes) {
        return [makeDirent('buttons', true)];
      }

      return ['preview.html'];
    });
    readFileSyncMock.mockReturnValue('<button>{{label}}</button>');
    compilePreviewMock.mockReturnValue('<button>Click</button>');

    const result = loadRepository().fetchHelper('buttons');

    expect(readFileSyncMock).toHaveBeenCalledWith(expect.stringContaining('buttons/preview.html'), 'utf-8');
    expect(compilePreviewMock).toHaveBeenCalledWith('<button>{{label}}</button>');
    expect(result).toBe('<button>Click</button>');
  });

  it('should not read the preview file for an invalid helper', () => {
    readdirSyncMock.mockReturnValue([]);

    loadRepository().fetchHelper('unknown');

    expect(readFileSyncMock).not.toHaveBeenCalled();
  });

  it('should return undefined when the matching directory has no preview.html', () => {
    readdirSyncMock.mockImplementation((path: string, options?: { withFileTypes: boolean }) => {
      if (options?.withFileTypes) {
        return [makeDirent('buttons', true)];
      }

      return ['index.html'];
    });

    expect(loadRepository().fetchHelper('buttons')).toBeUndefined();
  });
});
