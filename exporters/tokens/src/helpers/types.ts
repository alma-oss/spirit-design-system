/** Types shared by the helpers. Types used by a single helper stay next to it. */

export type KeyValueTemplateCallback = (key: string, value: string | number) => string;

export type FontSizeBaseMap = Map<string, number>;

/** The part of a token needed to find its group. Any source's token with a parent group id fits. */
export type GroupedToken = { parentGroupId: string };

/** The part of a token group needed to build a path. Any source's group with an id, a name and a path fits. */
export type PathGroup = { id: string; name: string; path: string[]; isRoot?: boolean };

/**
 * The part of a token its variable name is derived from. Any source's token fits, because it is read from the
 * internal model (group path, name, device) and not from a native token.
 */
export type NameableToken = { name: string; groupPath: string[]; device?: string };

/** The part of a token that carries its device. Any source's token with property values fits. */
export type DeviceToken = { propertyValues?: Record<string, unknown> };

/** The part of a theme needed to name a device. */
export type DeviceTheme = { codeName: string };
