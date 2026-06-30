import React from 'react';
import { TextAlignments } from '../../../constants';
import { ActionText } from '..';

const ActionTextAlignment = () => (
  <>
    <ActionText>Action left</ActionText>
    <ActionText textAlignment={TextAlignments.CENTER}>Action center</ActionText>
    <ActionText textAlignment={TextAlignments.RIGHT}>Action right</ActionText>
  </>
);

export default ActionTextAlignment;
