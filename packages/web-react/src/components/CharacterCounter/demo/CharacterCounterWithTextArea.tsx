'use client';

import React, { type ChangeEvent, useState } from 'react';
import { TextArea } from '../../TextArea';

const LONG_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut al';

const CharacterCounterWithTextAreaValidation = () => {
  const [value, setValue] = useState(LONG_TEXT);
  const isOverLimit = value.length > 200;

  return (
    <TextArea
      counterThreshold={200}
      hasValidationIcon
      helperText="Our support will get back to you within 24 hours"
      id="character-counter-demo-validation"
      label="Counter with validation"
      name="characterCounterDemoValidation"
      placeholder="Placeholder"
      validationText="You have entered too many characters"
      value={value}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value)}
      {...(isOverLimit && { validationState: 'danger' as const })}
    />
  );
};

const CharacterCounterWithTextArea = () => (
  <>
    <TextArea
      id="character-counter-demo-show-only"
      name="characterCounterDemoShowOnly"
      label="Counter with helper text"
      placeholder="Placeholder"
      hasCounter
      helperText="Write at least 100 characters"
    />

    <TextArea
      id="character-counter-demo-threshold"
      name="characterCounterDemoThreshold"
      label="Counter with threshold"
      placeholder="Placeholder"
      counterThreshold={200}
    />

    <TextArea
      id="character-counter-demo-helper-threshold"
      name="characterCounterDemoHelperThreshold"
      label="Counter with helper text and threshold"
      placeholder="Placeholder"
      counterThreshold={200}
      helperText="Write between 100 and 200 characters"
    />

    <TextArea
      id="character-counter-demo-disabled"
      name="characterCounterDemoDisabled"
      label="Disabled field"
      placeholder="Placeholder"
      counterThreshold={200}
      isDisabled
      value="Disabled"
    />

    <CharacterCounterWithTextAreaValidation />
  </>
);

export default CharacterCounterWithTextArea;
