import { readdirSync } from 'fs';
import { resolve } from 'path';

const getDirs = (source: string) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

export const fetchAllComponents = (): string[] => {
  const components = getDirs(resolve('../../packages/web-react/src/components'));

  return components;
};
