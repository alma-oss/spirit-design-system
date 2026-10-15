import React from 'react';
import { TextAlignments } from '../../../constants';
import { UNSTABLE_EyebrowText } from '..';

const EyebrowTextAlignment = () => (
  <>
    <UNSTABLE_EyebrowText>EyebrowText</UNSTABLE_EyebrowText>
    <UNSTABLE_EyebrowText textAlignment={TextAlignments.CENTER}>EyebrowText</UNSTABLE_EyebrowText>
    <UNSTABLE_EyebrowText textAlignment={TextAlignments.RIGHT}>EyebrowText</UNSTABLE_EyebrowText>
  </>
);

export default EyebrowTextAlignment;
