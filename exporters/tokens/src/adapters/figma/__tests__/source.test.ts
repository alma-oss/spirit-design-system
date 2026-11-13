import { NODE_BATCH_SIZE } from '../constants';
import { FILE, NO_VARIABLES, textMeta, textNode } from '../__fixtures__/figma';
import { readFigmaSource } from '../source';

describe('readFigmaSource', () => {
  it('should request the style nodes in batches', async () => {
    const styleCount = NODE_BATCH_SIZE + 1;
    const styles = Array.from({ length: styleCount }, (_, index) => textMeta(`n${index}`));
    const respond = (body: unknown) => Promise.resolve({ ok: true, json: async () => body });
    const fetchMock = jest.fn((url: string) => {
      if (url.includes('/variables/local')) {
        return respond(NO_VARIABLES);
      }

      if (url.includes('/styles')) {
        return respond({ meta: { styles } });
      }

      if (url.includes('/nodes')) {
        const ids = new URL(url).searchParams.get('ids')?.split(',') ?? [];

        return respond({ nodes: Object.fromEntries(ids.map((id) => [id, { document: textNode(id) }])) });
      }

      return respond({ name: FILE.name });
    });

    const source = await readFigmaSource(FILE.key, 'token', fetchMock as unknown as typeof fetch);
    const nodeRequests = fetchMock.mock.calls.filter(([url]) => url.includes('/nodes'));

    expect(nodeRequests).toHaveLength(2);
    expect(source.styles).toHaveLength(styleCount);
  });
});
