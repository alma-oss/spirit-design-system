import { App } from 'octokit';

export interface ListedRepository {
  archived: boolean;
  disabled: boolean;
  name: string;
  owner: string;
  token: string;
}

export interface GitHubAppLike {
  eachRepository: {
    iterator: () => AsyncIterable<{
      octokit: { auth: () => Promise<unknown> };
      repository: {
        archived?: boolean;
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
    const authentication = await octokit.auth();
    const token =
      typeof authentication === 'object' && authentication && 'token' in authentication
        ? String(authentication.token)
        : '';

    yield {
      archived: Boolean(repository.archived),
      disabled: Boolean(repository.disabled),
      name: repository.name,
      owner: repository.owner.login,
      token,
    };
  }
};
