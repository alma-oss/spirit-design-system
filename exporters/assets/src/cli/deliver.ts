import { ConfigError } from '../errors';
import { deliverPullRequest } from '../providers/github/deliver';
import { readOption, type createBaseProgram } from './shared';

interface DeliverCliOptions {
  appSlug?: string | boolean;
  base?: string | boolean;
  bodyPath?: string | boolean;
  branch?: string | boolean;
  commitMessage?: string | boolean;
  out?: string | boolean;
  owner?: string | boolean;
  repo?: string | boolean;
  repositoryRoot?: string | boolean;
  title?: string | boolean;
}

export interface DeliverCliDependencies {
  deliver?: typeof deliverPullRequest;
  githubToken?: string;
}

export const DELIVER_FLAGS_REQUIRING_VALUE = [
  '--app-slug',
  '--base',
  '--body-path',
  '--branch',
  '--commit-message',
  '--out',
  '--owner',
  '--repo',
  '--repository-root',
  '--title',
] as const;

const requireOption = (
  options: Record<string, string | boolean | undefined>,
  camelCaseKey: string,
  kebabCaseKey: string,
): string => {
  const value = readOption(options, camelCaseKey, kebabCaseKey);

  if (!value) {
    throw new ConfigError(`--${kebabCaseKey} is required.`);
  }

  return value;
};

export const registerDeliverCommand = (
  program: ReturnType<typeof createBaseProgram>,
  options: DeliverCliDependencies & { log: (message: string) => void },
) =>
  program
    .command('deliver')
    .describe('Deliver synchronized assets through an owned pull request')
    .option('--app-slug', 'GitHub App slug')
    .option('--base', 'Pull request base branch')
    .option('--body-path', 'Path to the pull request body')
    .option('--branch', 'Automation branch')
    .option('--commit-message', 'Commit message')
    .option('--out', 'Repository-relative synchronized output path')
    .option('--owner', 'Target repository owner')
    .option('--repo', 'Target repository name')
    .option('--repository-root', 'Target repository checkout')
    .option('--title', 'Pull request title')
    .action(async (opts: DeliverCliOptions) => {
      const optionValues = opts as DeliverCliOptions & Record<string, string | boolean | undefined>;
      const deliver = options.deliver ?? deliverPullRequest;
      const result = await deliver({
        appSlug: requireOption(optionValues, 'appSlug', 'app-slug'),
        base: requireOption(optionValues, 'base', 'base'),
        bodyPath: requireOption(optionValues, 'bodyPath', 'body-path'),
        branch: requireOption(optionValues, 'branch', 'branch'),
        commitMessage: requireOption(optionValues, 'commitMessage', 'commit-message'),
        out: requireOption(optionValues, 'out', 'out'),
        owner: requireOption(optionValues, 'owner', 'owner'),
        repo: requireOption(optionValues, 'repo', 'repo'),
        repositoryRoot: requireOption(optionValues, 'repositoryRoot', 'repository-root'),
        title: requireOption(optionValues, 'title', 'title'),
        token: options.githubToken ?? process.env.GH_TOKEN ?? '',
      });

      options.log(result.changed ? 'Asset changes delivered.' : 'No asset changes to deliver.');
    });
