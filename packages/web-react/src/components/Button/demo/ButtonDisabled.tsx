import React from 'react';
import { Grid } from '../../Grid';
import ButtonDemoFactory from './ButtonDemoFactory';

const ButtonDisabled = () => (
  <Grid cols={{ mobile: 1, desktop: 3 }} spacingX="space-300" spacingY="space-1100">
    <ButtonDemoFactory isDisabled />
  </Grid>
);

export default ButtonDisabled;
