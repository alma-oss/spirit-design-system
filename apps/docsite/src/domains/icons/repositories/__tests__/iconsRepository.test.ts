import { readdirSync } from 'fs';
import { fetchAllIcons } from '../iconsRepository';

jest.mock('fs', () => ({
  readdirSync: jest.fn(),
}));

const readdirSyncMock = readdirSync as jest.Mock;

describe('fetchAllIcons', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return icon names without the .svg extension', () => {
    readdirSyncMock.mockReturnValue(['arrow.svg', 'close.svg']);

    const result = fetchAllIcons();

    expect(result).toEqual(['arrow', 'close']);
  });

  it('should filter out files that are not .svg', () => {
    readdirSyncMock.mockReturnValue(['arrow.svg', 'README.md', '.DS_Store']);

    const result = fetchAllIcons();

    expect(result).toEqual(['arrow']);
  });

  it('should return icon names sorted alphabetically', () => {
    readdirSyncMock.mockReturnValue(['close.svg', 'arrow.svg', 'bell.svg']);

    const result = fetchAllIcons();

    expect(result).toEqual(['arrow', 'bell', 'close']);
  });

  it('should return an empty array when no icons exist', () => {
    readdirSyncMock.mockReturnValue([]);

    const result = fetchAllIcons();

    expect(result).toEqual([]);
  });

  it('should resolve the path to the icons svg directory', () => {
    readdirSyncMock.mockReturnValue([]);

    fetchAllIcons();

    expect(readdirSyncMock).toHaveBeenCalledWith(expect.stringContaining('packages/icons/src/svg'));
  });
});
