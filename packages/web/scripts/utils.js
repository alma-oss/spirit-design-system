import { readdirSync } from 'fs';
import { kebabToTitleCase } from '@alma-oss/spirit-common/utilities/kebabToTitleCase';

export const getListOfNestedDirectories = (path, mainFile) => [
  ...readdirSync(path, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .filter((item) => readdirSync(`${path}/${item.name}`).includes(mainFile))
    .map((item) => ({
      name: item.name,
      title: kebabToTitleCase(item.name),
    })),
];

export const getListOfIcons = (path) => [
  ...readdirSync(path, { withFileTypes: true }).map((item) => item.name.slice(0, -4)),
];
