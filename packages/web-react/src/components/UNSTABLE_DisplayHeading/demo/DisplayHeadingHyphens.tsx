import React from 'react';
import { TextHyphens } from '../../../constants';
import { Box } from '../../Box';
import { UNSTABLE_DisplayHeading } from '..';

const DisplayHeadingHyphens = () => (
  <Box borderWidth="100" borderStyle="dashed" UNSAFE_style={{ maxWidth: '12.5rem' }}>
    <UNSTABLE_DisplayHeading elementType="h2" size="small">
      Display heading with no specific hyphenation: supercalifragilisticexpialidocious
    </UNSTABLE_DisplayHeading>
    <UNSTABLE_DisplayHeading elementType="h2" size="small" textHyphens={TextHyphens.NONE}>
      Display heading with no hyphens: supercalifragilisticexpialidocious
    </UNSTABLE_DisplayHeading>
    <UNSTABLE_DisplayHeading elementType="h2" size="small" textHyphens={TextHyphens.MANUAL}>
      Display heading with manual hyphens: super&shy;califragilisticexpialidocious
    </UNSTABLE_DisplayHeading>
  </Box>
);

export default DisplayHeadingHyphens;
