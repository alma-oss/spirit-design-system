import { readFile } from 'node:fs/promises';
import path from 'node:path';

const workflowPath = path.resolve(import.meta.dirname, '../../../../.github/workflows/figma-assets-sync.yaml');

describe('Figma asset sync workflow security policy', () => {
  it('keeps private target metadata out of public job names and artifacts', async () => {
    const workflow = await readFile(workflowPath, 'utf8');

    expect(workflow).not.toMatch(/name:\s+.*matrix\./);
    expect(workflow).not.toContain('name: figma-publish-notes');
    expect(workflow).not.toContain('Download Figma publish notes');
    expect(workflow).toContain('name: spirit-assets-cli');
  });

  it('checks out only the inspected config revision and output directory', async () => {
    const workflow = await readFile(workflowPath, 'utf8');

    expect(workflow).toContain(['ref: $', '{{ matrix.ref }}'].join(''));
    expect(workflow).not.toContain('filter:');
    expect(workflow).toContain('sparse-checkout-cone-mode: false');
    expect(workflow).toContain('/spirit.config.json');
    expect(workflow).toContain(['/$', '{{ matrix.out }}/'].join(''));
    expect(workflow).toContain('persist-credentials: false');
  });

  it('does not pass untrusted pull request text through GitHub output delimiters', async () => {
    const workflow = await readFile(workflowPath, 'utf8');

    expect(workflow).not.toContain('body: ${{');
    expect(workflow).toContain('--body-path "$PR_BODY_PATH"');
    expect(workflow).not.toContain('peter-evans/create-pull-request');
  });
});
