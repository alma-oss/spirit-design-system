import React, { useMemo, useState } from 'react';
import { Button, Modal, ModalBody, ModalDialog, ModalFooter } from '../../../src/components';
import {
  UNSTABLE_AttachmentImagePreview,
  UNSTABLE_FileUpload,
  UNSTABLE_FileUploadAttachment,
  UNSTABLE_FileUploadAttachments,
  UNSTABLE_FileUploadInput,
} from '../../../src/components/UNSTABLE_FileUpload';
import { useFileQueue } from '../../../src/components/UNSTABLE_FileUpload/demo/useFileQueue';
import type { UnstableFileUploadAttachmentsItem } from '../../../src/components/UNSTABLE_FileUpload/types';
import { ObjectFit, ValidationStates } from '../../../src/constants';

const fileToKey = (name: string): string => `file__${name.replace(/\./g, '_').replace(/\s/g, '_')}`;

type UNSTABLE_FileUploadCompositionType = {
  // UNSTABLE_FileUpload
  fileUploadId: string;
  isFluid: boolean;
  // UNSTABLE_FileUploadInput
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
  // UNSTABLE_FileUploadAttachments
  attachmentsListId: string;
  attachmentsLabel: string;
  // UNSTABLE_FileUploadAttachment (applies to all items)
  editText: string;
  attachmentIconName: string;
  removeText: string;
  showEditButton: boolean;
  // UNSTABLE_AttachmentImagePreview
  imageObjectFit: (typeof ObjectFit)[keyof typeof ObjectFit];
  showImagePreview: boolean;
};

export default {
  title: 'Examples/Compositions',
  argTypes: {
    // UNSTABLE_FileUpload
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
    // UNSTABLE_FileUploadInput
    accept: {
      control: 'text',
      description: 'Comma-separated list of file types or type specifiers.',
      table: {
        category: 'UNSTABLE_FileUploadInput',
        defaultValue: { summary: '.png,image/jpeg' },
      },
    },
    hasValidationIcon: {
      control: 'boolean',
      description: 'Whether to show validation icon.',
      table: {
        category: 'UNSTABLE_FileUploadInput',
        defaultValue: { summary: false },
      },
    },
    helperText: {
      control: 'text',
      description: 'Custom helper text.',
      table: {
        category: 'UNSTABLE_FileUploadInput',
        defaultValue: { summary: 'Max file size is 10 MB' },
      },
    },
    iconName: {
      control: 'text',
      description: 'Icon used in the drop zone.',
      table: {
        category: 'UNSTABLE_FileUploadInput',
        defaultValue: { summary: 'upload' },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the field is disabled.',
      table: {
        category: 'UNSTABLE_FileUploadInput',
        defaultValue: { summary: false },
      },
    },
    isLabelHidden: {
      control: 'boolean',
      description: 'Whether the input label is hidden.',
      table: {
        category: 'UNSTABLE_FileUploadInput',
        defaultValue: { summary: false },
      },
    },
    isMultiple: {
      control: 'boolean',
      description: 'When multiple files can be selected at once.',
      table: {
        category: 'UNSTABLE_FileUploadInput',
        defaultValue: { summary: false },
      },
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the field is marked as required.',
      table: {
        category: 'UNSTABLE_FileUploadInput',
        defaultValue: { summary: false },
      },
    },
    label: {
      control: 'text',
      description: 'Field label.',
      table: {
        category: 'UNSTABLE_FileUploadInput',
        defaultValue: { summary: 'Label' },
      },
    },
    labelText: {
      control: 'text',
      description: 'Label for input in drop zone.',
      table: {
        category: 'UNSTABLE_FileUploadInput',
        defaultValue: { summary: 'or drag and drop here' },
      },
    },
    linkText: {
      control: 'text',
      description: 'Link text in drop zone.',
      table: {
        category: 'UNSTABLE_FileUploadInput',
        defaultValue: { summary: 'Upload your file(s)' },
      },
    },
    name: {
      control: 'text',
      description: 'Field name for attachments.',
      table: {
        category: 'UNSTABLE_FileUploadInput',
        defaultValue: { summary: 'attachments' },
      },
    },
    validationState: {
      control: 'select',
      description: 'Validation state (visual only).',
      options: [...Object.values(ValidationStates), undefined],
      table: {
        category: 'UNSTABLE_FileUploadInput',
        defaultValue: { summary: undefined },
      },
    },
    validationText: {
      control: 'text',
      description: 'Validation status text (visual only).',
      table: {
        category: 'UNSTABLE_FileUploadInput',
        defaultValue: { summary: 'Validation message' },
      },
    },
    // UNSTABLE_FileUploadAttachments
    attachmentsListId: {
      control: 'text',
      description: 'Id for the attachments list (used in hidden heading).',
      name: 'id',
      table: {
        category: 'UNSTABLE_FileUploadAttachments',
        defaultValue: { summary: 'file-uploader-unstable-example-list' },
      },
    },
    attachmentsLabel: {
      control: 'text',
      description: 'Label for the list (accessibility).',
      name: 'label',
      table: {
        category: 'UNSTABLE_FileUploadAttachments',
        defaultValue: { summary: 'Attachments' },
      },
    },
    // UNSTABLE_FileUploadAttachment
    editText: {
      control: 'text',
      description: 'Edit button label.',
      table: {
        category: 'UNSTABLE_FileUploadAttachment',
        defaultValue: { summary: 'Edit' },
      },
    },
    attachmentIconName: {
      control: 'text',
      description: 'Icon shown when no thumbnail is provided.',
      name: 'iconName',
      table: {
        category: 'UNSTABLE_FileUploadAttachment',
        defaultValue: { summary: 'file' },
      },
    },
    removeText: {
      control: 'text',
      description: 'Remove button label.',
      table: {
        category: 'UNSTABLE_FileUploadAttachment',
        defaultValue: { summary: 'Remove' },
      },
    },
    showEditButton: {
      control: 'boolean',
      description: 'Show the edit button on each attachment.',
      table: {
        category: 'UNSTABLE_FileUploadAttachment',
        subcategory: 'Demo settings',
        defaultValue: { summary: false },
      },
    },
    // UNSTABLE_AttachmentImagePreview
    imageObjectFit: {
      control: 'select',
      description: 'How the image fits in the thumbnail frame.',
      options: [ObjectFit.CONTAIN, ObjectFit.COVER],
      table: {
        category: 'UNSTABLE_AttachmentImagePreview',
        defaultValue: { summary: ObjectFit.COVER },
      },
    },
    showImagePreview: {
      control: 'boolean',
      description: 'Show image preview (thumbnail) for image attachments.',
      name: 'show image preview',
      table: {
        category: 'UNSTABLE_AttachmentImagePreview',
        subcategory: 'Demo settings',
        defaultValue: { summary: true },
      },
    },
  },
  args: {
    fileUploadId: 'file-uploader-unstable-example',
    isFluid: false,
    accept: '.png,image/jpeg',
    hasValidationIcon: false,
    helperText: 'Max file size is 10 MB',
    iconName: 'upload',
    isDisabled: false,
    isLabelHidden: false,
    isMultiple: false,
    isRequired: false,
    label: 'Label',
    labelText: 'or drag and drop here',
    linkText: 'Upload your file(s)',
    name: 'attachments',
    validationState: undefined,
    validationText: 'Validation message',
    attachmentsListId: 'file-uploader-unstable-example-list',
    attachmentsLabel: 'Attachments',
    editText: 'Edit',
    attachmentIconName: 'file',
    removeText: 'Remove',
    showEditButton: false,
    imageObjectFit: ObjectFit.COVER,
    showImagePreview: true,
  },
};

export const UNSTABLE_FileUploadWithModalImagePreview = (args: UNSTABLE_FileUploadCompositionType) => {
  const {
    fileUploadId,
    isFluid,
    accept,
    hasValidationIcon,
    helperText,
    iconName,
    isDisabled,
    isLabelHidden,
    isMultiple,
    isRequired,
    label,
    labelText,
    linkText,
    name,
    validationState,
    validationText,
    attachmentsListId,
    attachmentsLabel,
    editText,
    attachmentIconName,
    removeText,
    showEditButton,
    imageObjectFit,
    showImagePreview,
  } = args;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [base64File, setBase64File] = useState<string>('');
  const [fileToPreview, setFileToPreview] = useState<File | null>(null);
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
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64File(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFileToPreview(file);
      setIsModalOpen(true);

      return;
    }
    files.forEach((file) => addToQueue(fileToKey(file.name), file));
  };

  const resetModalState = () => {
    setIsModalOpen(false);
    setFileToPreview(null);
    setBase64File('');
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
    <>
      <UNSTABLE_FileUpload id={fileUploadId} isFluid={isFluid}>
        <UNSTABLE_FileUploadInput
          id={`${fileUploadId}-input`}
          name={name}
          label={label}
          linkText={linkText}
          labelText={labelText}
          helperText={helperText}
          validationText={validationText}
          validationState={validationState}
          hasValidationIcon={hasValidationIcon}
          accept={accept}
          iconName={iconName}
          isDisabled={isDisabled}
          isLabelHidden={isLabelHidden}
          isMultiple={isMultiple}
          isRequired={isRequired}
          onFilesSelected={onFilesSelected}
        />
        <UNSTABLE_FileUploadAttachments id={attachmentsListId} label={attachmentsLabel}>
          {items.map((item) => (
            <UNSTABLE_FileUploadAttachment
              key={item.id}
              id={item.id}
              label={item.label}
              iconName={attachmentIconName}
              editText={editText}
              removeText={removeText}
              onDismiss={() => onDismiss(item.id)}
              {...(showEditButton && { onChange: () => {} })}
              {...(showImagePreview &&
                item.previewUrl && {
                  thumbnail: (
                    <UNSTABLE_AttachmentImagePreview
                      imagePreview={item.previewUrl}
                      label={item.label}
                      meta={item.meta}
                      imageObjectFit={imageObjectFit}
                    />
                  ),
                })}
            />
          ))}
        </UNSTABLE_FileUploadAttachments>
      </UNSTABLE_FileUpload>
      <Modal id="modal-unstable-file-upload-example" isOpen={isModalOpen} onClose={handleClose}>
        <ModalDialog>
          <ModalBody>
            <div className="pt-400 pt-tablet-600">
              <img src={base64File} style={{ width: '100%', height: 'auto' }} alt="Preview" />
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
    </>
  );
};
