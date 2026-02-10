import { type MouseEvent, type MutableRefObject, type ReactNode } from 'react';
import { type ObjectFit } from '../constants';
import {
  type SpiritButtonElementProps,
  type SpiritDivElementProps,
  type SpiritInputElementProps,
  type SpiritLItemElementProps,
  type SpiritUListElementProps,
  type Validation,
  type ValidationTextType,
} from './shared';

export type FileUploaderAttachmentComponentType = (props: FileUploaderAttachmentBaseProps) => ReactNode;
export type FileQueueMapType = Map<string, FileQueueValueType>;
export type FileUploaderErrorCallbackType = (error: string | Error) => void;
export type FileUploaderQueueLimitBehaviorType = 'hide' | 'disable' | 'none';

export interface FileUploaderTextProps {
  helperText?: string;
  labelText?: string;
  linkText?: string;
}

export interface FileMetadata {
  [key: string | number]: unknown;
}

export interface FileQueueValueType {
  file: File;
  meta?: FileMetadata;
}

export interface UpdateQueueBaseType extends FileQueueValueType {
  key: string;
}

export interface FileUploaderHandlingProps {
  addToQueue: (key: string, file: File, meta?: FileMetadata) => FileQueueMapType;
  clearQueue: () => void;
  fileQueue: FileQueueMapType;
  findInQueue: (key: string) => FileQueueValueType | null;
  onDismiss: (key: string) => FileQueueMapType;
  updateQueue: (key: string, file: File, meta?: FileMetadata) => FileQueueMapType;
}

export interface FileUploaderErrorMessagesProps {
  errorMessages?: {
    errorFileDuplicity: string;
    errorFileNotSupported: string;
    errorMaxFileSize: string;
    errorMaxUploadedFiles: string;
  };
}

export interface FileUploaderIntermediateProps {
  iconName?: string;
  isLabelHidden?: boolean;
  isMultiple?: boolean;
  maxFileSize?: number;
  maxUploadedFiles?: number;
  queueLimitBehavior?: FileUploaderQueueLimitBehaviorType;
  validationText?: ValidationTextType;
}

export interface AttachmentActionButtonBaseProps extends SpiritButtonElementProps {}

export interface AttachmentDismissButtonBaseProps extends SpiritButtonElementProps {}

export interface AttachmentImagePreviewProps {
  imagePreview: string;
  label: string;
  meta?: FileMetadata;
  imageObjectFit?: (typeof ObjectFit)[keyof typeof ObjectFit];
}

export interface FileUploaderInputBaseProps
  extends
    Omit<SpiritInputElementProps, 'onError' | 'label'>,
    FileUploaderIntermediateProps,
    FileUploaderTextProps,
    Validation {
  dropZoneRef?: MutableRefObject<HTMLDivElement>;
  id: string;
  inputRef?: MutableRefObject<HTMLInputElement>;
  isDisabled?: boolean;
  label?: ReactNode;
  name: string;
  onError?: FileUploaderErrorCallbackType;
}

export interface FileUploaderListBaseProps extends SpiritUListElementProps {
  attachmentComponent: FileUploaderAttachmentComponentType;
  hasImagePreview?: boolean;
  id: string;
  inputName: string;
  label?: string;
}

export interface FileUploaderAttachmentBaseProps extends Omit<SpiritLItemElementProps, 'onError'> {
  editText?: string;
  file: File;
  hasImagePreview?: boolean;
  iconName?: string;
  id: string;
  imageObjectFit?: (typeof ObjectFit)[keyof typeof ObjectFit];
  label: string;
  meta?: FileMetadata;
  name: string;
  onDismiss: (key: string, callback?: (key: string) => void) => FileQueueMapType;
  onEdit?: (event: MouseEvent, file: File) => void;
  onError?: FileUploaderErrorCallbackType;
  removeText?: string;
}

export interface FileUploaderBaseProps extends SpiritDivElementProps, Partial<FileUploaderErrorMessagesProps> {
  id: string;
  isFluid?: boolean;
}

export interface UncontrolledFileUploaderBaseProps
  extends Omit<FileUploaderBaseProps, 'onChange'>, FileUploaderIntermediateProps {
  attachmentComponent: FileUploaderAttachmentComponentType;
  inputId: string;
  inputLabel: string;
  inputName: string;
  inputProps?: Partial<FileUploaderInputBaseProps>;
  isDisabled?: boolean;
  listId: string;
  listProps?: Partial<FileUploaderListBaseProps>;
  onChange?: (fileQueue: FileQueueMapType) => void;
  onInputError?: FileUploaderErrorCallbackType;
}

export interface SpiritAttachmentActionButtonProps extends AttachmentActionButtonBaseProps {}

export interface SpiritAttachmentDismissButtonProps extends AttachmentDismissButtonBaseProps {}

export interface SpiritFileUploaderInputProps extends FileUploaderInputBaseProps {}

export interface SpiritFileUploaderListProps extends FileUploaderListBaseProps {}

export interface SpiritFileUploaderAttachmentProps extends FileUploaderAttachmentBaseProps {}

export interface SpiritFileUploaderProps extends FileUploaderBaseProps, FileUploaderHandlingProps {}

export interface SpiritUncontrolledFileUploaderProps
  extends UncontrolledFileUploaderBaseProps, FileUploaderTextProps, Validation {}
