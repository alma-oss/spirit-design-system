import React from 'react';
import { Grid } from '../../Grid';
import TextArea from '../TextArea';

const TextAreaSizes = () => (
  <Grid cols={{ mobile: 1, desktop: 3 }} alignmentY="top">
    <TextArea
      id="text-area-size-small"
      label="Small"
      name="textAreaSizeSmall"
      placeholder="Placeholder"
      size="small"
      helperText="Helper text"
    />
    <TextArea
      id="text-area-size-medium"
      label="Medium (default)"
      name="textAreaSizeMedium"
      placeholder="Placeholder"
      helperText="Helper text"
    />
    <TextArea
      id="text-area-size-large"
      label="Large"
      name="textAreaSizeLarge"
      placeholder="Placeholder"
      size="large"
      helperText="Helper text"
    />
  </Grid>
);

export default TextAreaSizes;
