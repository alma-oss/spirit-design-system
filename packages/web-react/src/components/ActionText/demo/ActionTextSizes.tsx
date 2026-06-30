import React from 'react';
import { Sizes } from '../../../constants';
import { ActionText } from '..';

const ActionTextSizes = () =>
  Object.values(Sizes).map((size) => (
    <ActionText key={size} size={size}>
      Action {size}
    </ActionText>
  ));

export default ActionTextSizes;
