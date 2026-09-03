import { exportAssets, exportIcons } from '../src';
import { createExportFetch, createFigmaFetch } from '../__fixtures__/figma';

describe('exportAssets', () => {
  it('combines branded icons with shared benefit icons', async () => {
    const assets = await exportAssets('figma-file', 'Spirit', ['icons', 'benefit-icons'], 'token', createFigmaFetch());

    expect(assets.map(({ name }) => name)).toEqual(['add-item', 'benefit-health', 'logo-colored']);
  });

  it('requires every selected asset type to be present', async () => {
    await expect(exportAssets('file', 'Spirit', ['benefit-icons'], 'token', createExportFetch())).rejects.toThrow(
      /No Icons\/benefit-\* components/,
    );
    await expect(exportAssets('file', 'Spirit', ['illustrations'], 'token', createExportFetch())).rejects.toThrow(
      /No Illustration\/\* component sets/,
    );
  });

  it('exports branded illustrations and deduplicates identical content', async () => {
    const illustrationSet = (id: string) => ({
      id: `${id}:set`,
      name: 'Illustration/Card.svg',
      type: 'COMPONENT_SET',
      children: [{ id, name: 'Brand=Spirit', type: 'COMPONENT' }],
    });
    const assets = await exportAssets(
      'file',
      'Spirit',
      ['illustrations'],
      'token',
      createExportFetch({
        file: {
          document: {
            id: '0:0',
            name: 'Document',
            type: 'DOCUMENT',
            children: [illustrationSet('1:2'), illustrationSet('2:2')],
          },
        },
        images: {
          err: null,
          images: {
            '1:2': 'https://assets.example/first.svg',
            '2:2': 'https://assets.example/second.svg',
          },
        },
        svg: () => new Response('<svg />'),
      }),
    );

    expect(assets).toEqual([{ name: 'card', svg: '<svg />\n' }]);
  });

  it('skips empty component sets and benefit-prefixed icon sets', async () => {
    const assets = await exportAssets(
      'file',
      'Spirit',
      ['icons'],
      'token',
      createExportFetch({
        file: {
          document: {
            id: '0:0',
            name: 'Document',
            type: 'DOCUMENT',
            children: [
              {
                id: '1:1',
                name: 'Icons/Empty',
                type: 'COMPONENT_SET',
              },
              {
                id: '2:1',
                name: 'Icons/benefit-skip',
                type: 'COMPONENT_SET',
                children: [{ id: '2:2', name: 'Brand=Spirit', type: 'COMPONENT' }],
              },
              {
                id: '3:1',
                name: 'Icons/Keep',
                type: 'COMPONENT_SET',
                children: [{ id: '3:2', name: 'Brand=Spirit', type: 'COMPONENT' }],
              },
            ],
          },
        },
        images: {
          err: null,
          images: {
            '3:2': 'https://assets.example/test.svg',
          },
        },
      }),
    );

    expect(assets).toEqual([{ name: 'keep', svg: '<svg />\n' }]);
  });
});

describe('exportIcons', () => {
  it('normalizes names and supports Brand component properties', async () => {
    const icons = await exportIcons(
      'file/key',
      'Spirit',
      'token',
      createExportFetch({
        file: {
          document: {
            id: '0:0',
            name: 'Document',
            type: 'DOCUMENT',
            children: [
              {
                id: '1:1',
                name: 'Icons/ Čafé__--Name! ',
                type: 'COMPONENT_SET',
                children: [
                  {
                    id: '1:2',
                    name: 'anything',
                    type: 'COMPONENT',
                    componentProperties: { Brand: { value: 'Spirit' } },
                  },
                ],
              },
            ],
          },
        },
      }),
    );

    expect(icons).toEqual([{ name: 'cafe-name', svg: '<svg />\n' }]);
  });

  it('uses the global fetch implementation by default', async () => {
    const fetchSpy = jest
      .spyOn(globalThis, 'fetch')
      .mockImplementation((input: RequestInfo | URL) => createExportFetch()(input));

    try {
      await expect(exportIcons('file', 'Spirit', 'token')).resolves.toEqual([{ name: 'test', svg: '<svg />\n' }]);
      await expect(exportAssets('file', 'Spirit', ['icons'], 'token')).resolves.toEqual([
        { name: 'test', svg: '<svg />\n' },
      ]);
    } finally {
      fetchSpy.mockRestore();
    }
  });

  it('applies a timeout signal to Figma API and SVG requests', async () => {
    const baseFetch = createExportFetch();
    const signals: AbortSignal[] = [];
    const fetchWithSignalCheck = async (input: RequestInfo | URL, init?: RequestInit) => {
      signals.push(init?.signal as AbortSignal);

      return baseFetch(input);
    };

    await exportIcons('file', 'Spirit', 'token', fetchWithSignalCheck);

    expect(signals).toHaveLength(3);

    signals.forEach((signal) => expect(signal).toBeInstanceOf(AbortSignal));
  });

  it('reports Figma API and document errors', async () => {
    await expect(
      exportIcons('file', 'Spirit', 'token', createExportFetch({ file: new Response('failure', { status: 500 }) })),
    ).rejects.toThrow(/Figma API request failed \(500 \)/);
    await expect(
      exportIcons('file', 'Spirit', 'token', createExportFetch({ file: { err: 'denied' } })),
    ).rejects.toThrow(/Figma file request failed: denied/);
    await expect(exportIcons('file', 'Spirit', 'token', createExportFetch({ file: {} }))).rejects.toThrow(
      /did not contain a document/,
    );
    await expect(
      exportIcons(
        'file',
        'Spirit',
        'token',
        createExportFetch({
          file: { document: { id: '0:0', name: 'Document', type: 'DOCUMENT' } },
        }),
      ),
    ).rejects.toThrow(/No Icons\/\* component sets/);
  });

  it('validates component sets and export responses', async () => {
    const componentSet = (name: string, children: unknown[]) => ({
      id: `${name}:set`,
      name,
      type: 'COMPONENT_SET',
      children,
    });
    const documentWith = (...children: unknown[]) => ({
      document: {
        id: '0:0',
        name: 'Document',
        type: 'DOCUMENT',
        children,
      },
    });
    const spiritVariant = (id = '1:2') => ({ id, name: 'Brand=Spirit', type: 'COMPONENT' });

    await expect(
      exportIcons(
        'file',
        'Spirit',
        'token',
        createExportFetch({
          file: documentWith(
            componentSet('Icons/Test', [
              {
                id: '1:2',
                name: 'Brand=Spirit',
                type: 'COMPONENT',
                componentProperties: { Brand: { value: 'Jobs' } },
              },
            ]),
          ),
        }),
      ),
    ).rejects.toThrow(/does not contain Brand=Spirit/);

    await expect(
      exportIcons(
        'file',
        'Spirit',
        'token',
        createExportFetch({
          file: documentWith(componentSet('Icons/!!!', [spiritVariant()])),
        }),
      ),
    ).rejects.toThrow(/does not produce a valid filename/);

    await expect(
      exportIcons(
        'file',
        'Spirit',
        'token',
        createExportFetch({
          file: documentWith(
            componentSet('Icons/Same Name', [spiritVariant('1:2')]),
            componentSet('Icons/same-name', [spiritVariant('2:2')]),
          ),
          images: {
            err: null,
            images: {
              '1:2': 'https://assets.example/first.svg',
              '2:2': 'https://assets.example/second.svg',
            },
          },
          svg: (url) => new Response(url.endsWith('first.svg') ? '<svg><path /></svg>' : '<svg><circle /></svg>'),
        }),
      ),
    ).rejects.toThrow(/Multiple Figma assets resolve.*different content/);

    await expect(
      exportIcons('file', 'Spirit', 'token', createExportFetch({ images: { err: 'render failed' } })),
    ).rejects.toThrow(/Figma SVG export failed: render failed/);
    await expect(
      exportIcons('file', 'Spirit', 'token', createExportFetch({ images: { err: null, images: {} } })),
    ).rejects.toThrow(/did not return an SVG export URL/);
    await expect(
      exportIcons('file', 'Spirit', 'token', createExportFetch({ svg: new Response('failure', { status: 503 }) })),
    ).rejects.toThrow(/Unable to download SVG/);
    await expect(
      exportIcons('file', 'Spirit', 'token', createExportFetch({ svg: new Response('not svg') })),
    ).rejects.toThrow(/invalid SVG content/);
  });
});
