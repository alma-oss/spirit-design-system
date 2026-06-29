import React from 'react';
import { Grid } from '../../Grid';
import TextField from '../TextField';

const TextFieldSizes = () => (
  <Grid cols={{ mobile: 1, desktop: 3 }} alignmentY="top">
    <TextField
      helperText="Helper text"
      id="text-field-size-small"
      label="Small"
      name="textFieldSizeSmall"
      placeholder="Placeholder"
      size="small"
    />
    <TextField
      helperText="Helper text"
      id="text-field-size-medium"
      label="Medium (default)"
      name="textFieldSizeMedium"
      placeholder="Placeholder"
    />
    <TextField
      helperText="Helper text"
      id="text-field-size-large"
      label="Large"
      name="textFieldSizeLarge"
      placeholder="Placeholder"
      size="large"
    />

    <TextField
      hasPasswordToggle
      helperText="Helper text"
      id="text-field-password-size-small"
      label="Small"
      name="textFieldPasswordSizeSmall"
      size="small"
      defaultValue="password"
    />
    <TextField
      hasPasswordToggle
      helperText="Helper text"
      id="text-field-password-size-medium"
      label="Medium (default)"
      name="textFieldPasswordSizeMedium"
      defaultValue="password"
    />
    <TextField
      hasPasswordToggle
      helperText="Helper text"
      id="text-field-password-size-large"
      label="Large"
      name="textFieldPasswordSizeLarge"
      size="large"
      defaultValue="password"
    />
  </Grid>
);

export default TextFieldSizes;
