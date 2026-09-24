/**
 * Component text provided directly or resolved from the active translation catalog.
 */
export type TranslatableString = string | { key: string; params?: Record<string, unknown> };

/**
 * Optional component copy grouped under `label` (visible) and `ariaLabel` (screen-reader).
 * Leaves are `TranslatableString`; nest further only when a group of related strings needs it.
 */
export interface ComponentStrings {
  [key: string]: TranslatableString | ComponentStrings | undefined;
}

export interface StringsProps<T extends ComponentStrings = ComponentStrings> {
  strings?: T;
}
