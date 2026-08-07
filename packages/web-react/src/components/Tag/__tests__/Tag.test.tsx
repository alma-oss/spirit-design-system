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
import { PropsProvider } from '../../../context';
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

  it('should render as disabled button when isDisabled is true', () => {
    render(
      <Tag elementType="button" isDisabled>
        Disabled button tag
      </Tag>,
    );

    expect(screen.getByRole('button', { name: 'Disabled button tag' })).toBeDisabled();
  });

  it('should render as anchor', () => {
    render(
      <Tag elementType="a" href="/">
        Link tag
      </Tag>,
    );

    expect(screen.getByRole('link', { name: 'Link tag' })).toHaveAttribute('href', '/');
  });

  it('should apply tag props from context when direct props are not provided', () => {
    render(
      <PropsProvider
        value={{ color: 'selected', elementType: 'button', isDisabled: true, isSubtle: true, size: 'large' }}
      >
        <Tag>Context tag</Tag>
      </PropsProvider>,
    );

    expect(screen.getByText('Context tag')).toHaveClass('Tag--selected', 'Tag--large', 'Tag--subtle', 'disabled');
    expect(screen.getByRole('button', { name: 'Context tag' })).toBeDisabled();
  });

  it('should prefer direct tag props over context props', () => {
    render(
      <PropsProvider
        value={{ color: 'selected', elementType: 'button', isDisabled: true, isSubtle: true, size: 'large' }}
      >
        <Tag color="neutral" elementType="span" isDisabled={false} isSubtle={false} size="small">
          Direct props tag
        </Tag>
      </PropsProvider>,
    );

    expect(screen.getByText('Direct props tag')).toHaveClass('Tag--neutral', 'Tag--small');
    expect(screen.getByText('Direct props tag')).not.toHaveClass(
      'Tag--selected',
      'Tag--large',
      'Tag--subtle',
      'disabled',
    );
    expect(screen.queryByRole('button', { name: 'Direct props tag' })).not.toBeInTheDocument();
  });
});
