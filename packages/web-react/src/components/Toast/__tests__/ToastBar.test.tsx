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
import ToastBar from '../ToastBar';

jest.mock('../../../hooks/useIcon');

describe('ToastBar', () => {
  classNamePrefixProviderTest((props) => <ToastBar {...props} id="test" />, 'ToastBar');

  stylePropsTest((props) => <ToastBar {...props} id="test" data-testid="toastbar-test" />, 'toastbar-test');

  restPropsTest((props) => <ToastBar {...props} id="test" />, 'div');

  validHtmlAttributesTest(ToastBar);

  ariaAttributesTest(ToastBar);

  it('should not render', () => {
    render(<ToastBar isOpen={false} id="test" />);

    expect(screen.queryByTestId('toast-bar-test')).not.toBeInTheDocument();
  });

  it('should render', () => {
    render(<ToastBar isOpen id="test" data-testid="toast-bar-test" />);

    const element = screen.getByTestId('toast-bar-test');
    const boxElement = element.querySelector('.ToastBar__box') as HTMLElement;

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('ToastBar');

    expect(boxElement).toBeInTheDocument();
    expect(boxElement).toHaveClass('color-scheme-on-neutral-basic');
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
    render(
      <ToastBar id="test" color="danger" hasIcon isDismissible data-testid="toast-bar-danger">
        Hello World
      </ToastBar>,
    );

    const element = screen.getByTestId('toast-bar-danger');
    const boxElement = element.querySelector('.ToastBar__box') as HTMLElement;

    expect(element).toHaveClass('ToastBar--dismissible');
    expect(boxElement).toHaveClass('color-scheme-on-emotion-danger-basic');

    expect(element.querySelector('svg')).toBeInTheDocument();
  });
});
