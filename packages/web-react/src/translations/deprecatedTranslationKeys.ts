import type { TranslationTree } from './translationTree';

/**
 * Previous public dictionary paths mapped to the `strings`-shaped path.
 * Remove this file in v6. The deletion list is in `DEPRECATIONS.md` (Translation Dictionary).
 */
export const deprecatedTranslationKeys: Record<string, string> = {
  'attachment.edit': 'attachment.editAria',
  'attachment.remove': 'attachment.removeAria',
  'combobox.addMore': 'combobox.addMore.label',
  'combobox.addMoreDescription': 'combobox.addMore.descriptionAria',
  'combobox.removeAll': 'combobox.removeAllAria',
  'combobox.removeItemLabel': 'combobox.tag.removeAria',
  'combobox.selectionAriaLabel': 'combobox.selection.labelAria',
  'combobox.selectionCountLabel': 'combobox.selection.countAria.plural',
  'combobox.selectionCountLabelSingular': 'combobox.selection.countAria.singular',
  'combobox.splitTagListboxLabel': 'combobox.splitTag.listboxAria',
  'combobox.splitTagSelectLabel': 'combobox.splitTag.selectAria',
  'combobox.tagDescriptionText': 'combobox.tag.descriptionAria',
  'fileUploader.browse': 'fileUploader.button',
  'fileUploader.inputDragAndDrop': 'fileUploader.dragAndDrop',
  'fileUploader.inputUpload': 'fileUploader.upload',
  'pagination.goToPage': 'pagination.pageAria',
  'pagination.next': 'pagination.nextAria',
  'pagination.previous': 'pagination.previousAria',
  'picker.add': 'picker.addAria',
  'picker.removeAll': 'picker.removeAllAria',
  'picker.removeItemLabel': 'picker.tag.removeAria',
  'picker.selectionAriaLabel': 'picker.selection.labelAria',
  'picker.tagDescriptionText': 'picker.tag.descriptionAria',
  'scrollView.ariaBottom': 'scrollView.bottomAria',
  'scrollView.ariaEnd': 'scrollView.endAria',
  'scrollView.ariaStart': 'scrollView.startAria',
  'scrollView.ariaTop': 'scrollView.topAria',
  'splitButton.dropdown': 'splitButton.dropdown.trigger',
  'textArea.counter.canEnterUpTo': 'textArea.counter.canEnterUpToAria',
  'textArea.counter.characterOverLimit': 'textArea.counter.character.overLimitAria',
  'textArea.counter.characterRemaining': 'textArea.counter.character.remainingAria',
  'textArea.counter.charactersEntered': 'textArea.counter.characters.enteredAria',
  'textArea.counter.charactersOverLimit': 'textArea.counter.characters.overLimitAria',
  'textArea.counter.charactersRemaining': 'textArea.counter.characters.remainingAria',
  'textField.password.hide': 'textField.hideAria',
  'textField.password.show': 'textField.showAria',
};

const currentTranslationKeys: Record<string, string> = Object.fromEntries(
  Object.entries(deprecatedTranslationKeys).map(([deprecatedKey, currentKey]) => [currentKey, deprecatedKey]),
);

const isTranslationTree = (value: unknown): value is TranslationTree =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const cloneTranslationTree = (tree: TranslationTree): TranslationTree => {
  const result: TranslationTree = {};

  for (const key of Object.keys(tree)) {
    const value = tree[key];
    result[key] = typeof value === 'string' ? value : cloneTranslationTree(value);
  }

  return result;
};

const getNode = (tree: TranslationTree, path: string): string | TranslationTree | undefined => {
  const parts = path.split('.');
  let current: string | TranslationTree = tree;

  for (const part of parts) {
    if (!isTranslationTree(current) || !(part in current)) {
      return undefined;
    }

    current = current[part];
  }

  return current;
};

const lookupString = (tree: TranslationTree, path: string): string | undefined => {
  const value = getNode(tree, path);

  return typeof value === 'string' ? value : undefined;
};

const setString = (tree: TranslationTree, path: string, value: string): void => {
  const parts = path.split('.');
  let current = tree;

  for (let index = 0; index < parts.length - 1; index += 1) {
    const part = parts[index];
    const next = current[part];

    if (!isTranslationTree(next)) {
      current[part] = {};
    }

    current = current[part] as TranslationTree;
  }

  current[parts[parts.length - 1]] = value;
};

const unsetPath = (tree: TranslationTree, path: string): void => {
  const parts = path.split('.');
  let current = tree;

  for (let index = 0; index < parts.length - 1; index += 1) {
    const next = current[parts[index]];

    if (!isTranslationTree(next)) {
      return;
    }

    current = next;
  }

  delete current[parts[parts.length - 1]];
};

const pruneEmpty = (tree: TranslationTree): TranslationTree => {
  const result: TranslationTree = {};

  for (const key of Object.keys(tree)) {
    const value = tree[key];

    if (typeof value === 'string') {
      result[key] = value;
    } else {
      const nested = pruneEmpty(value);

      if (Object.keys(nested).length > 0) {
        result[key] = nested;
      }
    }
  }

  return result;
};

/**
 * Copies deprecated override keys onto the current path, then drops the deprecated key.
 * A string that used to be a leaf (`combobox.addMore`, `splitButton.dropdown`) becomes the nested
 * object instead of replacing it, so sibling defaults survive the merge.
 *
 * @param override
 */
export const migrateDeprecatedTranslations = (override: TranslationTree): TranslationTree => {
  const result = cloneTranslationTree(override);

  for (const [deprecatedKey, currentKey] of Object.entries(deprecatedTranslationKeys)) {
    const deprecatedValue = getNode(result, deprecatedKey);

    if (typeof deprecatedValue === 'string' && lookupString(result, currentKey) === undefined) {
      setString(result, currentKey, deprecatedValue);

      if (!currentKey.startsWith(`${deprecatedKey}.`)) {
        unsetPath(result, deprecatedKey);
      }
    }
  }

  return pruneEmpty(result);
};

/**
 * Resolves a dictionary path. A deprecated path falls back to the current one, and a current path
 * falls back to the deprecated one when that string is still present.
 *
 * @param translations
 * @param key
 */
export const resolveTranslation = (translations: TranslationTree, key: string): string => {
  const direct = lookupString(translations, key);

  if (direct !== undefined) {
    return direct;
  }

  const alias = deprecatedTranslationKeys[key] ?? currentTranslationKeys[key];

  if (alias !== undefined) {
    const aliased = lookupString(translations, alias);

    if (aliased !== undefined) {
      return aliased;
    }
  }

  return key;
};
