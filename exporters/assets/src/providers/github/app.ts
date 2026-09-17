import { App } from 'octokit';

export interface ListedRepository {
  archived: boolean;
  defaultBranch: string;
  disabled: boolean;
  name: string;
  owner: string;
  token: string;
}

export interface GitHubAppLike {
  eachRepository: {
    iterator: () => AsyncIterable<{
      octokit: { auth: (options?: unknown) => Promise<unknown> };
      repository: {
        archived?: boolean;
        default_branch: string;
        disabled?: boolean;
        name: string;
        owner: { login: string };
      };
    }>;
  };
}

export const createGitHubApp = (appId: string, privateKey: string, AppConstructor: typeof App = App): GitHubAppLike =>
  new AppConstructor({ appId, privateKey });

export const listAppRepositories = async function* (app: GitHubAppLike): AsyncIterable<ListedRepository> {
  for await (const { octokit, repository } of app.eachRepository.iterator()) {
    const authentication = await octokit.auth({ type: 'installation' });
    const token =
      typeof authentication === 'object' && authentication && 'token' in authentication
        ? String(authentication.token)
        : '';

    yield {
      archived: Boolean(repository.archived),
      defaultBranch: repository.default_branch,
      disabled: Boolean(repository.disabled),
      name: repository.name,
      owner: repository.owner.login,
      token,
    };
  }
};
