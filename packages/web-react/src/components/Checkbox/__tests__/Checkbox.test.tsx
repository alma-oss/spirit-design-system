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
  validationTextPropsTest,
} from '@local/tests';
import Checkbox from '../Checkbox';

jest.mock('../../../hooks/useIcon');

describe('Checkbox', () => {
  classNamePrefixProviderTest(Checkbox, 'Checkbox');

  itemPropsTest(Checkbox);

  stylePropsTest(Checkbox);

  restPropsTest(Checkbox, 'input');

  validationStatePropsTest(Checkbox, 'Checkbox--');

  validationTextPropsTest(Checkbox, '.Checkbox__validationText');

  requiredPropsTest(Checkbox, 'checkbox', 'id', 'test-checkbox');

  validHtmlAttributesTest(Checkbox);

  ariaAttributesTest(Checkbox);

  it('should have text classname', () => {
    render(<Checkbox id="checkbox" label="Label" />);

    expect(screen.getByRole('checkbox').nextElementSibling).toHaveClass('Checkbox__text');
  });

  it('should have label', () => {
    render(<Checkbox id="checkbox" label="Label" />);

    expect(screen.getByRole('checkbox').nextElementSibling?.firstChild).toBeInTheDocument();
  });

  it('should have input classname', () => {
    render(<Checkbox id="checkbox" label="Label" />);

    expect(screen.getByRole('checkbox')).toHaveClass('Checkbox__input');
  });

  it('should have helper text', () => {
    render(<Checkbox id="checkbox" label="Label" helperText="text" />);

    const element = screen.getByText('text');

    expect(element).toBeInTheDocument();
  });

  it('should render label with html tags', () => {
    render(
      <Checkbox
        id="checkbox"
        label={
          <>
            Label <b>Text</b>
          </>
        }
      />,
    );

    const element = screen.getByRole('checkbox').nextElementSibling?.firstChild as HTMLElement;

    expect(element).toHaveTextContent('Label Text');
    expect(element.innerHTML).toBe('Label <b>Text</b>');
  });

  it('should render details content', () => {
    const details = <button type="button">See terms</button>;
    render(<Checkbox id="checkbox" label="Label" details={details} />);

    expect(screen.getByRole('button', { name: 'See terms' })).toBeInTheDocument();
  });

  it('should set aria-details attribute', () => {
    const details = <span>Details content</span>;
    render(<Checkbox id="checkbox" label="Label" details={details} />);

    const input = screen.getByRole('checkbox');

    expect(input).toHaveAttribute('aria-details', 'checkbox-details');
  });

  it('should not set aria-details when no details provided', () => {
    render(<Checkbox id="checkbox" label="Label" />);

    const input = screen.getByRole('checkbox');

    expect(input).not.toHaveAttribute('aria-details');
  });
});
