import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useFileUploaderDemo } from '../demo/useFileUploaderDemo';
import { type SpiritUnstableFileUploadAttachmentsProps } from '../types';
import {
  UNSTABLE_AttachmentImagePreview,
  UNSTABLE_FileUpload,
  UNSTABLE_FileUploadAttachment,
  UNSTABLE_FileUploadAttachments,
  UNSTABLE_FileUploadInput,
} from '..';

const meta: Meta<typeof UNSTABLE_FileUploadAttachments> = {
  title: 'Experimental/UNSTABLE_FileUpload',
  component: UNSTABLE_FileUploadAttachments,
  argTypes: {
    id: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
  },
  args: {
    id: 'file-uploader-example-list',
    label: 'Attachments',
  },
};

export default meta;
type Story = StoryObj<typeof UNSTABLE_FileUploadAttachments>;

const FileUploaderWithHooks = (args: SpiritUnstableFileUploadAttachmentsProps) => {
  const { items, onDismiss, onFilesSelected } = useFileUploaderDemo(true);

  return (
    <UNSTABLE_FileUpload id="file-uploader-example">
      <UNSTABLE_FileUploadInput
        id="file-uploader-example-input"
        name="attachments"
        label="Label"
        linkText="Upload your file(s)"
        labelText="or drag and drop here"
        helperText="Max file size is 10 MB"
        validationText="Validation message"
        onFilesSelected={onFilesSelected}
        isMultiple
      />
      <UNSTABLE_FileUploadAttachments {...args}>
        {items.map((item) => (
          <UNSTABLE_FileUploadAttachment
            key={item.id}
            id={item.id}
            label={item.label}
            onDismiss={() => onDismiss(item.id)}
            {...(item.previewUrl && {
              thumbnail: (
                <UNSTABLE_AttachmentImagePreview imagePreview={item.previewUrl} label={item.label} meta={item.meta} />
              ),
            })}
          />
        ))}
      </UNSTABLE_FileUploadAttachments>
    </UNSTABLE_FileUpload>
  );
};

export const FileUploadAttachmentsPlayground: Story = {
  name: 'UNSTABLE_FileUploadAttachments',
  render: (args) => <FileUploaderWithHooks {...args} />,
};
