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
import UNSTABLE_AttachmentDismissButton from '../UNSTABLE_AttachmentDismissButton';

jest.mock('../../../hooks/useIcon');

const defaultProps = {
  children: 'Remove',
};

const UNSTABLE_AttachmentDismissButtonWithDefaults = (
  props: React.ComponentProps<typeof UNSTABLE_AttachmentDismissButton>,
) => <UNSTABLE_AttachmentDismissButton {...defaultProps} {...props} />;

describe('UNSTABLE_AttachmentDismissButton', () => {
  classNamePrefixProviderTest(UNSTABLE_AttachmentDismissButtonWithDefaults, 'Attachment__action');

  stylePropsTest(UNSTABLE_AttachmentDismissButtonWithDefaults);

  restPropsTest(UNSTABLE_AttachmentDismissButtonWithDefaults, 'button');

  validHtmlAttributesTest(UNSTABLE_AttachmentDismissButton, defaultProps);

  ariaAttributesTest(UNSTABLE_AttachmentDismissButton, defaultProps);

  it('should render button', () => {
    render(<UNSTABLE_AttachmentDismissButton {...defaultProps} />);
  });
});
