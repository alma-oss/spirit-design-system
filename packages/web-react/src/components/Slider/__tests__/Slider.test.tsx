import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  formFieldHelperTextContextPropsTest,
  formFieldLabelContextPropsTest,
  formFieldValidationTextContextPropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import Slider from '../Slider';

describe('Slider', () => {
  const defaultValue = 10;
  const defaultProps = {
    id: 'slider-test',
    label: 'Slider',
    onChange: () => {},
    value: defaultValue,
  };

  classNamePrefixProviderTest(Slider, 'Slider');

  stylePropsTest((props) => <Slider id={defaultProps.id} {...props} data-testid="slider-test" />, 'slider-test');

  restPropsTest((props) => <Slider id={defaultProps.id} {...props} />, 'div');

  validHtmlAttributesTest((props) => <Slider id={defaultProps.id} {...props} />);

  ariaAttributesTest((props) => <Slider id={defaultProps.id} {...props} />);

  formFieldLabelContextPropsTest({
    includeRequired: false,
    renderComponent: (props) => <Slider {...defaultProps} {...props} />,
  });

  formFieldHelperTextContextPropsTest({
    renderComponent: (props) => <Slider {...defaultProps} {...props} />,
  });

  formFieldValidationTextContextPropsTest({
    renderComponent: (props) => <Slider {...defaultProps} {...props} />,
  });

  it('should render slider', () => {
    render(<Slider {...defaultProps} />);

    const sliderElement = screen.getByRole('slider');

    expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
    expect(sliderElement).toBeInTheDocument();
    expect(sliderElement).toHaveValue(defaultValue.toString());
  });

  it('should render validation text', () => {
    const validationText = 'Validation text';

    render(<Slider {...defaultProps} validationText={validationText} validationState="danger" data-testid="test" />);

    expect(screen.getByTestId('test')).toHaveClass('Slider Slider--danger');
    expect(screen.getByText(validationText)).toBeInTheDocument();
  });

  it('should render label with html tags', () => {
    render(
      <Slider
        {...defaultProps}
        label={
          <>
            Slider <b>Label</b>
          </>
        }
      />,
    );

    const element = screen.getByText('Label').parentElement as HTMLElement;

    expect(element).toHaveTextContent('Slider Label');
    expect(element.innerHTML).toBe('Slider <b>Label</b>');
  });

  it('should render validation icon when hasValidationIcon is set', () => {
    render(<Slider {...defaultProps} hasValidationIcon validationState="danger" validationText="Invalid" />);

    const validationRoot = screen.getByText('Invalid').parentElement as HTMLElement;

    expect(validationRoot.querySelector('svg')).toBeInTheDocument();
  });
});
