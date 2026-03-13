import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ariaAttributesTest, restPropsTest, stylePropsTest, validHtmlAttributesTest } from '@local/tests';
import UncontrolledSlider from '../UncontrolledSlider';

describe('Slider', () => {
  const defaultProps = {
    id: 'slider-test',
    label: 'Slider',
  };

  stylePropsTest(
    (props) => <UncontrolledSlider id={defaultProps.id} {...props} data-testid="slider-test" />,
    'slider-test',
  );

  restPropsTest((props) => <UncontrolledSlider id={defaultProps.id} {...props} />, 'div');

  validHtmlAttributesTest((props) => <UncontrolledSlider id={defaultProps.id} {...props} />);

  ariaAttributesTest((props) => <UncontrolledSlider id={defaultProps.id} {...props} />);

  it('should render slider', () => {
    render(<UncontrolledSlider {...defaultProps} />);

    expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('should render helper text', () => {
    const helperText = 'Helper text';

    render(<UncontrolledSlider {...defaultProps} helperText={helperText} />);

    const helperTextElement = screen.getByText(helperText);

    expect(helperTextElement).toBeInTheDocument();
  });

  it('should render validation text', () => {
    const validationText = 'Validation text';

    render(
      <UncontrolledSlider
        {...defaultProps}
        validationText={validationText}
        validationState="danger"
        data-testid="test"
      />,
    );

    expect(screen.getByTestId('test')).toHaveClass('Slider Slider--danger');
    expect(screen.getByText(validationText)).toBeInTheDocument();
  });
});
