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
import UNSTABLE_FileImagePreview from '../UNSTABLE_FileImagePreview';

const defaultProps = {
  imagePreview: 'https://example.com/preview.jpg',
  label: 'Preview',
};

describe('UNSTABLE_FileImagePreview', () => {
  classNamePrefixProviderTest(
    (props) => <UNSTABLE_FileImagePreview {...defaultProps} {...props} />,
    'UNSTABLE_File__preview',
  );

  stylePropsTest((props) => <UNSTABLE_FileImagePreview {...defaultProps} {...props} />);

  restPropsTest((props) => <UNSTABLE_FileImagePreview {...defaultProps} {...props} />, 'span');

  validHtmlAttributesTest(UNSTABLE_FileImagePreview, defaultProps);

  ariaAttributesTest(UNSTABLE_FileImagePreview, defaultProps);

  it('should render image with correct src and alt', () => {
    render(<UNSTABLE_FileImagePreview imagePreview={defaultProps.imagePreview} label={defaultProps.label} />);

    const img = screen.getByRole('img', { name: defaultProps.label });

    expect(img).toHaveAttribute('src', defaultProps.imagePreview);
    expect(img).toHaveAttribute('alt', defaultProps.label);
  });

  it('should render image with default dimensions', () => {
    render(<UNSTABLE_FileImagePreview {...defaultProps} />);

    const img = screen.getByRole('img', { name: defaultProps.label });

    expect(img).toHaveAttribute('width', String(DEFAULT_FILE_IMAGE_DIMENSION));
    expect(img).toHaveAttribute('height', String(DEFAULT_FILE_IMAGE_DIMENSION));
  });
});
