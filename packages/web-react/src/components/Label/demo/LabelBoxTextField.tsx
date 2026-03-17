import React from 'react';
import { TextField } from '../../TextField';

const LabelBoxTextField = () => (
  <>
    <TextField id="text-field-example" label="Label" name="textFieldExample" placeholder="Placeholder" />
    <TextField
      id="text-field-required"
      label="Required Field"
      name="textFieldRequired"
      placeholder="Placeholder"
      isRequired
    />
    <TextField
      id="text-field-disabled"
      label="Disabled Field"
      name="textFieldDisabled"
      placeholder="Placeholder"
      isDisabled
    />
    <TextField
      id="text-field-hidden"
      label="Hidden Label"
      name="textFieldHidden"
      placeholder="Placeholder with hidden label"
      isLabelHidden
    />
  </>
);

export default LabelBoxTextField;
