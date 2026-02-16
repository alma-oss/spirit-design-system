import { type MutableRefObject, type ReactNode } from 'react';
import { type SpiritInputElementProps, type Validation, type ValidationTextType } from '../../types/shared';
import { type UnstableAttachmentItem } from '../UNSTABLE_Attachment/types';

export interface UnstableFileUploadTextProps {
  helperText?: string;
  labelText?: string;
  linkText?: string;
}

export type UnstableFileUploadAttachmentsItem = UnstableAttachmentItem;

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
  isFluid?: boolean;
}
