import { type ElementType, type ReactNode } from 'react';
import { type ObjectFit } from '../../constants';
import { type PolymorphicComponentProps } from '../../types';
import {
  type SpiritButtonElementProps,
  type SpiritSpanElementProps,
  type ValidationState,
  type ValidationTextType,
} from '../../types/shared';

export interface FileItemMetadata {
  [key: string | number]: unknown;
}

/** Shared by `useFileStyleProps` and `FileImagePreview` for crop / object-fit styling. */
export interface FilePreviewStyleProps {
  meta?: FileItemMetadata;
  imageObjectFit?: (typeof ObjectFit)[keyof typeof ObjectFit];
}

export type FileItem = {
  id: string;
  label: string;
  previewUrl?: string;
  meta?: FileItemMetadata;
};

export interface FileActionButtonProps extends SpiritButtonElementProps {}

export interface FileDismissButtonProps extends SpiritButtonElementProps {}

export interface FileImagePreviewProps extends SpiritSpanElementProps, FilePreviewStyleProps {
  imagePreview: string;
  label: string;
}

export interface FileBaseProps {
  editText?: string;
  helperText?: ReactNode;
  hasValidationIcon?: boolean;
  iconName?: string;
  /** Omitted in static demos when the row should match markup without an `id` on `<li>`. */
  id?: string;
  isDisabled?: boolean;
  label: string;
  /** When omitted, no dismiss (remove) control is rendered. */
  onDismiss?: () => void;
  onChange?: () => void;
  previewSlot?: ReactNode;
  removeText?: string;
  validationState?: ValidationState;
  validationText?: ValidationTextType;
}

export type SpiritFileProps<E extends ElementType = 'li'> = PolymorphicComponentProps<E, FileBaseProps>;

export type FileProps = SpiritFileProps<'li'>;

export interface SpiritFileActionButtonProps extends FileActionButtonProps {}

export interface SpiritFileDismissButtonProps extends FileDismissButtonProps {}

export interface SpiritFileImagePreviewProps extends FileImagePreviewProps {}
