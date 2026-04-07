import { type MutableRefObject, type ReactNode } from 'react';
import { type SpiritInputElementProps, type Validation, type ValidationTextType } from '../../types/shared';
import { type UnstableFileItem } from '../UNSTABLE_File/types';

export interface UnstableFileUploadTextProps {
  /** Label for the decorative button (opens the same file input as the drop-zone label). */
  buttonText?: string;
  helperText?: string;
  labelText?: string;
  linkText?: string;
}

export type UnstableFileUploadAttachmentsItem = UnstableFileItem;

export type FilesSelectedType = (files: File[]) => void;

export interface UnstableFileUploadInputProps
  extends Omit<SpiritInputElementProps, 'onError' | 'label'>, UnstableFileUploadTextProps, Validation {
  accept?: string;
  dropZoneRef?: MutableRefObject<HTMLDivElement>;
  hasValidationIcon?: boolean;
  iconName?: string;
  id: string;
  inputRef?: MutableRefObject<HTMLInputElement>;
  isDisabled?: boolean;
  isCompact?: boolean;
  /** When set, overrides environment drag-and-drop detection (e.g. unsupported appearance in docs). */
  isDragAndDropSupported?: boolean;
  isLabelHidden?: boolean;
  isMultiple?: boolean;
  isRequired?: boolean;
  label?: ReactNode;
  name: string;
  onFilesSelected?: FilesSelectedType;
  validationText?: ValidationTextType;
}

export interface UnstableFileUploadProps extends UnstableFileUploadInputProps {
  id: string;
  /** Optional `id` on the root `.UNSTABLE_FileUpload` wrapper (static HTML uses `example-*` ids for doc sections). */
  rootId?: string;
}
