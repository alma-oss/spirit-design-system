import figma from '@figma/code-connect';
import React from 'react';
import { Checkbox } from '../../Checkbox';
import FieldGroup from '../FieldGroup';

const FIELD_GROUP_NODE_URL = '<FIGMA_FILE_ID>?node-id=12858%3A10625';

figma.connect(FieldGroup, FIELD_GROUP_NODE_URL, {
  props: {
    helperText: figma.boolean('Helper', {
      true: 'Helper text',
      false: undefined,
    }),
    isDisabled: figma.boolean('Disabled'),
    validationState: figma.enum('Validation State', {
      Success: 'success',
      Warning: 'warning',
      Danger: 'danger',
    }),
  },
  example: ({ helperText, ...props }) => (
    <FieldGroup helperText={helperText} {...props} id="fieldgroup-example" label="Label" isRequired>
      <Checkbox id="checkbox-1" label="Checkbox Label Text" name="checkboxDefault" isChecked />
      <Checkbox id="checkbox-2" label="Checkbox Label Text" name="checkboxDefault" />
      <Checkbox id="checkbox-3" label="Checkbox Label Text" name="checkboxDefault" />
      <Checkbox id="checkbox-4" label="Checkbox Label Text" name="checkboxDefault" />
    </FieldGroup>
  ),
});
