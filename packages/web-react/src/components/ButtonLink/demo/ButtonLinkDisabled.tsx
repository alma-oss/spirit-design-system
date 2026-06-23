import React from 'react';
import { Grid } from '../../Grid';
import ButtonLinkDemoFactory from './ButtonLinkDemoFactory';

const ButtonLinkDisabled = () => (
  <Grid cols={{ mobile: 1, desktop: 3 }} spacingX="space-300" spacingY="space-1100">
    <ButtonLinkDemoFactory isDisabled />
  </Grid>
);

export default ButtonLinkDisabled;
