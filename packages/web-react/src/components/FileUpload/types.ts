import { type MutableRefObject, type ReactNode } from 'react';
import { type SpiritInputElementProps, type Validation, type ValidationTextType } from '../../types/shared';
import { type FileItem } from '../File/types';

export interface FileUploadTextProps {
  /** Label for the decorative button (opens the same file input as the drop-zone label). */
  buttonText?: string;
  helperText?: string;
  /** Drag-and-drop suffix in the drop zone (e.g. "or drag and drop here"). Hidden when drag-and-drop is not supported. */
  inputDragAndDropText?: string;
  /** Primary label in the drop zone (e.g. "Upload your file"). */
  inputUploadText?: string;
}

export type FileUploadAttachmentsItem = FileItem;

export type FilesSelectedType = (files: File[]) => void;

export interface FileUploadInputProps
  extends Omit<SpiritInputElementProps, 'onError' | 'label'>, FileUploadTextProps, Validation {
  accept?: string;
  dropZoneRef?: MutableRefObject<HTMLDivElement>;
  hasValidationIcon?: boolean;
  iconName?: string;
  id: string;
  inputRef?: MutableRefObject<HTMLInputElement>;
  isCompact?: boolean;
  isDisabled?: boolean;
  /** When set, overrides environment drag-and-drop detection (e.g. unsupported appearance in docs). */
  isDragAndDropSupported?: boolean;
  isLabelHidden?: boolean;
  isMultiple?: boolean;
  isRequired?: boolean;
  isUploadDisabled?: boolean;
  label?: ReactNode;
  name: string;
  onFilesSelected?: FilesSelectedType;
  validationText?: ValidationTextType;
}

export interface FileUploadProps extends FileUploadInputProps {
  id: string;
  /** Optional `id` on the root `.FileUpload` wrapper (static HTML uses `example-*` ids for doc sections). */
  rootId?: string;
}
