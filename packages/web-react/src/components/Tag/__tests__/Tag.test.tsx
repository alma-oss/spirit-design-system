import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  colorSchemePropsTest,
  elementTypePropsTest,
  emotionColorPropsTest,
  restPropsTest,
  sizeExtendedPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { EmotionColors } from '../../../constants';
import { TagColorsExtended } from '../constants';
import Tag from '../Tag';

describe('Tag', () => {
  classNamePrefixProviderTest(Tag, 'Tag');

  emotionColorPropsTest(Tag, 'Tag--');

  colorSchemePropsTest(Tag, [...Object.values(TagColorsExtended), ...Object.values(EmotionColors)]);

  sizeExtendedPropsTest(Tag);

  stylePropsTest(Tag);

  restPropsTest(Tag, 'span');

  validHtmlAttributesTest(Tag);

  ariaAttributesTest(Tag);

  elementTypePropsTest(Tag);

  it('should have neutral classname', () => {
    render(<Tag>Tag</Tag>);

    expect(screen.getByText('Tag')).toHaveClass('Tag--neutral');
  });

  it('should render text children', () => {
    render(<Tag>Tag</Tag>);

    expect(screen.getByText('Tag')).toBeInTheDocument();
  });

  it('should render neutral color', () => {
    render(<Tag color="neutral">neutral tag</Tag>);

    expect(screen.getByText('neutral tag')).toHaveClass('Tag--neutral');
  });

  it('should render as button with default type="button"', () => {
    render(<Tag elementType="button">Button tag</Tag>);

    expect(screen.getByRole('button', { name: 'Button tag' })).toHaveAttribute('type', 'button');
  });

  it('should honor user-supplied type on button', () => {
    render(
      <Tag elementType="button" type="submit">
        Submit tag
      </Tag>,
    );

    expect(screen.getByRole('button', { name: 'Submit tag' })).toHaveAttribute('type', 'submit');
  });

  it('should render as anchor', () => {
    render(
      <Tag elementType="a" href="/">
        Link tag
      </Tag>,
    );

    expect(screen.getByRole('link', { name: 'Link tag' })).toHaveAttribute('href', '/');
  });
});
