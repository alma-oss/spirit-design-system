import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import UNSTABLE_Attachment from '../UNSTABLE_Attachment';

jest.mock('../../../hooks/useIcon');

const defaultProps = {
  id: 'attachment-1',
  label: 'document.pdf',
  onDismiss: () => {},
};

const UNSTABLE_AttachmentWithDefaults = (props: React.ComponentProps<typeof UNSTABLE_Attachment>) => (
  <UNSTABLE_Attachment {...defaultProps} {...props} />
);

describe('UNSTABLE_Attachment', () => {
  classNamePrefixProviderTest(UNSTABLE_AttachmentWithDefaults, 'Attachment');

  stylePropsTest(UNSTABLE_AttachmentWithDefaults);

  restPropsTest(
    (props) => (
      <ul>
        <UNSTABLE_Attachment {...defaultProps} {...props} />
      </ul>
    ),
    'li',
  );

  validHtmlAttributesTest(UNSTABLE_Attachment, defaultProps);

  ariaAttributesTest(UNSTABLE_Attachment, defaultProps);

  it('should render attachment with label', () => {
    render(
      <ul>
        <UNSTABLE_Attachment {...defaultProps} />
      </ul>,
    );

    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
  });

  it('should render dismiss button with accessible name', () => {
    render(
      <ul>
        <UNSTABLE_Attachment {...defaultProps} removeText="Remove file" />
      </ul>,
    );

    expect(screen.getByRole('button', { name: 'Remove file' })).toBeInTheDocument();
  });
});
