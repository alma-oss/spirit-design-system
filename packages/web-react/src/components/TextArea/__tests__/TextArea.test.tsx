import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  requiredPropsTest,
  restPropsTest,
  sizePropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
  validationStatePropsTest,
} from '@local/tests';
import TextArea from '../TextArea';

jest.mock('../../../hooks/useIcon');

describe('TextArea', () => {
  classNamePrefixProviderTest(TextArea, 'TextArea');

  stylePropsTest(TextArea);

  requiredPropsTest(TextArea, 'textbox', 'id', 'example-id');

  restPropsTest(TextArea, 'textarea');

  validationStatePropsTest(TextArea, 'TextArea--');

  validHtmlAttributesTest(TextArea);

  ariaAttributesTest(TextArea);

  sizePropsTest(TextArea);

  it('should have label', () => {
    render(<TextArea id="textarea" label="Label" />);

    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('should have input classname', () => {
    render(<TextArea id="textarea" label="Label" />);

    expect(screen.getByRole('textbox')).toHaveClass('TextArea__input');
  });

  it('should have helper text', () => {
    render(<TextArea id="textarea" label="Label" helperText="helper text" />);

    expect(screen.getByRole('textbox').nextElementSibling).toHaveTextContent('helper text');
  });

  it('should have fluid classname', () => {
    render(<TextArea id="textarea" label="Label" isFluid />);

    expect(screen.getByRole('textbox').parentElement).toHaveClass('TextArea--fluid');
  });

  describe('autoresizing', () => {
    it('should adjust height when mounted and autoresizing is enabled', () => {
      render(<TextArea id="textarea" label="Label" isFluid isAutoResizing />);

      expect(screen.getByRole('textbox').style.height).toBe('2px');
    });

    it('should not adjust height when mounted and autoresizing is not used', () => {
      render(<TextArea id="textarea" label="Label" isFluid />);

      expect(screen.getByRole('textbox').style.height).toBe('');
    });
  });

  it('should render label with html tags', () => {
    render(
      <TextArea
        id="textarea"
        label={
          <>
            TextArea <b>Label</b>
          </>
        }
      />,
    );

    const element = screen.getByText('Label').parentElement as HTMLElement;

    expect(element).toHaveTextContent('TextArea Label');
    expect(element.innerHTML).toBe('TextArea <b>Label</b>');
  });
});
