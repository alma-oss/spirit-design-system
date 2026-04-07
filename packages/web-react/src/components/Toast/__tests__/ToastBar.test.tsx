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
import { getColorSchemeClassName } from '../../../utils';
import ToastBar from '../ToastBar';

jest.mock('../../../hooks/useIcon');

describe('ToastBar', () => {
  classNamePrefixProviderTest((props) => <ToastBar {...props} id="test" />, 'ToastBar');

  stylePropsTest((props) => <ToastBar {...props} id="test" data-testid="toastbar-test" />, 'toastbar-test');

  restPropsTest((props) => <ToastBar {...props} id="test" />, 'div');

  validHtmlAttributesTest(ToastBar);

  ariaAttributesTest(ToastBar);

  it('should not render', () => {
    const dom = render(<ToastBar isOpen={false} id="test" />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element).not.toBeInTheDocument();
  });

  it('should render', () => {
    const dom = render(<ToastBar isOpen id="test" />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('ToastBar');
    expect(element).toHaveClass('ToastBar--neutral');
    expect(element).toHaveClass(getColorSchemeClassName({ color: 'neutral', isSubtle: false }));
  });

  it('should render text children', () => {
    render(<ToastBar id="test">Hello World</ToastBar>);

    const element = screen.getByText('Hello World');

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('ToastBar__content');
    expect(element).toContainHTML('div');
    expect(element.parentElement).toHaveClass('ToastBar__container');
  });

  it('should render icon and have danger class', () => {
    const dom = render(
      <ToastBar id="test" color="danger" hasIcon isDismissible>
        Hello World
      </ToastBar>,
    );

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element).toHaveClass('ToastBar--danger ToastBar--dismissible');
    expect(element).toHaveClass(getColorSchemeClassName({ color: 'danger', isSubtle: false }));

    const icon = dom.container.querySelector('svg') as SVGSVGElement;

    expect(icon).toBeInTheDocument();
  });
});
