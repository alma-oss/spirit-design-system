import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { validHtmlAttributesTest } from '@local/tests';
import { type ToastLinkProps } from '../../../types';
import { ToastContext } from '../ToastContext';
import UncontrolledToast from '../UncontrolledToast';

jest.mock('../../../hooks/useIcon');

const defaultToast = {
  id: 'test-id',
  content: {
    message: 'Toast message',
    link: 'Toast link',
  },
  isOpen: false,
  iconName: undefined,
  hasIcon: false,
  isDismissible: false,
  color: undefined,
  linkProps: {
    href: '#',
  } as ToastLinkProps,
};

const defaultContextValue = {
  queue: [defaultToast],
  hide: jest.fn(),
  show: jest.fn(),
  clear: jest.fn(),
  setQueue: jest.fn(),
};

describe('UncontrolledToast', () => {
  validHtmlAttributesTest(UncontrolledToast);

  it('should not render', () => {
    render(
      <ToastContext.Provider value={defaultContextValue}>
        <UncontrolledToast />
      </ToastContext.Provider>,
    );

    expect(screen.queryByTestId('toast-bar-test-id')).not.toBeInTheDocument();
  });

  it('should render opened toast', () => {
    const contextValue = {
      ...defaultContextValue,
      queue: [{ ...defaultToast, isOpen: true }],
    };

    render(
      <ToastContext.Provider value={contextValue}>
        <UncontrolledToast />
      </ToastContext.Provider>,
    );

    const elementToast = screen.getByRole('log');
    const elementToastBar = screen.getByText('Toast message').closest('.ToastBar') as HTMLElement;
    const elementToastBarBox = elementToastBar.querySelector('.ToastBar__box') as HTMLElement;

    expect(elementToast).toBeInTheDocument();
    expect(elementToastBar).toBeInTheDocument();
    expect(elementToastBar).toHaveClass('is-open');
    expect(elementToastBarBox).toHaveClass('color-scheme-on-neutral-basic');
    expect(elementToastBar.querySelector('.ToastBar__container svg')).not.toBeInTheDocument();
  });

  it('should render opened toast with params', () => {
    const contextValue = {
      ...defaultContextValue,
      queue: [{ ...defaultToast, isOpen: true, isDismissible: true, hasIcon: true }],
    };

    render(
      <ToastContext.Provider value={contextValue}>
        <UncontrolledToast alignmentX="right" alignmentY="top" closeLabel="Close test" />
      </ToastContext.Provider>,
    );

    const elementToast = screen.getByRole('log');
    const elementToastBar = screen.getByText('Toast message').closest('.ToastBar') as HTMLElement;
    const elementToastBarBox = elementToastBar.querySelector('.ToastBar__box') as HTMLElement;

    expect(elementToast).toBeInTheDocument();
    expect(elementToastBar).toBeInTheDocument();
    expect(elementToast).toHaveClass('Toast--right Toast--top');
    expect(elementToastBar).toHaveClass('ToastBar ToastBar--dismissible is-open');
    expect(elementToastBarBox).toHaveClass('color-scheme-on-neutral-basic');
    expect(elementToastBar.querySelector('.ToastBar__container svg')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Close test');
  });

  it('should close toast when close button is clicked', () => {
    const contextValue = {
      ...defaultContextValue,
      queue: [{ ...defaultToast, isOpen: true, isDismissible: true }],
    };

    render(
      <ToastContext.Provider value={contextValue}>
        <UncontrolledToast />
      </ToastContext.Provider>,
    );

    const elementButton = screen.getByRole('button');

    elementButton.click();

    expect(contextValue.hide).toHaveBeenCalled();
  });
});
