import React from 'react';
import Label from '../Label';

const LabelSizes = () => (
  <>
    <Label elementType="span" size="xsmall">
      XSmall
    </Label>
    <Label elementType="span" size="small">
      Small
    </Label>
    <Label elementType="span">Medium (default)</Label>
    <Label elementType="span" size="large">
      Large
    </Label>
    <Label elementType="span" size="xlarge">
      XLarge
    </Label>
  </>
);

export default LabelSizes;
