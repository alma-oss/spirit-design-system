/**
 * Empty list and no-op for visual-only demos.
 * Demos using these do not add or remove files – they only show the UI.
 */

import type { FileUploadAttachmentsItem } from '../types';

export const visualOnlyEmptyItems: FileUploadAttachmentsItem[] = [];
export const visualOnlyNoopOnDismiss = () => {};
