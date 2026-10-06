import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { getComponentPlayground } from '../componentPlaygroundRepository';

describe('getComponentPlayground', () => {
  const writePlayground = async (raw: string) => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'component-playground-'));
    const docsDir = path.join(root, 'packages/web-react/src/components/Button/docs');

    await fs.mkdir(docsDir, { recursive: true });
    await fs.writeFile(path.join(docsDir, 'playground.json'), raw, 'utf8');

    return root;
  };

  it('returns null for an unknown component or a broken control', async () => {
    const unknown = await writePlayground(JSON.stringify({ component: 'Missing', controls: [] }));
    const broken = await writePlayground(JSON.stringify({ component: 'Button', controls: [{ name: 'color' }] }));

    await expect(getComponentPlayground('button', unknown)).resolves.toBeNull();
    await expect(getComponentPlayground('button', broken)).resolves.toBeNull();
  });

  it('returns null for invalid JSON', async () => {
    const root = await writePlayground('{');

    await expect(getComponentPlayground('button', root)).resolves.toBeNull();
  });

  it('returns a valid playground', async () => {
    const root = await writePlayground(
      JSON.stringify({
        component: 'Button',
        controls: [{ name: 'isDisabled', type: 'boolean' }],
        storybookUrl: 'https://example.com/storybook',
      }),
    );

    await expect(getComponentPlayground('button', root)).resolves.toEqual({
      component: 'Button',
      controls: [{ name: 'isDisabled', type: 'boolean' }],
      storybookUrl: 'https://example.com/storybook',
    });
  });

  it('reads the Button playground from the repository', async () => {
    const playground = await getComponentPlayground('button');

    expect(playground?.component).toBe('Button');
    expect(playground?.controls.length).toBeGreaterThan(0);
  });
});
