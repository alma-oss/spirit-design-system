import type { Meta, StoryObj } from '@storybook/react';
import React, { type ElementType, type JSX, type RefAttributes, useState } from 'react';
import { type ModalDialogProps } from '../../../types';
import { Button } from '../../Button';
import { Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader } from '..';

const meta: Meta<typeof ModalDialog> = {
  title: 'Components/Modal',
  component: ModalDialog,
  argTypes: {
    height: {
      control: 'object',
    },
    isDockedOnMobile: {
      control: 'boolean',
    },
    isExpandedOnMobile: {
      control: 'boolean',
    },
    isScrollable: {
      control: 'boolean',
    },
    maxHeight: {
      control: 'object',
    },
  },
  args: {
    isDockedOnMobile: false,
    isExpandedOnMobile: false,
    isScrollable: true,
    height: {
      mobile: '400px',
      tablet: '500px',
      desktop: '600px',
    },
    maxHeight: {},
  },
};

export default meta;
type Story = StoryObj<typeof ModalDialog>;

const ModalWithHooks = (
  args: JSX.IntrinsicAttributes & Omit<ModalDialogProps<ElementType>, 'ref'> & RefAttributes<HTMLDivElement>,
) => {
  const [isOpen, setOpen] = useState(true);

  const toggleModal = () => setOpen(!isOpen);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={toggleModal} aria-expanded={isOpen}>
        Open Modal
      </Button>
      <Modal id="modal" isOpen={isOpen} onClose={handleClose}>
        <ModalDialog {...args}>
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

export const ModalDialogPlayground: Story = {
  name: 'ModalDialog',
  render: (args) => <ModalWithHooks {...args} />,
};
