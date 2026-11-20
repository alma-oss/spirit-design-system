import { FileHelper } from '@supernovaio/export-helpers';
import { type OutputTextFile } from '@supernovaio/sdk-exporters';
import { type OutputFile } from '../../core/types';

export const writeToTextFile = (relativePath: string, fileName: string, content: string): OutputTextFile => {
  return FileHelper.createTextFile({
    relativePath,
    fileName,
    content,
  });
};

export const textFileWriter = (files: Array<OutputFile>) => {
  return files.map((file) => {
    const { path, fileName, content } = file;

    return writeToTextFile(path, fileName, content);
  });
};
