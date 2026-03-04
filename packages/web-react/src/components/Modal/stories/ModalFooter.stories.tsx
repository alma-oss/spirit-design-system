import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { AlignmentX } from '../../../constants';
import { type ModalFooterProps } from '../../../types';
import { Button } from '../../Button';
import { Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader } from '..';

const meta: Meta<typeof ModalFooter> = {
  title: 'Components/Modal',
  component: ModalFooter,
  argTypes: {
    alignmentX: {
      control: 'select',
      options: [...Object.values(AlignmentX)],
      table: {
        defaultValue: { summary: AlignmentX.RIGHT },
      },
    },
    children: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
  args: {
    alignmentX: AlignmentX.RIGHT,
    children: 'Footer',
    description: 'Footer Description',
  },
};

export default meta;
type Story = StoryObj<typeof ModalFooter>;

const ModalWithHooks = (args: ModalFooterProps) => {
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
        <ModalDialog>
          <ModalHeader>Modal Header</ModalHeader>
          <ModalBody>Body</ModalBody>
          <ModalFooter {...args}>{children}</ModalFooter>
        </ModalDialog>
      </Modal>
    </>
  );
};

export const ModalFooterPlayground: Story = {
  name: 'ModalFooter',
  render: (args) => <ModalWithHooks {...args} />,
};
