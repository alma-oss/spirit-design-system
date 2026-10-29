import React from 'react';
import {
  accessibilityAriaDescribedByTest,
  accessibilityDisabledTest,
  accessibilityTest,
  accessibilityValidationStateTest,
} from '@local/tests';
import Slider from '../Slider';

describe('Slider accessibility', () => {
  accessibilityTest(
    (props) => <Slider {...props} id="slider" label="Label" value={50} onChange={() => {}} />,
    'input[type="range"]',
  );

  accessibilityDisabledTest(
    (props) => <Slider {...props} id="slider-disabled" label="Label" value={50} onChange={() => {}} />,
    'input[type="range"]',
  );

  accessibilityValidationStateTest(
    (props) => (
      <Slider
        {...props}
        id="slider-validation"
        label="Label"
        value={50}
        onChange={() => {}}
        validationText="Validation text"
      />
    ),
    'input[type="range"]',
  );

  accessibilityAriaDescribedByTest(
    (props) => <Slider {...props} id="slider-aria-describedby" label="Label" value={50} onChange={() => {}} />,
    'input[type="range"]',
  );
});
