import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  elementTypePropsTest,
  formFieldContextPropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import HelperText from '../HelperText';

describe('HelperText', () => {
  const helperText = 'Helper Text';

  validHtmlAttributesTest(HelperText);

  stylePropsTest((props) => <HelperText {...props} helperText={helperText} />);

  restPropsTest((props) => <HelperText {...props} helperText={helperText} />, 'div');

  elementTypePropsTest((props) => <HelperText {...props} helperText={helperText} />, 'span');

  formFieldContextPropsTest({
    renderComponent: (props) => <HelperText {...props} helperText={helperText} />,
    text: helperText,
    classNamePrefix: 'HelperText',
  });

  it('should render helper text', () => {
    render(<HelperText helperText={helperText} />);

    const element = screen.getByText(helperText);

    expect(element.textContent).toBe(helperText);
  });

  it('should render with html tags', () => {
    render(
      <HelperText
        id="helper-text-html"
        helperText={
          <>
            Helper <b>Text</b>
          </>
        }
      />,
    );

    const element = document.getElementById('helper-text-html') as HTMLElement;

    expect(element.innerHTML).toBe('Helper <b>Text</b>');
  });

  it('should render with id and registerAria for aria-describedby', () => {
    const id = 'helper-text-aria-describedby';
    const register = jest.fn();

    const { unmount } = render(<HelperText id={id} registerAria={register} helperText={helperText} />);

    const element = screen.getByText(helperText);

    expect(element).toHaveAttribute('id', id);
    expect(register).toHaveBeenCalledWith({ add: id });

    unmount();

    expect(register).toHaveBeenCalledWith({ remove: id });
  });
});
