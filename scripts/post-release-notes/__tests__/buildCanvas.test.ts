import { buildCanvas } from '../buildCanvas';

describe('buildCanvas', () => {
  it.each([
    ['# Title\n\nBody', 'Title', 'Body'],
    ['Intro\n# Title\nBody', 'Title', 'Intro\nBody'],
    ['#  Spaced title  \nBody', 'Spaced title', 'Body'],
    ['## Not a title\nBody', 'fallback', '## Not a title\nBody'],
  ])('should split "%j" into title "%s" and body "%j"', (markdown, title, body) => {
    expect(buildCanvas(markdown, 'fallback')).toEqual({ title, body });
  });

  it('should turn lines with only &nbsp; into empty lines', () => {
    expect(buildCanvas('# Title\nFirst\n&nbsp;\nSecond', 'fallback').body).toBe('First\n\nSecond');
  });

  it('should trim the body', () => {
    expect(buildCanvas('# Title\n\n\nBody\n\n', 'fallback').body).toBe('Body');
  });
});
