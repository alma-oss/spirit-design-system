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

    expect(screen.getByRole('radio', { name: 'label' })).toBeInTheDocument();
  });

  it('should have input classname', () => {
    render(<Radio id="radio" label="label" />);

    expect(screen.getByRole('radio')).toHaveClass('Radio__input');
  });

  it('should have helper text', () => {
    render(<Radio id="radio" label="Label" helperText="text" />);

    expect(screen.getByText('text')).toBeInTheDocument();
  });

  it('should register helper text id in aria-describedby', () => {
    render(<Radio id="radio-aria" label="Label" helperText="Helper" />);

    const input = screen.getByRole('radio', { name: 'Label' });
    expect(input.getAttribute('aria-describedby')).toContain('radio-aria__helperText');
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

    expect(screen.getByRole('radio', { name: 'Radio Label' })).toBeInTheDocument();
  });
});
