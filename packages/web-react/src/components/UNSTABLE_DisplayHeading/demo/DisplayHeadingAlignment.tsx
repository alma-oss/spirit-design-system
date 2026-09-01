import React from 'react';
import { TextAlignments } from '../../../constants';
import { UNSTABLE_DisplayHeading } from '..';

const DisplayHeadingAlignment = () => (
  <>
    <UNSTABLE_DisplayHeading elementType="h2">Display heading</UNSTABLE_DisplayHeading>
    <UNSTABLE_DisplayHeading elementType="h2" textAlignment={TextAlignments.CENTER}>
      Display heading
    </UNSTABLE_DisplayHeading>
    <UNSTABLE_DisplayHeading elementType="h2" textAlignment={TextAlignments.RIGHT}>
      Display heading
    </UNSTABLE_DisplayHeading>
  </>
);

export default DisplayHeadingAlignment;
