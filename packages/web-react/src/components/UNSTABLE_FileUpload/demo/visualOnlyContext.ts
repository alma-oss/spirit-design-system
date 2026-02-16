/**
 * Empty list and no-op for visual-only demos.
 * Demos using these do not add or remove files – they only show the UI.
 */

import type { UnstableFileUploadAttachmentsItem } from '../types';

export const visualOnlyEmptyItems: UnstableFileUploadAttachmentsItem[] = [];
export const visualOnlyNoopOnDismiss = () => {};
