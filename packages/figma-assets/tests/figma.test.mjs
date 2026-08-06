import assert from 'node:assert/strict';
import test from 'node:test';

import { exportAssets, exportIcons } from '../src/index.ts';
import { createExportFetch, createFigmaFetch } from './fixtures.mjs';

test('exportAssets combines branded icons with shared benefit icons', async () => {
  const assets = await exportAssets(
    'figma-file',
    'Spirit',
    ['icons', 'benefit-icons'],
    'token',
    createFigmaFetch(),
  );

  assert.deepEqual(
    assets.map(({ name }) => name),
    ['add-item', 'benefit-health', 'logo-colored'],
  );
});

test('exportAssets requires every selected asset type to be present', async () => {
  await assert.rejects(
    exportAssets('file', 'Spirit', ['benefit-icons'], 'token', createExportFetch()),
    /No Icons\/benefit-\* components/,
  );
  await assert.rejects(
    exportAssets('file', 'Spirit', ['illustrations'], 'token', createExportFetch()),
    /No Illustration\/\* component sets/,
  );
});

test('exportAssets exports branded illustrations and deduplicates identical content', async () => {
  const illustrationSet = (id) => ({
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

  assert.deepEqual(assets, [{ name: 'card', svg: '<svg />\n' }]);
});

test('exportIcons normalizes names and supports Brand component properties', async () => {
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

  assert.deepEqual(icons, [{ name: 'cafe-name', svg: '<svg />\n' }]);
});

test('exportIcons reports Figma API and document errors', async (context) => {
  const cases = [
    {
      name: 'HTTP error',
      fetch: createExportFetch({ file: new Response('failure', { status: 500 }) }),
      error: /Figma API request failed \(500 \)/,
    },
    {
      name: 'Figma file error',
      fetch: createExportFetch({ file: { err: 'denied' } }),
      error: /Figma file request failed: denied/,
    },
    {
      name: 'missing document',
      fetch: createExportFetch({ file: {} }),
      error: /did not contain a document/,
    },
    {
      name: 'missing icon sets',
      fetch: createExportFetch({
        file: { document: { id: '0:0', name: 'Document', type: 'DOCUMENT' } },
      }),
      error: /No Icons\/\* component sets/,
    },
  ];

  for (const scenario of cases) {
    await context.test(scenario.name, async () => {
      await assert.rejects(exportIcons('file', 'Spirit', 'token', scenario.fetch), scenario.error);
    });
  }
});

test('exportIcons validates component sets and export responses', async (context) => {
  const componentSet = (name, children) => ({
    id: `${name}:set`,
    name,
    type: 'COMPONENT_SET',
    children,
  });
  const documentWith = (...children) => ({
    document: {
      id: '0:0',
      name: 'Document',
      type: 'DOCUMENT',
      children,
    },
  });
  const spiritVariant = (id = '1:2') => ({ id, name: 'Brand=Spirit', type: 'COMPONENT' });
  const cases = [
    {
      name: 'missing Brand variant',
      fetch: createExportFetch({
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
      error: /does not contain Brand=Spirit/,
    },
    {
      name: 'invalid filename',
      fetch: createExportFetch({
        file: documentWith(componentSet('Icons/!!!', [spiritVariant()])),
      }),
      error: /does not produce a valid filename/,
    },
    {
      name: 'duplicate filename',
      fetch: createExportFetch({
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
      error: /Multiple Figma assets resolve.*different content/,
    },
    {
      name: 'Figma image export error',
      fetch: createExportFetch({ images: { err: 'render failed' } }),
      error: /Figma SVG export failed: render failed/,
    },
    {
      name: 'missing export URL',
      fetch: createExportFetch({ images: { err: null, images: {} } }),
      error: /did not return an SVG export URL/,
    },
    {
      name: 'SVG download error',
      fetch: createExportFetch({ svg: new Response('failure', { status: 503 }) }),
      error: /Unable to download SVG/,
    },
    {
      name: 'invalid SVG',
      fetch: createExportFetch({ svg: new Response('not svg') }),
      error: /invalid SVG content/,
    },
  ];

  for (const scenario of cases) {
    await context.test(scenario.name, async () => {
      await assert.rejects(exportIcons('file', 'Spirit', 'token', scenario.fetch), scenario.error);
    });
  }
});
