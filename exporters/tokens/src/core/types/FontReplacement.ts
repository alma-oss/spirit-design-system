/**
 * A search-and-replace pair for the font family of a typography style. A source-neutral input of the pipeline: where
 * the pairs come from (a tool's settings, a config file) is up to the entry.
 */
export type FontReplacement = { search: string; replace: string };
