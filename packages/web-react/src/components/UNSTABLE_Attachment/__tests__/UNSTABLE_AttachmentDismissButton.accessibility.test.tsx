import React from 'react';
import { accessibilityTest } from '@local/tests';
import UNSTABLE_AttachmentDismissButton from '../UNSTABLE_AttachmentDismissButton';

jest.mock('../../../hooks/useIcon');

describe('UNSTABLE_AttachmentDismissButton accessibility', () => {
  accessibilityTest(
    (props) => <UNSTABLE_AttachmentDismissButton {...props}>Remove</UNSTABLE_AttachmentDismissButton>,
    'button',
  );
});
