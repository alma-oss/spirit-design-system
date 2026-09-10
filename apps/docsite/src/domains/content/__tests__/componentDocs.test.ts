import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { getComponentTabAvailability, resolveComponentTabFile } from '../componentDocs';

describe('getComponentTabAvailability', () => {
  it('hides Component Tab Pages that are not on disk', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'component-tabs-'));

    const docsDir = path.join(root, 'packages/web-react/src/components/Button/docs');

    await fs.mkdir(docsDir, { recursive: true });
    await fs.writeFile(path.join(docsDir, 'overview.md'), '---\ntitle: Button\n---\n', 'utf8');
    await fs.writeFile(path.join(docsDir, 'design.md'), '---\ntitle: Button\n---\n', 'utf8');

    await expect(getComponentTabAvailability('button', root)).resolves.toEqual({
      overview: true,
      design: true,
      accessibility: false,
      figma: false,
    });
  });

  it('resolves stable and unstable component tabs from colocated docs', () => {
    const root = path.join(os.tmpdir(), 'component-tabs');

    expect(resolveComponentTabFile('file-upload', 'overview', root)).toBe(
      path.join(root, 'packages/web-react/src/components/FileUpload/docs/overview.md'),
    );
    expect(resolveComponentTabFile('unstable-combobox', 'accessibility', root)).toBe(
      path.join(root, 'packages/web-react/src/components/UNSTABLE_Combobox/docs/accessibility.md'),
    );
    expect(resolveComponentTabFile('../button', 'overview', root)).toBeNull();
  });
});
