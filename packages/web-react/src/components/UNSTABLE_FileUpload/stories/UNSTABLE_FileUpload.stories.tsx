import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useFileUploaderDemo } from '../demo/useFileUploaderDemo';
import ReadMe from '../README.md';
import { type SpiritUnstableFileUploadProps } from '../types';
import {
  UNSTABLE_FileUpload,
  UNSTABLE_FileUploadAttachment,
  UNSTABLE_FileUploadAttachments,
  UNSTABLE_FileUploadInput,
} from '..';

const meta: Meta<typeof UNSTABLE_FileUpload> = {
  title: 'Experimental/UNSTABLE_FileUpload',
  component: UNSTABLE_FileUpload,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    controls: { exclude: ['hasValidationStateIcon'] },
  },
  argTypes: {
    children: {
      control: 'text',
    },
    id: {
      control: 'text',
    },
    isFluid: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    id: 'file-uploader',
    isFluid: false,
  },
};

export default meta;
type Story = StoryObj<typeof UNSTABLE_FileUpload>;

const FileUploaderWithHooks = (args: SpiritUnstableFileUploadProps) => {
  const { items, onDismiss, onFilesSelected } = useFileUploaderDemo(false);

  return (
    <UNSTABLE_FileUpload {...args}>
      <UNSTABLE_FileUploadInput
        id="file-uploader-example-input"
        name="attachments"
        label="Label"
        linkText="Upload your file(s)"
        labelText="or drag and drop here"
        helperText="Max file size is 10 MB"
        validationText="Validation message"
        onFilesSelected={onFilesSelected}
      />
      <UNSTABLE_FileUploadAttachments id="file-uploader-example-list" label="Attachments">
        {items.map((item) => (
          <UNSTABLE_FileUploadAttachment
            key={item.id}
            id={item.id}
            label={item.label}
            onDismiss={() => onDismiss(item.id)}
          />
        ))}
      </UNSTABLE_FileUploadAttachments>
    </UNSTABLE_FileUpload>
  );
};

export const Playground: Story = {
  name: 'UNSTABLE_FileUpload',
  render: (args) => <FileUploaderWithHooks {...args} />,
};
