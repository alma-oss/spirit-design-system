import { existsSync, readdirSync } from 'fs';
import { resolve } from 'path';

const getDirs = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

export const getNestedDirs = (baseDir, mainFile) =>
  getDirs(resolve(__dirname, `../${baseDir}`)).reduce(
    (accumulator, dirName) =>
      existsSync(resolve(__dirname, `../${baseDir}/${dirName}/${mainFile}`))
        ? {
          ...accumulator,
          [dirName]: resolve(__dirname, `../${baseDir}/${dirName}/${mainFile}`),
        }
        : accumulator,
    {},
  );

export const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[fn(obj[key], key, obj)] = obj[key];

    return acc;
  }, {});
