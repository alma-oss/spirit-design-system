import { DEFAULT_GIT_TEMPLATES } from '../constants';
import {
  assertSafeGitBranch,
  hasUniqueGitBranches,
  resolveGitTemplates,
  type GitTemplateContext,
} from '../providers/github/templates';

const context: GitTemplateContext = {
  brand: 'Práce',
  out: 'libs/design-icons/prace.cz/svg',
  owner: 'almacareer',
  repo: 'platform-frontends',
  slug: 'platform-frontends-libs-design-icons-prace-cz-svg',
};

describe('resolveGitTemplates', () => {
  it('uses built-in defaults when no templates are configured', () => {
    expect(resolveGitTemplates({}, {}, context)).toEqual({
      branch: `chore/figma-icons-sync-${context.slug}`,
      commitMessage: 'chore(icons): sync Práce icons from Figma',
      title: 'Chore(icons): Sync Práce icons from Figma',
    });
  });

  it('applies assets-level templates before target overrides', () => {
    expect(
      resolveGitTemplates(
        {
          branch: 'chore/{repo}-{slug}',
          commitMessage: 'chore(icons): sync {brand} into {out}',
          pullRequestTitle: 'Sync {owner}/{repo} icons',
        },
        {
          commitMessage: 'chore(jobs-icons): sync icons from Figma',
        },
        context,
      ),
    ).toEqual({
      branch: 'chore/platform-frontends-platform-frontends-libs-design-icons-prace-cz-svg',
      commitMessage: 'chore(jobs-icons): sync icons from Figma',
      title: 'Sync almacareer/platform-frontends icons',
    });
  });

  it('slugifies brand and out in branches and leaves other placeholders as-is', () => {
    expect(
      resolveGitTemplates(
        {
          branch: 'sync/{owner}/{repo}/{slug}/{brand}/{out}',
          commitMessage: '{brand} {out} {slug} {repo} {owner}',
          pullRequestTitle: '{brand} {out}',
        },
        {},
        context,
      ),
    ).toEqual({
      branch:
        'sync/almacareer/platform-frontends/platform-frontends-libs-design-icons-prace-cz-svg/Pr-ce/libs-design-icons-prace-cz-svg',
      commitMessage:
        'Práce libs/design-icons/prace.cz/svg platform-frontends-libs-design-icons-prace-cz-svg platform-frontends almacareer',
      title: 'Práce libs/design-icons/prace.cz/svg',
    });
  });

  it('rejects empty interpolated commit messages and titles', () => {
    const emptyContext = { ...context, brand: '   ' };

    expect(() => resolveGitTemplates({ commitMessage: '{brand}' }, {}, emptyContext)).toThrow(
      /commit message is empty/,
    );
    expect(() => resolveGitTemplates({ pullRequestTitle: '{brand}' }, {}, emptyContext)).toThrow(
      /pull request title is empty/,
    );
  });

  it('rejects interpolated branches that are not safe git refs', () => {
    expect(() => resolveGitTemplates({ branch: '../{slug}' }, {}, context)).toThrow(/not a safe git ref/);
    expect(() => resolveGitTemplates({ branch: ' ' }, {}, context)).toThrow(/git branch is empty/);
  });
});

describe('assertSafeGitBranch', () => {
  it('rejects empty branches', () => {
    expect(() => assertSafeGitBranch('')).toThrow(/git branch is empty/);
  });

  it.each(['../escape', '/absolute', '-leading', 'has space', 'feat@main', 'foo..bar'])(
    'rejects unsafe branches: %j',
    (branch) => {
      expect(() => assertSafeGitBranch(branch)).toThrow(/not a safe git ref/);
    },
  );

  it('accepts a safe git branch', () => {
    expect(assertSafeGitBranch(DEFAULT_GIT_TEMPLATES.branch.replace('{slug}', context.slug))).toBe(
      `chore/figma-icons-sync-${context.slug}`,
    );
  });
});

describe('hasUniqueGitBranches', () => {
  it('detects duplicate resolved branches', () => {
    expect(hasUniqueGitBranches([{ branch: 'a' }, { branch: 'b' }])).toBe(true);
    expect(hasUniqueGitBranches([{ branch: 'a' }, { branch: 'a' }])).toBe(false);
  });
});
