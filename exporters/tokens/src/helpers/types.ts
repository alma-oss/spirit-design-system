/** Types shared by the helpers. Types used by a single helper stay next to it. */

export type KeyValueTemplateCallback = (key: string, value: string | number) => string;

/**
 * The part of a token its variable name is derived from. Any source's token fits, because it is read from the
 * internal model (group path, name, device) and not from a native token.
 */
export type NameableToken = { name: string; groupPath: string[]; device?: string };
