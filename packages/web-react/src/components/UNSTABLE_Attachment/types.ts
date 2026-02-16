import { type ElementType, type ReactNode } from 'react';
import { type ObjectFit } from '../../constants';
import { type PolymorphicComponentProps } from '../../types';
import { type SpiritButtonElementProps, type SpiritSpanElementProps } from '../../types/shared';

export interface UnstableFileMetadata {
  [key: string | number]: unknown;
}

/** Single item for the attachments list (id + label + optional previewUrl/meta). No File. */
export type UnstableAttachmentItem = {
  id: string;
  label: string;
  previewUrl?: string;
  meta?: UnstableFileMetadata;
};

export interface UnstableAttachmentActionButtonProps extends SpiritButtonElementProps {}

export interface UnstableAttachmentDismissButtonProps extends SpiritButtonElementProps {}

export interface UnstableAttachmentImagePreviewProps extends SpiritSpanElementProps {
  imagePreview: string;
  label: string;
  meta?: UnstableFileMetadata;
  imageObjectFit?: (typeof ObjectFit)[keyof typeof ObjectFit];
}

export interface UnstableAttachmentBaseProps {
  editText?: string;
  iconName?: string;
  id: string;
  isFluid?: boolean;
  label: string;
  onDismiss: () => void;
  onChange?: () => void;
  removeText?: string;
  /**
   * Optional preview slot. When provided, it is rendered instead of the default icon.
   * Pass any ReactNode (e.g. UNSTABLE_AttachmentImagePreview with imagePreview URL string).
   */
  previewSlot?: ReactNode;
}

export type SpiritUnstableAttachmentProps<E extends ElementType = 'li'> = PolymorphicComponentProps<
  E,
  UnstableAttachmentBaseProps
>;

/** Alias for default element type. */
export type UnstableAttachmentProps = SpiritUnstableAttachmentProps<'li'>;

export interface SpiritUnstableAttachmentActionButtonProps extends UnstableAttachmentActionButtonProps {}

export interface SpiritUnstableAttachmentDismissButtonProps extends UnstableAttachmentDismissButtonProps {}

export interface SpiritUnstableAttachmentImagePreviewProps extends UnstableAttachmentImagePreviewProps {}
