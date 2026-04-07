import { type ElementType, type ReactNode } from 'react';
import { type ObjectFit } from '../../constants';
import { type PolymorphicComponentProps } from '../../types';
import {
  type SpiritButtonElementProps,
  type SpiritSpanElementProps,
  type ValidationState,
  type ValidationTextType,
} from '../../types/shared';

export interface UnstableFileItemMetadata {
  [key: string | number]: unknown;
}

/** Shared by `useFileStyleProps` and `UNSTABLE_FileImagePreview` for crop / object-fit styling. */
export interface UnstableFilePreviewStyleProps {
  meta?: UnstableFileItemMetadata;
  imageObjectFit?: (typeof ObjectFit)[keyof typeof ObjectFit];
}

export type UnstableFileItem = {
  id: string;
  label: string;
  previewUrl?: string;
  meta?: UnstableFileItemMetadata;
};

export interface UnstableFileActionButtonProps extends SpiritButtonElementProps {}

export interface UnstableFileDismissButtonProps extends SpiritButtonElementProps {}

export interface UnstableFileImagePreviewProps extends SpiritSpanElementProps, UnstableFilePreviewStyleProps {
  imagePreview: string;
  label: string;
}

export interface UnstableFileBaseProps {
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

export type SpiritUnstableFileProps<E extends ElementType = 'li'> = PolymorphicComponentProps<E, UnstableFileBaseProps>;

export type UnstableFileProps = SpiritUnstableFileProps<'li'>;

export interface SpiritUnstableFileActionButtonProps extends UnstableFileActionButtonProps {}

export interface SpiritUnstableFileDismissButtonProps extends UnstableFileDismissButtonProps {}

export interface SpiritUnstableFileImagePreviewProps extends UnstableFileImagePreviewProps {}
