import { Collection, FileInfo } from 'jscodeshift';
import { removeParentheses } from './removeParentheses';

type FinishTransformOptions = {
  quote?: 'single' | 'double';
};

export const finishTransform = (
  fileInfo: FileInfo,
  root: Collection,
  hasChanges: boolean,
  options?: FinishTransformOptions,
): string => {
  if (!hasChanges) {
    return fileInfo.source;
  }

  return removeParentheses(root.toSource(options?.quote ? { quote: options.quote } : undefined));
};
