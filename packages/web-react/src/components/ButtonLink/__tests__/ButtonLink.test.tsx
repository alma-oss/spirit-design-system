import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  componentButtonColorPropsTest,
  elementTypePropsTest,
  emotionColorPropsTest,
  loadingPropsTest,
  restPropsTest,
  sizePropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import ButtonLink from '../ButtonLink';

jest.mock('../../../hooks/useIcon');

describe('ButtonLink', () => {
  classNamePrefixProviderTest(ButtonLink, 'Button');

  componentButtonColorPropsTest(ButtonLink, 'Button--');

  emotionColorPropsTest(ButtonLink, 'Button--');

  sizePropsTest(ButtonLink);

  loadingPropsTest(ButtonLink, 'a');

  stylePropsTest(ButtonLink);

  restPropsTest(ButtonLink, 'a');

  validHtmlAttributesTest(ButtonLink);

  ariaAttributesTest(ButtonLink);

  elementTypePropsTest(ButtonLink);

  it('should have default classname', () => {
    render(<ButtonLink />);

    const element = screen.getByRole('button');

    expect(element).toHaveClass('Button--primary');
  });

  it('should have disabled classname', () => {
    render(<ButtonLink isDisabled />);

    const element = screen.getByRole('button');

    expect(element).toHaveClass('Button');
    expect(element).toHaveClass('Button--disabled');
  });

  it('should have block classname', () => {
    render(<ButtonLink isBlock />);

    const element = screen.getByRole('button');

    expect(element).toHaveClass('Button');
    expect(element).toHaveClass('Button--block');
  });

  it('should have size classname', () => {
    render(<ButtonLink size="medium" />);

    const element = screen.getByRole('button');

    expect(element).toHaveClass('Button');
    expect(element).toHaveClass('Button--medium');
  });

  it('should render text children', () => {
    render(<ButtonLink>Hello World</ButtonLink>);

    const element = screen.getByRole('button');

    expect(element.textContent).toBe('Hello World');
  });

  it('should not have default type attribute', () => {
    render(<ButtonLink />);

    const element = screen.getByRole('button');

    expect(element).not.toHaveAttribute('type');
  });

  it('should pass rel attribute', () => {
    render(<ButtonLink rel="noopener" />);

    const element = screen.getByRole('button');

    expect(element).toHaveAttribute('rel', 'noopener');
  });

  it('should pass target attribute', () => {
    render(<ButtonLink target="_blank" />);

    const element = screen.getByRole('button');

    expect(element).toHaveAttribute('target', '_blank');
  });
});
