import { type MutableRefObject, type ReactNode } from 'react';
import { type ObjectFit } from '../../constants';
import {
  type SpiritButtonElementProps,
  type SpiritDivElementProps,
  type SpiritInputElementProps,
  type SpiritLItemElementProps,
  type SpiritUListElementProps,
  type Validation,
  type ValidationTextType,
} from '../../types/shared';

export type UnstableFileUploadAttachmentComponentType = (props: UnstableFileUploadAttachmentProps) => ReactNode;
export type UnstableFileQueueMapType = Map<string, UnstableFileQueueValueType>;

export interface UnstableFileUploadTextProps {
  helperText?: string;
  labelText?: string;
  linkText?: string;
}

export interface UnstableFileMetadata {
  [key: string | number]: unknown;
}

/** Stored value: display-only data (no File). previewUrl is object URL for images; revoke on remove. */
export interface UnstableFileQueueValueType {
  label: string;
  previewUrl?: string;
  meta?: UnstableFileMetadata;
}

/** Single item for UNSTABLE_FileUploadAttachments (id + label + optional previewUrl/meta). No File. */
export type UnstableFileUploadAttachmentsItem = {
  id: string;
  label: string;
  previewUrl?: string;
  meta?: UnstableFileMetadata;
};

/**
 * Shape returned by demo/useFileQueue. addToQueue/updateQueue accept File and convert to display data internally.
 */
export interface UnstableFileUploadHandlingProps {
  addToQueue: (key: string, file: File, meta?: UnstableFileMetadata) => void;
  clearQueue: () => void;
  fileQueue: UnstableFileQueueMapType;
  findInQueue: (key: string) => UnstableFileQueueValueType | null;
  onDismiss: (key: string) => void;
  updateQueue: (key: string, file: File, meta?: UnstableFileMetadata) => void;
}

export interface UnstableAttachmentActionButtonProps extends SpiritButtonElementProps {}

export interface UnstableAttachmentDismissButtonProps extends SpiritButtonElementProps {}

export interface UnstableAttachmentImagePreviewProps {
  imagePreview: string;
  label: string;
  meta?: UnstableFileMetadata;
  imageObjectFit?: (typeof ObjectFit)[keyof typeof ObjectFit];
}

export interface UnstableFileUploadInputProps
  extends Omit<SpiritInputElementProps, 'onError' | 'label'>, UnstableFileUploadTextProps, Validation {
  accept?: string;
  dropZoneRef?: MutableRefObject<HTMLDivElement>;
  hasValidationIcon?: boolean;
  iconName?: string;
  id: string;
  inputRef?: MutableRefObject<HTMLInputElement>;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  isMultiple?: boolean;
  isRequired?: boolean;
  label?: ReactNode;
  name: string;
  /** Called when user selects or drops files. Parent decides how to store them. */
  onFilesSelected?: (files: File[]) => void;
  validationText?: ValidationTextType;
}

export interface UnstableFileUploadAttachmentsProps extends SpiritUListElementProps {
  /** Attachment items rendered as direct children (e.g. UNSTABLE_FileUploadAttachment). */
  children?: ReactNode;
  id: string;
  label?: string;
}

export interface UnstableFileUploadAttachmentProps extends SpiritLItemElementProps {
  editText?: string;
  iconName?: string;
  id: string;
  label: string;
  onDismiss: () => void;
  onChange?: () => void;
  removeText?: string;
  /**
   * Optional thumbnail slot. When provided, it is rendered instead of the default icon.
   * Pass any ReactNode (e.g. UNSTABLE_AttachmentImagePreview with imagePreview URL string).
   */
  thumbnail?: ReactNode;
}

export interface UnstableFileUploadProps extends SpiritDivElementProps {
  id: string;
  isFluid?: boolean;
}

export interface SpiritUnstableAttachmentActionButtonProps extends UnstableAttachmentActionButtonProps {}

export interface SpiritUnstableAttachmentDismissButtonProps extends UnstableAttachmentDismissButtonProps {}

export interface SpiritUnstableFileUploadInputProps extends UnstableFileUploadInputProps {}

export interface SpiritUnstableFileUploadAttachmentsProps extends UnstableFileUploadAttachmentsProps {}

export interface SpiritUnstableFileUploadAttachmentProps extends UnstableFileUploadAttachmentProps {}

export interface SpiritUnstableFileUploadProps extends UnstableFileUploadProps {}
