import React from 'react';
import { TextAlignments } from '../../../constants';
import { CaptionText } from '..';

const CaptionTextAlignment = () => (
  <>
    <CaptionText>Caption left</CaptionText>
    <CaptionText textAlignment={TextAlignments.CENTER}>Caption center</CaptionText>
    <CaptionText textAlignment={TextAlignments.RIGHT}>Caption right</CaptionText>
  </>
);

export default CaptionTextAlignment;
