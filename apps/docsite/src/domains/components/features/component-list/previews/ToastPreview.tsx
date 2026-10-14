'use client';

import { ToastBar, ToastBarMessage } from '@alma-oss/spirit-web-react';
import React from 'react';

const ToastPreview = () => (
  <ToastBar id="card-toast" color="success" hasIcon UNSAFE_style={{ width: 280 }}>
    <ToastBarMessage>Changes have been saved.</ToastBarMessage>
  </ToastBar>
);

export default ToastPreview;
