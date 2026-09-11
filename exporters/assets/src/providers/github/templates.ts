import { DEFAULT_GIT_TEMPLATES } from '../../constants';
import { ConfigError } from '../../errors';
import { toTargetSlug } from '../../repository/paths';
import type { GitTemplates } from '../../types';

const PLACEHOLDER_PATTERN = /\{(brand|out|owner|repo|slug)\}/g;
const SAFE_GIT_BRANCH = /^[A-Za-z0-9._/-]+$/;

export interface GitTemplateContext {
  brand: string;
  out: string;
  owner: string;
  repo: string;
  slug: string;
}

export interface ResolvedGitTemplates {
  branch: string;
  commitMessage: string;
  title: string;
}

const interpolate = (
  template: string,
  context: GitTemplateContext,
  { slugifyBrandAndOut = false }: { slugifyBrandAndOut?: boolean } = {},
): string =>
  template.replace(PLACEHOLDER_PATTERN, (_match, token: keyof GitTemplateContext) => {
    const value = context[token];

    if (slugifyBrandAndOut && (token === 'brand' || token === 'out')) {
      return toTargetSlug(value);
    }

    return value;
  });

export const assertSafeGitBranch = (branch: string): string => {
  if (!branch) {
    throw new ConfigError('Resolved git branch is empty.');
  }

  if (branch.includes('..') || branch.startsWith('/') || branch.startsWith('-') || !SAFE_GIT_BRANCH.test(branch)) {
    throw new ConfigError(`Resolved git branch is not a safe git ref: ${branch}`);
  }

  return branch;
};

export const hasUniqueGitBranches = (targets: Array<{ branch: string }>): boolean =>
  new Set(targets.map((target) => target.branch)).size === targets.length;

export const resolveGitTemplates = (
  assets: GitTemplates,
  target: GitTemplates,
  context: GitTemplateContext,
): ResolvedGitTemplates => {
  const branchTemplate = target.branch ?? assets.branch ?? DEFAULT_GIT_TEMPLATES.branch;
  const commitMessageTemplate = target.commitMessage ?? assets.commitMessage ?? DEFAULT_GIT_TEMPLATES.commitMessage;
  const pullRequestTitleTemplate =
    target.pullRequestTitle ?? assets.pullRequestTitle ?? DEFAULT_GIT_TEMPLATES.pullRequestTitle;

  const commitMessage = interpolate(commitMessageTemplate, context).trim();
  const title = interpolate(pullRequestTitleTemplate, context).trim();

  if (!commitMessage) {
    throw new ConfigError('Resolved git commit message is empty.');
  }

  if (!title) {
    throw new ConfigError('Resolved git pull request title is empty.');
  }

  return {
    branch: assertSafeGitBranch(interpolate(branchTemplate, context, { slugifyBrandAndOut: true }).trim()),
    commitMessage,
    title,
  };
};
