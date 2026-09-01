import React from 'react';
import { Sizes } from '../../../constants';
import { UNSTABLE_DisplayHeading } from '..';

const DisplayHeadingSizes = () =>
  Object.values(Sizes).map((size) => (
    <UNSTABLE_DisplayHeading elementType="h2" key={size} size={size}>
      Display heading {size}
    </UNSTABLE_DisplayHeading>
  ));

export default DisplayHeadingSizes;
