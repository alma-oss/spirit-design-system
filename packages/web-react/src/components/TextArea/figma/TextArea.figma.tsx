import figma from '@figma/code-connect';
import React from 'react';
import TextArea from '../TextArea';

figma.connect(TextArea, '<FIGMA_FILE_ID>?node-id=41283%3A4546', {
  props: {
    isDisabled: figma.boolean('Disabled'),
    isLabelHidden: figma.boolean('Label', {
      true: false,
      false: true,
    }),
    labelProps: figma.boolean('Label', {
      true: figma.nestedProps('Label', {
        label: figma.string('Label'),
      }),
      false: { label: 'Fill accessible label' },
    }),
    size: figma.enum('Size', {
      Small: 'small',
      Large: 'large',
    }),
    validationState: figma.enum('Validation State', {
      Success: 'success',
      Warning: 'warning',
      Danger: 'danger',
    }),
    validationTextProps: figma.nestedProps('Validation text', {
      validationText: figma.string('Message'),
    }),
  },
  example: ({ labelProps, validationTextProps, ...props }) => (
    <TextArea
      {...props}
      helperText="Helper text"
      id="textarea-default"
      label={labelProps.label}
      validationText={validationTextProps.validationText}
    />
  ),
});
