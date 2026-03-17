import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  itemPropsTest,
  requiredPropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
  validationStatePropsTest,
} from '@local/tests';
import Radio from '../Radio';

describe('Radio', () => {
  classNamePrefixProviderTest(Radio, 'Radio');

  itemPropsTest(Radio);

  stylePropsTest(Radio);

  restPropsTest(Radio, 'input');

  validationStatePropsTest(Radio, 'Radio--');

  requiredPropsTest(Radio, 'radio', 'id', 'example-id');

  validHtmlAttributesTest(Radio);

  ariaAttributesTest(Radio);

  it('should have label', () => {
    render(<Radio id="radio" label="label" />);

    expect(screen.getByRole('radio').nextElementSibling?.firstChild).toBeInTheDocument();
  });

  it('should have input classname', () => {
    render(<Radio id="radio" label="label" />);

    expect(screen.getByRole('radio')).toHaveClass('Radio__input');
  });

  it('should have helper text', () => {
    render(<Radio id="radio" label="Label" helperText="text" />);

    expect(screen.getByRole('radio').nextElementSibling?.lastChild).toHaveTextContent('text');
  });

  it('should render label with html tags', () => {
    render(
      <Radio
        id="radio"
        label={
          <>
            Radio <b>Label</b>
          </>
        }
      />,
    );

    const element = screen.getByRole('radio').nextElementSibling?.firstChild as HTMLElement;

    expect(element).toHaveTextContent('Radio Label');
    expect(element.innerHTML).toBe('Radio <b>Label</b>');
  });
});
