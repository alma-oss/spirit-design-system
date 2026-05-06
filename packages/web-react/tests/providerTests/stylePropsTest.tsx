import { render, waitFor } from '@testing-library/react';
import React, { type ComponentType } from 'react';
import getElement from '../testUtils/getElement';
import { themePropsTest } from './themePropsTest';

export const stylePropsTest = (Component: ComponentType<any>, testId?: string) => {
  themePropsTest(Component, testId);

  it('renders class with UNSAFE_className', async () => {
    const testClassName = 'test-class';
    const dom = render(<Component UNSAFE_className={testClassName} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(testClassName);
    });
  });

  it('renders style with UNSAFE_style', async () => {
    const providedStyle = { color: 'red' };
    const expectedStyle = { color: 'rgb(255, 0, 0)' };
    const dom = render(<Component UNSAFE_style={providedStyle} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveStyle(expectedStyle);
    });
  });

  it('should warn when using unsupported `style` prop', async () => {
    const consoleWarnMock = jest.spyOn(global.console, 'warn').mockImplementation();

    const testStyle = { color: 'red' };
    render(<Component style={testStyle} />);

    await waitFor(() =>
      expect(consoleWarnMock).toHaveBeenCalledWith(
        'Warning: The style prop is unsafe and is unsupported in Spirit Web React. Please use style props with Spirit Design Tokens, or UNSAFE_style if you absolutely must do something custom. Note that this may break in future versions due to DOM structure changes.',
      ),
    );

    consoleWarnMock.mockRestore();
  });

  it('should warn when using unsupported `className` prop', async () => {
    const consoleWarnMock = jest.spyOn(global.console, 'warn').mockImplementation();

    const testClassName = 'test-class';
    render(<Component className={testClassName} />);

    await waitFor(() =>
      expect(consoleWarnMock).toHaveBeenCalledWith(
        'Warning: The className prop is unsafe and is unsupported in Spirit Web React. Please use style props with Spirit Design Tokens, or UNSAFE_className if you absolutely must do something custom. Note that this may break in future versions due to DOM structure changes.',
      ),
    );

    consoleWarnMock.mockRestore();
  });

  it.each([
    [{ margin: 'space-100' }, { className: 'm-100' }],
    [
      { margin: { mobile: 'space-100', tablet: 'space-200', desktop: 'space-300' } },
      { className: 'm-100 m-tablet-200 m-desktop-300' },
    ],
    [{ marginX: { mobile: 'auto', desktop: 'space-300' } }, { className: 'mx-auto mx-desktop-300' }],
    [
      {
        margin: 'space-100',
        marginTop: 'space-200',
        marginRight: 'space-300',
        marginBottom: 'space-400',
        marginLeft: 'space-500',
        marginX: 'space-600',
        marginY: 'space-700',
      },
      { className: 'm-100 mt-200 mr-300 mb-400 ml-500 mx-600 my-700' },
    ],
    [
      {
        margin: 'auto',
        marginTop: 'auto',
        marginRight: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginX: 'auto',
        marginY: 'auto',
      },
      { className: 'm-auto mt-auto mr-auto mb-auto ml-auto mx-auto my-auto' },
    ],
  ])('renders margin props', async (props, expected) => {
    const dom = render(<Component {...props} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(expected.className);
    });
  });
};
