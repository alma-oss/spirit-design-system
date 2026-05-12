import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { ariaAttributesTest, requiredPropsTest, validHtmlAttributesTest } from '@local/tests';
import { Sizes } from '../../../constants';
import { type TextFieldType } from '../../../types';
import { InputAddon } from '../../InputAddon';
import TextFieldBase from '../TextFieldBase';

describe('TextFieldBase', () => {
  requiredPropsTest(TextFieldBase, 'textbox', 'id', 'textfieldbase');

  validHtmlAttributesTest(TextFieldBase);

  ariaAttributesTest(TextFieldBase);

  it.each([Object.values(Sizes)])('should render size %s', async (size) => {
    render(<TextFieldBase id="textfield-base" label="Label" size={size} />);

    await waitFor(() => {
      const inputContainer = screen.getByLabelText('Label').parentElement;

      expect(inputContainer?.getAttribute('class')).toContain(size);
    });
  });

  describe.each(['text', 'password', 'email'])('input type %s', (type) => {
    it('should have connected label and input', () => {
      const dom = render(<TextFieldBase id="textfield-base" label="Label" type={type as TextFieldType} />);

      const labelElement = dom.container.querySelector('label') as HTMLElement;

      expect(labelElement).toHaveAttribute('for', 'textfield-base');

      const inputElement = dom.container.querySelector('input') as HTMLElement;

      expect(inputElement).toHaveAttribute('id', 'textfield-base');
    });
  });

  describe('addons', () => {
    it('should render startAddon before input and endAddon after input', () => {
      render(
        <TextFieldBase
          id="textfield-base"
          label="Label"
          startAddon={
            <InputAddon elementType="label" htmlFor="textfield-base">
              Start
            </InputAddon>
          }
          endAddon={
            <InputAddon elementType="label" htmlFor="textfield-base">
              End
            </InputAddon>
          }
        />,
      );

      const input = screen.getByLabelText('Label');
      const children = Array.from(input.parentElement?.children ?? []);
      const startAddon = screen.getByText('Start', { selector: '.InputAddon' });
      const endAddon = screen.getByText('End', { selector: '.InputAddon' });

      expect(children).toEqual([startAddon, input, endAddon]);
    });

    it('should render endAddon before password toggle', () => {
      render(
        <TextFieldBase
          id="textfield-base-password"
          label="Password"
          hasPasswordToggle
          endAddon={
            <InputAddon elementType="label" htmlFor="textfield-base-password">
              End
            </InputAddon>
          }
        />,
      );

      const input = screen.getByLabelText('Password');
      const children = Array.from(input.parentElement?.children ?? []);
      const endAddon = screen.getByText('End', { selector: '.InputAddon' });

      expect(children).toEqual([input, endAddon, screen.getByRole('switch').parentElement]);
    });
  });
});
