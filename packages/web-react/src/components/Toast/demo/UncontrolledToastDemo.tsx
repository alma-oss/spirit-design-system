import React from 'react';
import { Button } from '../../Button';
import { ToastProvider } from '../ToastContext';
import UncontrolledToast from '../UncontrolledToast';
import { useToast } from '../useToast';

const ToastTextWithLink = {
  message: 'Hello, World! This is a toast message with an action.',
  link: 'Action',
};

const ShowToastButton = () => {
  const { show, clear } = useToast();
  const uniqueId = Date.now().toString();

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          show(ToastTextWithLink, uniqueId, {
            color: 'warning',
            isDismissible: true,
            hasIcon: true,
            linkProps: { href: '#' },
          });
        }}
      >
        Show Toast
      </Button>
      <Button
        type="button"
        onClick={() => {
          show(ToastTextWithLink, uniqueId, {
            color: 'neutral',
            isDismissible: true,
            hasIcon: true,
            linkProps: { href: '#' },
          });
        }}
      >
        Show Toast
      </Button>
      <Button
        type="button"
        onClick={() => {
          show(ToastTextWithLink, uniqueId, {
            color: 'danger',
            iconName: 'download',
            isDismissible: true,
            hasIcon: true,
            enableAutoClose: false,
            autoCloseInterval: 1500,
            linkProps: { href: '#' },
          });
        }}
      >
        Show Toast
      </Button>
      <Button
        type="button"
        color="danger"
        onClick={() => {
          clear();
        }}
      >
        Clear
      </Button>
    </>
  );
};

const UncontrolledToastDemo = () => (
  <ToastProvider>
    <ShowToastButton />
    <UncontrolledToast alignmentX="right" alignmentY="top" closeLabel="Close" />
  </ToastProvider>
);

export default UncontrolledToastDemo;
