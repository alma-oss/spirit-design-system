import { type MutableRefObject, type ReactNode } from 'react';
import {
  type SpiritInputElementProps,
  type StringsProps,
  type TranslatableString,
  type Validation,
  type ValidationTextType,
} from '../../types/shared';
import { type FileItem } from '../File/types';

export type FileUploadStrings = {
  labelButton?: TranslatableString;
  labelDragAndDrop?: TranslatableString;
  labelUpload?: TranslatableString;
};

export interface FileUploadTextProps extends StringsProps<FileUploadStrings> {
  /** Label for the decorative button (opens the same file input as the drop-zone label). */
  /** @deprecated Use `strings.labelButton` instead. */
  buttonText?: string;
  helperText?: string;
  /** Drag-and-drop suffix in the drop zone (e.g. "or drag and drop here"). Hidden when drag-and-drop is not supported. */
  /** @deprecated Use `strings.labelDragAndDrop` instead. */
  inputDragAndDropText?: string;
  /** Primary label in the drop zone (e.g. "Upload your file"). */
  /** @deprecated Use `strings.labelUpload` instead. */
  inputUploadText?: string;
}

export type FileUploadAttachmentsItem = FileItem;

export type FilesSelectedType = (files: File[]) => void;

export type FileUploadInputProps = Omit<SpiritInputElementProps, 'onError' | 'label' | 'strings'> &
  FileUploadTextProps &
  Validation & {
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
  };

export type FileUploadProps = FileUploadInputProps & {
  id: string;
  /** Optional `id` on the root `.FileUpload` wrapper (static HTML uses `example-*` ids for doc sections). */
  rootId?: string;
};
