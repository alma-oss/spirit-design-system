/**
 * Component text provided directly or resolved from the active translation catalog.
 */
export type TranslatableString = string | { key: string; params?: Record<string, unknown> };

/**
 * Optional component copy. The `Aria` suffix marks text that is not displayed and exists only as an
 * accessible name, description, or instruction. Related strings are grouped by purpose.
 */
export interface ComponentStrings {
  [key: string]: TranslatableString | ComponentStrings | undefined;
}

export interface StringsProps<T extends ComponentStrings = ComponentStrings> {
  strings?: T;
}
