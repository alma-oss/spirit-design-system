import React, { useMemo, useState } from 'react';
import { Button, Modal, ModalBody, ModalDialog, ModalFooter, Stack } from '../../../src/components';
import { UNSTABLE_Attachment, UNSTABLE_AttachmentImagePreview } from '../../../src/components/UNSTABLE_Attachment';
import { useFilePreviewUrl } from '../../../src/components/UNSTABLE_Attachment/demo/useFilePreviewUrl';
import { UNSTABLE_FileUpload } from '../../../src/components/UNSTABLE_FileUpload';
import { useFileQueue } from '../../../src/components/UNSTABLE_FileUpload/demo/useFileQueue';
import type { UnstableFileUploadAttachmentsItem } from '../../../src/components/UNSTABLE_FileUpload/types';
import { ObjectFit, ValidationStates } from '../../../src/constants';

const fileToKey = (name: string): string => `file__${name.replace(/\./g, '_').replace(/\s/g, '_')}`;

type UNSTABLE_FileUploadCompositionType = {
  fileUploadId: string;
  isFluid: boolean;
  accept: string;
  hasValidationIcon: boolean;
  helperText: string;
  iconName: string;
  isDisabled: boolean;
  isLabelHidden: boolean;
  isMultiple: boolean;
  isRequired: boolean;
  label: string;
  labelText: string;
  linkText: string;
  name: string;
  validationState: (typeof ValidationStates)[keyof typeof ValidationStates] | undefined;
  validationText: string;
  // Attachments list (Stack) – aria-label
  attachmentsLabel: string;
  // UNSTABLE_Attachment props (applies to all items)
  attachmentIconName: string;
  editText: string;
  removeText: string;
  showEditButton: boolean;
  // UNSTABLE_AttachmentImagePreview props
  imageObjectFit: (typeof ObjectFit)[keyof typeof ObjectFit];
  showImagePreview: boolean;
};

export default {
  title: 'Examples/Compositions',
  argTypes: {
    fileUploadId: {
      control: 'text',
      description: 'Id of the root FileUpload container.',
      name: 'id',
      table: {
        category: 'UNSTABLE_FileUpload',
        defaultValue: { summary: 'file-uploader-unstable-example' },
      },
    },
    isFluid: {
      control: 'boolean',
      description: 'When the field is supposed to be fluid.',
      table: {
        category: 'UNSTABLE_FileUpload',
        defaultValue: { summary: false },
      },
    },
    accept: {
      control: 'text',
      description: 'Comma-separated list of file types or type specifiers.',
      table: {
        category: 'UNSTABLE_FileUpload',
        defaultValue: { summary: '.png,image/jpeg' },
      },
    },
    hasValidationIcon: {
      control: 'boolean',
      description: 'Whether to show validation icon.',
      table: {
        category: 'UNSTABLE_FileUpload',
        defaultValue: { summary: false },
      },
    },
    helperText: {
      control: 'text',
      description: 'Custom helper text.',
      table: {
        category: 'UNSTABLE_FileUpload',
        defaultValue: { summary: 'Max file size is 10 MB' },
      },
    },
    iconName: {
      control: 'text',
      description: 'Icon used in the drop zone.',
      table: {
        category: 'UNSTABLE_FileUpload',
        defaultValue: { summary: 'upload' },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the field is disabled.',
      table: {
        category: 'UNSTABLE_FileUpload',
        defaultValue: { summary: false },
      },
    },
    isLabelHidden: {
      control: 'boolean',
      description: 'Whether the input label is hidden.',
      table: {
        category: 'UNSTABLE_FileUpload',
        defaultValue: { summary: false },
      },
    },
    isMultiple: {
      control: 'boolean',
      description: 'When multiple files can be selected at once.',
      table: {
        category: 'UNSTABLE_FileUpload',
        defaultValue: { summary: false },
      },
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the field is marked as required.',
      table: {
        category: 'UNSTABLE_FileUpload',
        defaultValue: { summary: false },
      },
    },
    label: {
      control: 'text',
      description: 'Field label.',
      table: {
        category: 'UNSTABLE_FileUpload',
        defaultValue: { summary: 'Label' },
      },
    },
    labelText: {
      control: 'text',
      description: 'Label for input in drop zone.',
      table: {
        category: 'UNSTABLE_FileUpload',
        defaultValue: { summary: 'or drag and drop here' },
      },
    },
    linkText: {
      control: 'text',
      description: 'Link text in drop zone.',
      table: {
        category: 'UNSTABLE_FileUpload',
        defaultValue: { summary: 'Upload your file(s)' },
      },
    },
    name: {
      control: 'text',
      description: 'Field name for attachments.',
      table: {
        category: 'UNSTABLE_FileUpload',
        defaultValue: { summary: 'attachments' },
      },
    },
    validationState: {
      control: 'select',
      description: 'Validation state (visual only).',
      options: [...Object.values(ValidationStates), undefined],
      table: {
        category: 'UNSTABLE_FileUpload',
        defaultValue: { summary: undefined },
      },
    },
    validationText: {
      control: 'text',
      description: 'Validation status text (visual only).',
      table: {
        category: 'UNSTABLE_FileUpload',
        defaultValue: { summary: 'Validation message' },
      },
    },
    // Attachments list (Stack aria-label)
    attachmentsLabel: {
      control: 'text',
      description: 'Accessible label for the attachments list (Stack aria-label).',
      name: 'label',
      table: {
        category: 'Attachments list',
        defaultValue: { summary: 'Attachments' },
      },
    },
    // UNSTABLE_Attachment props
    attachmentIconName: {
      control: 'text',
      description: 'Icon shown when no previewSlot is provided.',
      name: 'iconName',
      table: {
        category: 'UNSTABLE_Attachment',
        defaultValue: { summary: 'file' },
      },
    },
    editText: {
      control: 'text',
      description: 'Edit button label.',
      table: {
        category: 'UNSTABLE_Attachment',
        defaultValue: { summary: 'Edit' },
      },
    },
    removeText: {
      control: 'text',
      description: 'Remove button label.',
      table: {
        category: 'UNSTABLE_Attachment',
        defaultValue: { summary: 'Remove' },
      },
    },
    showEditButton: {
      control: 'boolean',
      description: 'Show the edit button on each attachment.',
      table: {
        category: 'UNSTABLE_Attachment',
        subcategory: 'Demo settings',
        defaultValue: { summary: false },
      },
    },
    // UNSTABLE_AttachmentImagePreview props
    imageObjectFit: {
      control: 'select',
      description: 'How the image fits in the preview frame.',
      options: [ObjectFit.CONTAIN, ObjectFit.COVER],
      table: {
        category: 'UNSTABLE_AttachmentImagePreview',
        defaultValue: { summary: ObjectFit.COVER },
      },
    },
    showImagePreview: {
      control: 'boolean',
      description: 'Show image preview (preview slot) for image attachments.',
      name: 'show image preview',
      table: {
        category: 'UNSTABLE_AttachmentImagePreview',
        subcategory: 'Demo settings',
        defaultValue: { summary: true },
      },
    },
  },
  args: {
    accept: '.png,image/jpeg',
    attachmentIconName: 'file',
    attachmentsLabel: 'Attachments',
    editText: 'Edit',
    fileUploadId: 'file-uploader-unstable-example',
    hasValidationIcon: false,
    helperText: 'Max file size is 10 MB',
    iconName: 'upload',
    imageObjectFit: ObjectFit.COVER,
    isDisabled: false,
    isFluid: false,
    isLabelHidden: false,
    isMultiple: false,
    isRequired: false,
    label: 'Label',
    labelText: 'or drag and drop here',
    linkText: 'Upload your file(s)',
    name: 'attachments',
    removeText: 'Remove',
    showEditButton: false,
    showImagePreview: true,
    validationState: undefined,
    validationText: 'Validation message',
  },
};

export const UNSTABLE_FileUploadWithModalImagePreview = (args: UNSTABLE_FileUploadCompositionType) => {
  const {
    accept,
    attachmentIconName,
    attachmentsLabel,
    editText,
    fileUploadId,
    hasValidationIcon,
    helperText,
    iconName,
    imageObjectFit,
    isDisabled,
    isFluid,
    isLabelHidden,
    isMultiple,
    isRequired,
    label,
    labelText,
    linkText,
    name,
    removeText,
    showEditButton,
    showImagePreview,
    validationState,
    validationText,
  } = args;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileToPreview, setFileToPreview] = useState<File | null>(null);
  const previewUrl = useFilePreviewUrl(fileToPreview ?? new File([], ''));
  const { fileQueue, addToQueue, onDismiss } = useFileQueue();

  const items: UnstableFileUploadAttachmentsItem[] = useMemo(
    () =>
      Array.from(fileQueue.entries(), ([id, value]) => ({
        id,
        label: value.label,
        previewUrl: value.previewUrl,
        meta: value.meta,
      })),
    [fileQueue],
  );

  const onFilesSelected = (files: File[]) => {
    if (files.length === 1 && files[0].type.includes('image')) {
      setFileToPreview(files[0]);
      setIsModalOpen(true);

      return;
    }
    files.forEach((file) => addToQueue(fileToKey(file.name), file));
  };

  const resetModalState = () => {
    setIsModalOpen(false);
    setFileToPreview(null);
  };

  const handleClose = () => {
    resetModalState();
  };

  const confirmPreview = () => {
    if (fileToPreview) {
      addToQueue(fileToKey(fileToPreview.name), fileToPreview);
    }
    resetModalState();
  };

  return (
    <Stack hasSpacing>
      <UNSTABLE_FileUpload
        id={fileUploadId}
        isFluid={isFluid}
        accept={accept}
        hasValidationIcon={hasValidationIcon}
        helperText={helperText}
        iconName={iconName}
        isDisabled={isDisabled}
        isLabelHidden={isLabelHidden}
        isMultiple={isMultiple}
        isRequired={isRequired}
        label={label}
        labelText={labelText}
        linkText={linkText}
        name={name}
        onFilesSelected={onFilesSelected}
        validationState={validationState}
        validationText={validationText}
      />
      <Stack aria-label={attachmentsLabel} elementType="ul" hasSpacing>
        {items.map((item) => (
          <UNSTABLE_Attachment
            key={item.id}
            editText={editText}
            iconName={attachmentIconName}
            id={item.id}
            label={item.label}
            onDismiss={() => onDismiss(item.id)}
            removeText={removeText}
            {...(showEditButton && { onChange: () => {} })}
            {...(showImagePreview &&
              item.previewUrl && {
                previewSlot: (
                  <UNSTABLE_AttachmentImagePreview
                    imageObjectFit={imageObjectFit}
                    imagePreview={item.previewUrl}
                    label={item.label}
                    meta={item.meta}
                  />
                ),
              })}
          />
        ))}
      </Stack>
      <Modal id="modal-unstable-file-upload-example" isOpen={isModalOpen} onClose={handleClose}>
        <ModalDialog>
          <ModalBody>
            <div className="pt-400 pt-tablet-600">
              <img src={previewUrl} style={{ width: '100%', height: 'auto' }} alt="Preview" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={confirmPreview}>
              Confirm
            </Button>
            <Button color="tertiary" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalDialog>
      </Modal>
    </Stack>
  );
};
