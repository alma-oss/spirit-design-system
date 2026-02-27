import { errorMessage, infoMessage } from '../message';

const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
const mockConsoleInfo = jest.spyOn(console, 'info').mockImplementation(() => {});

jest.mock('zx', () => ({
  chalk: {
    red: jest.fn((text) => `\x1b[31m${text}\x1b[0m`),
    magenta: {
      bold: jest.fn((text) => `\x1b[35m\x1b[1m${text}\x1b[0m`),
    },
  },
}));

describe('message', () => {
  afterEach(() => {
    // Clear the mock after each test
    mockConsoleError.mockClear();
    mockConsoleInfo.mockClear();
  });

  describe('errorMessage', () => {
    it('should call console.error with the correct message for errorMessage', () => {
      const errorMessageText = 'Error occurred!';
      errorMessage(errorMessageText);

      expect(mockConsoleError).toHaveBeenCalledWith(`\x1b[31m${errorMessageText}\x1b[0m`);
    });
  });

  describe('infoMessage', () => {
    it('should call console.info with the correct message for infoMessage', () => {
      const infoMessageText = 'This is an important message!';
      infoMessage(infoMessageText);

      expect(mockConsoleInfo).toHaveBeenCalledWith(`\x1b[35m\x1b[1m${infoMessageText}\x1b[0m`);
    });
  });
});
