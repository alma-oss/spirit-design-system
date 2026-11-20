/** Names Supernova gives to its token collections and to the property that holds them. */
export const TOKEN_COLLECTION_DEVICES_NAME = 'Device';
export const TOKEN_COLLECTION_GLOBAL_NAME = 'Global tokens';
export const TOKEN_COLLECTION_PROPERTY_NAME = 'Collection';
export const TOKEN_COLLECTION_THEMES_NAME = 'Theme tokens';

/**
 * Root groups Supernova keeps tokens without an origin in (lowercase). They are containers of a collection, not groups
 * of a token type, so the tokens in them are not exported with a group of their own.
 */
export const TOKEN_COLLECTION_CONTAINER_GROUP_NAMES = ['global', 'device', 'themed'];
