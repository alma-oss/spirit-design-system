export const CHANGE_TYPES = {
  ADDED: 'added',
  DELETED: 'deleted',
  UPDATED: 'updated',
} as const;

export const CONFIG_MODULE_NAME = 'spirit';
export const ROOT_CONFIG_FILE = `${CONFIG_MODULE_NAME}.config.json`;

export const FIGMA_API_URL = 'https://api.figma.com/v1';
export const NODE_BATCH_SIZE = 100;
export const REQUEST_TIMEOUT_MS = 30_000;
