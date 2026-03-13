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
import { DEFAULT_ATTACHMENT_IMAGE_DIMENSION } from '../constants';
import UNSTABLE_AttachmentImagePreview from '../UNSTABLE_AttachmentImagePreview';

const defaultProps = {
  imagePreview: 'https://example.com/preview.jpg',
  label: 'Preview',
};

const UNSTABLE_AttachmentImagePreviewWithDefaults = (
  props: React.ComponentProps<typeof UNSTABLE_AttachmentImagePreview>,
) => <UNSTABLE_AttachmentImagePreview {...defaultProps} {...props} />;

describe('UNSTABLE_AttachmentImagePreview', () => {
  classNamePrefixProviderTest(UNSTABLE_AttachmentImagePreviewWithDefaults, 'Attachment__image');

  stylePropsTest(UNSTABLE_AttachmentImagePreviewWithDefaults);

  restPropsTest(UNSTABLE_AttachmentImagePreviewWithDefaults, 'span');

  validHtmlAttributesTest(UNSTABLE_AttachmentImagePreview, defaultProps);

  ariaAttributesTest(UNSTABLE_AttachmentImagePreview, defaultProps);

  it('should render image with correct src and alt', () => {
    const imagePreview = 'https://example.com/photo.jpg';
    const label = 'Photo description';

    render(<UNSTABLE_AttachmentImagePreview imagePreview={imagePreview} label={label} />);

    const img = screen.getByRole('img', { name: label });

    expect(img).toHaveAttribute('src', imagePreview);
    expect(img).toHaveAttribute('alt', label);
  });

  it('should render image with default dimensions', () => {
    render(<UNSTABLE_AttachmentImagePreview {...defaultProps} />);

    const img = screen.getByRole('img', { name: defaultProps.label });

    expect(img).toHaveAttribute('width', String(DEFAULT_ATTACHMENT_IMAGE_DIMENSION));
    expect(img).toHaveAttribute('height', String(DEFAULT_ATTACHMENT_IMAGE_DIMENSION));
  });

  it('should render root span with default attachment image class', () => {
    render(<UNSTABLE_AttachmentImagePreview {...defaultProps} data-testid="preview-root" />);

    const root = screen.getByTestId('preview-root');

    expect(root).toHaveClass('Attachment__image');
    expect(root.localName).toBe('span');
  });
});
