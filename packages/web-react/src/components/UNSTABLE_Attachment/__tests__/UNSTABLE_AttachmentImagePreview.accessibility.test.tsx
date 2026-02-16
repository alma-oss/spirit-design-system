import React from 'react';
import { accessibilityTest } from '@local/tests';
import UNSTABLE_AttachmentImagePreview from '../UNSTABLE_AttachmentImagePreview';

const defaultProps = {
  imagePreview: 'https://example.com/preview.jpg',
  label: 'Preview',
};

describe('UNSTABLE_AttachmentImagePreview accessibility', () => {
  accessibilityTest((props) => <UNSTABLE_AttachmentImagePreview {...defaultProps} {...props} />, 'span');
});
