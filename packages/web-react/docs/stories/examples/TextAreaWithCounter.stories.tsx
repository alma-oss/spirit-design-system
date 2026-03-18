import React, { type ChangeEvent, type FormEvent, useState } from 'react';
import { Alert, Button, Stack, TextArea } from '../../../src/components';
import { Sizes } from '../../../src/constants';
import { type SizesDictionaryType } from '../../../src/types';

type TextAreaWithCounterType = {
  autoResizingMaxHeight: number;
  hasValidationIcon: boolean;
  helperText: string;
  id: string;
  isAutoResizing: boolean;
  isDisabled: boolean;
  isFluid: boolean;
  isRequired: boolean;
  label: string;
  counterThreshold: number;
  hasCounter: boolean;
  maxLength: number;
  minLength: number;
  name: string;
  placeholder: string;
  rows: number | undefined;
  size: SizesDictionaryType;
  validationTextMaxLength: string;
  validationTextMinLength: string;
};

export default {
  title: 'Examples/Forms',
  argTypes: {
    autoResizingMaxHeight: {
      control: 'number',
      table: {
        defaultValue: { summary: '400' },
      },
    },
    hasValidationIcon: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    helperText: {
      control: 'text',
    },
    isAutoResizing: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    isDisabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isFluid: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isRequired: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    label: {
      control: 'text',
    },
    counterThreshold: {
      control: 'number',
    },
    hasCounter: {
      control: 'boolean',
      description: 'Passes TextArea `hasCounter` (visible counter without threshold).',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    maxLength: {
      control: 'number',
    },
    minLength: {
      control: 'number',
      description: 'Minimum character count for demo validation (not a component prop).',
      name: 'min length',
      table: {
        subcategory: 'Demo settings - validation',
      },
    },
    placeholder: {
      control: 'text',
    },
    rows: {
      control: 'number',
    },
    size: {
      control: 'select',
      options: [...Object.values(Sizes), undefined],
      table: {
        defaultValue: { summary: Sizes.MEDIUM },
      },
    },
    validationTextMaxLength: {
      control: 'text',
      description: 'Validation text shown when the maximum character limit is exceeded.',
      name: 'max length validation text',
      table: {
        subcategory: 'Demo settings - validation',
      },
    },
    validationTextMinLength: {
      control: 'text',
      description: 'Validation text shown when the minimum character count is not met.',
      name: 'min length validation text',
      table: {
        subcategory: 'Demo settings - validation',
      },
    },
  },
  args: {
    autoResizingMaxHeight: 400,
    hasValidationIcon: true,
    helperText: 'Write between 50 and 200 characters',
    id: 'textarea-counter-example',
    isAutoResizing: true,
    isDisabled: false,
    isFluid: false,
    isRequired: true,
    label: 'Message',
    counterThreshold: 200,
    hasCounter: true,
    maxLength: undefined,
    minLength: 50,
    name: 'textAreaCounter',
    placeholder: 'Enter your message…',
    rows: undefined,
    size: Sizes.MEDIUM,
    validationTextMaxLength: 'You have entered too many characters',
    validationTextMinLength: 'Please enter at least 50 characters',
  },
};

export const TextAreaWithCounter = (args: TextAreaWithCounterType) => {
  const {
    counterThreshold,
    minLength,
    validationTextMaxLength,
    validationTextMinLength,
    hasValidationIcon,
    ...restArgs
  } = args;
  const [value, setValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isOverLimit = counterThreshold > 0 && value.length > counterThreshold;
  const isUnderLimit = minLength > 0 && value.length < minLength;
  const hasError = isSubmitted && (isOverLimit || isUnderLimit);
  const isSuccess = isSubmitted && !hasError && value.length > 0;
  const validationText = isOverLimit ? validationTextMaxLength : validationTextMinLength;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack hasSpacing>
        <TextArea
          {...restArgs}
          counterThreshold={counterThreshold}
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setValue(e.target.value);
            setIsSubmitted(false);
          }}
          {...(hasError && {
            validationState: 'danger',
            validationText,
            hasValidationIcon,
          })}
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
        {isSuccess && <Alert color="success">Your message has been submitted successfully.</Alert>}
      </Stack>
    </form>
  );
};
