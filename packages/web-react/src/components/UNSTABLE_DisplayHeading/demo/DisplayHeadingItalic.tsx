import React from 'react';
import { UNSTABLE_DisplayHeading } from '..';

const DisplayHeadingItalic = () => (
  <>
    <UNSTABLE_DisplayHeading elementType="h2">Display heading</UNSTABLE_DisplayHeading>
    <UNSTABLE_DisplayHeading elementType="h2" isItalic>
      Display heading italic
    </UNSTABLE_DisplayHeading>
  </>
);

export default DisplayHeadingItalic;
