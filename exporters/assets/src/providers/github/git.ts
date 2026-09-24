import { execFile } from 'node:child_process';

export type GitCommand = (args: string[], environment?: NodeJS.ProcessEnv) => Promise<string>;

export interface GitClient {
  addAll: (outputPath: string) => Promise<void>;
  commit: (message: string) => Promise<void>;
  commitFixup: (sha: string) => Promise<void>;
  configureIdentity: (name: string, email: string) => Promise<void>;
  fetchCommit: (sha: string) => Promise<void>;
  fetchRef: (ref: string) => Promise<void>;
  hasCommit: (sha: string) => Promise<boolean>;
  listTree: (tree: string, outputPath: string) => Promise<string>;
  push: (ref: string) => Promise<void>;
  removePath: (outputPath: string) => Promise<void>;
  restoreFromTree: (tree: string, outputPath: string) => Promise<void>;
  revParse: (revision: string) => Promise<string>;
  status: (outputPath: string) => Promise<string>;
  switchCreate: (branch: string) => Promise<void>;
  switchToFetched: (branch: string) => Promise<void>;
  writeTree: () => Promise<string>;
}

export const runGitCommand = (
  repositoryRoot: string,
  args: string[],
  environment?: NodeJS.ProcessEnv,
): Promise<string> =>
  new Promise((resolve, reject) => {
    execFile(
      'git',
      args,
      { cwd: repositoryRoot, encoding: 'utf8', env: { ...process.env, ...environment } },
      (error, stdout) => {
        if (error) {
          reject(error);

          return;
        }

        resolve(stdout);
      },
    );
  });

const output = async (run: GitCommand, args: string[]): Promise<string> => (await run(args)).trim();

export const createGitClient = (run: GitCommand): GitClient => ({
  addAll: async (outputPath) => {
    await run(['add', '--all', '--', outputPath]);
  },
  commit: async (message) => {
    await run(['commit', '-m', message]);
  },
  commitFixup: async (sha) => {
    await run(['commit', `--fixup=${sha}`]);
  },
  configureIdentity: async (name, email) => {
    await run(['config', 'user.name', name]);
    await run(['config', 'user.email', email]);
  },
  fetchCommit: async (sha) => {
    await run(['fetch', '--no-tags', '--depth=1', 'origin', sha]);
  },
  fetchRef: async (ref) => {
    await run(['fetch', '--no-tags', '--depth=1', 'origin', ref]);
  },
  hasCommit: async (sha) => {
    try {
      await run(['cat-file', '-e', `${sha}^{commit}`]);

      return true;
    } catch {
      return false;
    }
  },
  listTree: (tree, outputPath) => output(run, ['ls-tree', '--name-only', '-r', tree, '--', outputPath]),
  push: async (ref) => {
    await run(['push', 'origin', `HEAD:${ref}`]);
  },
  removePath: async (outputPath) => {
    await run(['rm', '-r', '--ignore-unmatch', '--', outputPath]);
  },
  restoreFromTree: async (tree, outputPath) => {
    await run(['restore', `--source=${tree}`, '--staged', '--worktree', '--', outputPath]);
  },
  revParse: (revision) => output(run, ['rev-parse', revision]),
  status: (outputPath) => output(run, ['status', '--porcelain=v1', '--untracked-files=all', '--', outputPath]),
  switchCreate: async (branch) => {
    await run(['switch', '-C', branch]);
  },
  switchToFetched: async (branch) => {
    await run(['switch', '--discard-changes', '--force-create', branch, 'FETCH_HEAD']);
  },
  writeTree: () => output(run, ['write-tree']),
});
