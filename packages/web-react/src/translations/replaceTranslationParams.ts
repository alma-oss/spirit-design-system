/**
 * Replaces placeholders like {name} or {count} in translation with values from params.
 *
 * @param translation - String that may contain placeholders, e.g. "Hello, {name}!"
 * @param params - Record; each key replaces every occurrence of '{key}' in translation.
 * @returns {string} Translation with placeholders replaced.
 *
 * @example
 * replaceTranslationParams('Hello, {name}!', { name: 'World' }); // 'Hello, World!'
 * replaceTranslationParams('Page {current} of {total}', { current: 2, total: 10 }); // 'Page 2 of 10'
 */
export const replaceTranslationParams = (translation: string, params: Record<string, unknown>): string =>
  Object.entries(params).reduce((result, [paramKey, value]) => {
    const safeParamKey = paramKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return result.replace(new RegExp(`\\{${safeParamKey}\\}`, 'g'), String(value));
  }, translation);
