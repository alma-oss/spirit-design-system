import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { fn } from 'storybook/test';
import { AlignmentY } from '../../../constants';
import { type SpiritModalProps } from '../../../types';
import { Button } from '../../Button';
import ReadMe from '../README.md?raw';
import { Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader } from '..';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    alignmentY: {
      control: 'select',
      options: [...Object.values(AlignmentY)],
      table: {
        defaultValue: { summary: AlignmentY.CENTER },
      },
    },
    id: {
      control: 'text',
    },
    isOpen: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether the modal should close when the backdrop is clicked',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEscapeKeyDown: {
      control: 'boolean',
      description: 'Whether the modal should close when the escape key is pressed',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    alignmentY: AlignmentY.CENTER,
    id: 'modal',
    isOpen: false,
    onClose: fn(),
    closeOnEscapeKeyDown: true,
    closeOnBackdropClick: true,
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWithHooks = (args: SpiritModalProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  const handleClose = () => {
    setModalOpen(false);
  };

  const { isOpen } = args;

  return (
    <>
      <Button onClick={toggleModal} aria-expanded={isOpen || isModalOpen}>
        Open Modal
      </Button>
      <Modal {...args} isOpen={isOpen || isModalOpen} onClose={handleClose}>
        <ModalDialog height={{ mobile: '500px' }}>
          <ModalHeader>Modal Header</ModalHeader>
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

export const Playground: Story = {
  name: 'Modal',
  render: (args) => <ModalWithHooks {...args} />,
};
