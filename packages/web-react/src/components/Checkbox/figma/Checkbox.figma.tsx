import figma from '@figma/code-connect';
import React from 'react';
import { Link } from '../../Link';
import Checkbox from '../Checkbox';

figma.connect(Checkbox, '<FIGMA_FILE_ID>?node-id=830%3A292', {
  props: {
    indeterminate: figma.boolean('Indeterminate'),
    isChecked: figma.boolean('Selected'),
    isDisabled: figma.boolean('Disabled'),
    helperText: figma.boolean('Helper text', {
      true: 'Helper text',
      false: undefined,
    }),
    label: figma.string('Label'),
    link: figma.boolean('Link', {
      true: (
        <Link elementType="button" color="inherit" underlined="always" onClick={() => {}} type="button">
          Link
        </Link>
      ),
      false: undefined,
    }),
    description: figma.boolean('Description', {
      true: 'Description',
      false: undefined,
    }),
    validationState: figma.enum('Validation State', {
      Success: 'success',
      Warning: 'warning',
      Danger: 'danger',
    }),
    validationText: 'Validation text',
  },
  example: ({ description, helperText, label, link, validationText, ...props }) => (
    <Checkbox
      {...props}
      helperText={helperText}
      id="checkbox-default"
      details={
        <>
          {link}
          {description}
        </>
      }
      label={label}
      validationText={validationText}
    />
  ),
});
