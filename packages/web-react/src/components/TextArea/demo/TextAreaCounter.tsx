import React, { type ChangeEvent, useState } from 'react';
import TextArea from '../TextArea';

const LONG_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut al';

const COUNTER_THRESHOLD_VALIDATION_DEMO = 200;
const VALIDATION_STATE_OVER_LIMIT = 'danger';
const VALIDATION_TEXT_OVER_LIMIT = 'You have entered too many characters';

const TextAreaCounterWithValidation = () => {
  const [value, setValue] = useState(LONG_TEXT);
  const isOverLimit = value.length > COUNTER_THRESHOLD_VALIDATION_DEMO;

  return (
    <TextArea
      hasValidationIcon
      helperText="Our support will get back to you within 24 hours"
      id="textarea-counter-validation"
      label="Show Counter with Threshold and Validation"
      counterThreshold={COUNTER_THRESHOLD_VALIDATION_DEMO}
      name="counterValidation"
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
      placeholder="Placeholder"
      {...(isOverLimit && { validationState: VALIDATION_STATE_OVER_LIMIT, validationText: VALIDATION_TEXT_OVER_LIMIT })}
      value={value}
    />
  );
};

const TextAreaCounter = () => (
  <>
    <TextArea
      id="textarea-counter-show-only"
      label="Show Counter with Helper Text"
      hasCounter
      name="counterShowOnly"
      placeholder="Placeholder"
      helperText="Write at least 100 characters"
    />

    <TextArea
      id="textarea-counter-default"
      label="Show Counter with Threshold"
      counterThreshold={200}
      name="counterDefault"
      placeholder="Placeholder"
    />

    <TextArea
      helperText="Write between 100 and 200 characters"
      id="textarea-counter-min-max"
      label="Show Counter with Threshold and Helper Text"
      counterThreshold={200}
      name="counterMinMax"
      placeholder="Placeholder"
    />

    <TextArea
      id="textarea-counter-disabled"
      isDisabled
      label="Show Counter with Threshold, Disabled"
      counterThreshold={200}
      name="counterDisabled"
      placeholder="Placeholder"
      value="Disabled"
    />

    <TextAreaCounterWithValidation />
  </>
);

export default TextAreaCounter;
