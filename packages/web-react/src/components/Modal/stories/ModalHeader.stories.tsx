import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { type ModalHeaderProps } from '../../../types';
import { Button } from '../../Button';
import { Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader } from '..';

const meta: Meta<typeof ModalHeader> = {
  title: 'Components/Modal',
  component: ModalHeader,
  argTypes: {
    children: {
      control: 'text',
    },
    closeLabel: {
      control: 'text',
      description: 'The label for the close button',
      table: {
        defaultValue: { summary: 'Close' },
      },
    },
    hasCloseButton: {
      control: 'boolean',
      description: 'Whether to hide the close button',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    children: 'Modal Header',
    closeLabel: 'Close',
    hasCloseButton: true,
  },
};

export default meta;
type Story = StoryObj<typeof ModalHeader>;

const ModalWithHooks = (args: ModalHeaderProps) => {
  const [isOpen, setOpen] = useState(true);

  const toggleModal = () => setOpen(!isOpen);

  const handleClose = () => {
    setOpen(false);
  };

  const { children } = args;

  return (
    <>
      <Button onClick={toggleModal} aria-expanded={isOpen}>
        Open Modal
      </Button>
      <Modal id="modal" isOpen={isOpen} onClose={handleClose}>
        <ModalDialog height={{ mobile: '500px' }}>
          <ModalHeader {...args}>{children}</ModalHeader>
          <ModalBody>Body</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleClose}>
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

export const ModalHeaderPlayground: Story = {
  name: 'ModalHeader',
  render: (args) => <ModalWithHooks {...args} />,
};
