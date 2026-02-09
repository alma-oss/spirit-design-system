import React from 'react';
import ToastBar from '../ToastBar';
import ToastBarLink from '../ToastBarLink';
import ToastBarMessage from '../ToastBarMessage';

const ToastColors = () => (
  <>
    <ToastBar id="toast-neutral" onClose={() => {}} color="neutral" hasIcon isDismissible>
      <ToastBarMessage>Neutral</ToastBarMessage>
      <ToastBarLink href="#">Action</ToastBarLink>
    </ToastBar>
    <ToastBar id="toast-informative" onClose={() => {}} color="informative" hasIcon isDismissible>
      <ToastBarMessage>Informative</ToastBarMessage>
      <ToastBarLink href="#">Action</ToastBarLink>
    </ToastBar>
    <ToastBar id="toast-success" onClose={() => {}} color="success" hasIcon isDismissible>
      <ToastBarMessage>Success</ToastBarMessage>
      <ToastBarLink href="#">Action</ToastBarLink>
    </ToastBar>
    <ToastBar id="toast-warning" onClose={() => {}} color="warning" hasIcon isDismissible>
      <ToastBarMessage>Warning</ToastBarMessage>
      <ToastBarLink href="#">Action</ToastBarLink>
    </ToastBar>
    <ToastBar id="toast-danger" onClose={() => {}} color="danger" hasIcon isDismissible>
      <ToastBarMessage>Danger</ToastBarMessage>
      <ToastBarLink href="#">Action</ToastBarLink>
    </ToastBar>
  </>
);

export default ToastColors;
