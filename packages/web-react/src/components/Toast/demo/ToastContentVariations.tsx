import React from 'react';
import ToastBar from '../ToastBar';
import ToastBarLink from '../ToastBarLink';
import ToastBarMessage from '../ToastBarMessage';

const ToastContentVariations = () => (
  <>
    <ToastBar id="message-only">
      <ToastBarMessage>Message only</ToastBarMessage>
    </ToastBar>
    <ToastBar id="with-action">
      <ToastBarMessage>Message with action</ToastBarMessage>
      <ToastBarLink href="#">Action</ToastBarLink>
    </ToastBar>
    <ToastBar id="long-text">
      <ToastBarMessage>
        When the text is long and reaches the maximum width limit, the action automatically wraps to the next line.
      </ToastBarMessage>
      <ToastBarLink href="#">Action</ToastBarLink>
    </ToastBar>
    <ToastBar id="with-icon" hasIcon>
      <ToastBarMessage>Message with icon and action</ToastBarMessage>
      <ToastBarLink href="#">Action</ToastBarLink>
    </ToastBar>
    <ToastBar id="toast-variation-dismissible" onClose={() => {}} isDismissible>
      <ToastBarMessage>Dismissible message</ToastBarMessage>
    </ToastBar>
    <ToastBar id="toast-variation-dismissible-icon-action" onClose={() => {}} isDismissible iconName="download">
      <ToastBarMessage>Dismissible message with custom icon and action</ToastBarMessage>
      <ToastBarLink href="#">Action</ToastBarLink>
    </ToastBar>
  </>
);

export default ToastContentVariations;
