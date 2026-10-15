import React from 'react';
import { TextHyphens } from '../../../constants';
import { Box } from '../../Box';
import { UNSTABLE_EyebrowText } from '..';

const EyebrowTextHyphens = () => (
  <Box borderWidth="100" borderStyle="dashed" UNSAFE_style={{ maxWidth: '12.5rem' }}>
    <UNSTABLE_EyebrowText>
      EyebrowText with no specific hyphenation: supercalifragilisticexpialidocious
    </UNSTABLE_EyebrowText>
    <UNSTABLE_EyebrowText textHyphens={TextHyphens.NONE}>
      EyebrowText with no hyphens: supercalifragilisticexpialidocious
    </UNSTABLE_EyebrowText>
    <UNSTABLE_EyebrowText textHyphens={TextHyphens.MANUAL}>
      EyebrowText with manual hyphens: super&shy;califragilisticexpialidocious
    </UNSTABLE_EyebrowText>
  </Box>
);

export default EyebrowTextHyphens;
