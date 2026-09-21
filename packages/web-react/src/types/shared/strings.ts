/**
 * Component text provided directly or resolved from the active translation catalog.
 */
export type TranslatableString = string | { key: string; params?: Record<string, unknown> };

/**
 * Optional component copy grouped under `label` (visible) and `ariaLabel` (screen-reader).
 * Leaves are `TranslatableString` under a descriptive key even when a group has only one string.
 */
export interface ComponentStrings {
  [key: string]: TranslatableString | ComponentStrings | undefined;
}

export interface StringsProps<T extends ComponentStrings = ComponentStrings> {
  strings?: T;
}
