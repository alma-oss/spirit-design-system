import path from 'path';

export interface Logger {
  info(msg: string): void;
  warn(msg: string): void;
  error(msg: string): never;
}

export const ICON_TYPE_DUALTONE = 'dualtone';
export const ICON_TYPE_COLORED = 'colored';

export const filterSvgFiles = (fileNames: string[]): string[] =>
  fileNames.filter((fileName) => path.extname(fileName) === '.svg' && fileName !== 'sprite.svg');

export const getIconType = (fileName: string): string => {
  if (fileName.endsWith('-dualtone.svg')) {
    return ICON_TYPE_DUALTONE;
  }

  if (fileName.endsWith('-colored.svg')) {
    return ICON_TYPE_COLORED;
  }

  return 'default';
};
