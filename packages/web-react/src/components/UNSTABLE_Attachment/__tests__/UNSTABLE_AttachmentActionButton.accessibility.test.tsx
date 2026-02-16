import React from 'react';
import { accessibilityTest } from '@local/tests';
import UNSTABLE_AttachmentActionButton from '../UNSTABLE_AttachmentActionButton';

jest.mock('../../../hooks/useIcon');

describe('UNSTABLE_AttachmentActionButton accessibility', () => {
  accessibilityTest(
    (props) => <UNSTABLE_AttachmentActionButton {...props}>Edit</UNSTABLE_AttachmentActionButton>,
    'button',
  );
});
