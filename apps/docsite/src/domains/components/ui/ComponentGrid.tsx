import { ChildrenProps, Grid } from '@alma-oss/spirit-web-react';
import React from 'react';

interface ComponentGridProps extends ChildrenProps {}

const ComponentGrid = ({ children }: ComponentGridProps) => (
  <Grid elementType="ul" cols={{ mobile: 2, tablet: 3 }}>
    {children}
  </Grid>
);

export default ComponentGrid;
