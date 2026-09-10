export const isCurrentPath = (href: string, currentPath: string) => href === currentPath;

export const isActiveBranch = (href: string, currentPath: string) =>
  currentPath === href || currentPath.startsWith(`${href}/`);
