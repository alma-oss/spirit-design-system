import React from 'react';
import { Grid } from '../../Grid';
import ButtonLinkDemoFactory from './ButtonLinkDemoFactory';

const ButtonLinkDefault = () => (
  <Grid cols={{ mobile: 1, desktop: 3 }} spacingX="space-300" spacingY="space-1100">
    <ButtonLinkDemoFactory />
  </Grid>
);

export default ButtonLinkDefault;
