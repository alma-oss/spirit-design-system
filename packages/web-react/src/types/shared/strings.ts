/**
 * Component text provided directly or resolved from the active translation catalog.
 */
export type TranslatableString = string | { key: string; params?: Record<string, unknown> };

export interface WithStrings<T extends Record<string, TranslatableString | undefined>> {
  strings?: T;
}
