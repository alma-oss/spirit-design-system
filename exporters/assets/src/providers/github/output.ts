export interface DiscoverTarget {
  base: string;
  branch: string;
  brand: string;
  commitMessage: string;
  out: string;
  owner: string;
  ref: string;
  repo: string;
  slug: string;
  title: string;
}

export interface DiscoverMatrix {
  include: DiscoverTarget[];
}

export const formatGitHubActionsOutput = (result: DiscoverMatrix): string => {
  const json = JSON.stringify(result);
  const hasTargets = result.include.length > 0;

  return `matrix<<MATRIX\n${json}\nMATRIX\nhas-targets=${hasTargets}\n`;
};
