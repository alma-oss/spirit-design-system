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
import { DEFAULT_FILE_IMAGE_DIMENSION } from '../constants';
import FileImagePreview from '../FileImagePreview';

const defaultProps = {
  imagePreview: 'https://example.com/preview.jpg',
  label: 'Preview',
};

describe('FileImagePreview', () => {
  classNamePrefixProviderTest((props) => <FileImagePreview {...defaultProps} {...props} />, 'File__preview');

  stylePropsTest((props) => <FileImagePreview {...defaultProps} {...props} />);

  restPropsTest((props) => <FileImagePreview {...defaultProps} {...props} />, 'span');

  validHtmlAttributesTest(FileImagePreview, defaultProps);

  ariaAttributesTest(FileImagePreview, defaultProps);

  it('should render image with correct src and alt', () => {
    render(<FileImagePreview imagePreview={defaultProps.imagePreview} label={defaultProps.label} />);

    const img = screen.getByRole('img', { name: defaultProps.label });

    expect(img).toHaveAttribute('src', defaultProps.imagePreview);
    expect(img).toHaveAttribute('alt', defaultProps.label);
  });

  it('should render image with default dimensions', () => {
    render(<FileImagePreview {...defaultProps} />);

    const img = screen.getByRole('img', { name: defaultProps.label });

    expect(img).toHaveAttribute('width', String(DEFAULT_FILE_IMAGE_DIMENSION));
    expect(img).toHaveAttribute('height', String(DEFAULT_FILE_IMAGE_DIMENSION));
  });
});
