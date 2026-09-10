import { escapeMdxPunctuation } from './escapeMdxPunctuation';

export const prepareMarkdownSource = (raw: string, isCanonical: boolean): string =>
  isCanonical ? raw : escapeMdxPunctuation(raw);
