import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import UNSTABLE_AttachmentActionButton from '../UNSTABLE_AttachmentActionButton';

jest.mock('../../../hooks/useIcon');

const defaultProps = {
  children: 'Edit',
};

const UNSTABLE_AttachmentActionButtonWithDefaults = (
  props: React.ComponentProps<typeof UNSTABLE_AttachmentActionButton>,
) => <UNSTABLE_AttachmentActionButton {...defaultProps} {...props} />;

describe('UNSTABLE_AttachmentActionButton', () => {
  classNamePrefixProviderTest(UNSTABLE_AttachmentActionButtonWithDefaults, 'Attachment__action');

  stylePropsTest(UNSTABLE_AttachmentActionButtonWithDefaults);

  restPropsTest(UNSTABLE_AttachmentActionButtonWithDefaults, 'button');

  validHtmlAttributesTest(UNSTABLE_AttachmentActionButton, defaultProps);

  ariaAttributesTest(UNSTABLE_AttachmentActionButton, defaultProps);

  it('should render button', () => {
    render(<UNSTABLE_AttachmentActionButton {...defaultProps} />);
  });
});
