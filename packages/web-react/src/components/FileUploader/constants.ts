export const DEFAULT_FILE_SIZE_LIMIT = 10000000; // = 10 MB
export const DEFAULT_FILE_QUEUE_LIMIT = 1;
export const IMAGE_DIMENSION = 54; // px; @see: CSS class `.FileUploaderAttachment__image` in _FileUploaderAttachment.scss
export const IMAGE_PREVIEW_BASE64_MAX_WIDTH = 500; // px

export const DEFAULT_ERROR_MESSAGE_MAX_FILE_SIZE = 'The file size limit has been exceeded';
export const DEFAULT_ERROR_MESSAGE_QUEUE_DUPLICITY = 'This file already exists in the queue';
export const DEFAULT_ERROR_MESSAGE_QUEUE_LIMIT = 'You have exceeded the number of files allowed in the queue';
export const DEFAULT_ERROR_MESSAGE_UNSUPPORTED_FILE = 'This file type is not supported';
export const DEFAULT_ICON_NAME = 'file';

export const FileUploaderCropCSS = {
  TOP: '--file-uploader-attachment-image-top',
  LEFT: '--file-uploader-attachment-image-left',
  WIDTH: '--file-uploader-attachment-image-width',
  HEIGHT: '--file-uploader-attachment-image-height',
} as const;
