import React from 'react';
import { TextWordBreaks } from '../../../constants';
import { Box } from '../../Box';
import { UNSTABLE_EyebrowText } from '..';

const EyebrowTextWordBreak = () => (
  <Box borderWidth="100" borderStyle="dashed" UNSAFE_style={{ maxWidth: '12.5rem' }}>
    <UNSTABLE_EyebrowText>
      EyebrowText with no specific word break: supercalifragilisticexpialidocious
    </UNSTABLE_EyebrowText>
    <UNSTABLE_EyebrowText textWordBreak={TextWordBreaks.ANYWHERE}>
      EyebrowText with long word that should break anywhere: supercalifragilisticexpialidocious
    </UNSTABLE_EyebrowText>
    <UNSTABLE_EyebrowText textWordBreak={TextWordBreaks.LONG_WORDS}>
      EyebrowText with long word that should break at long words: supercalifragilisticexpialidocious
    </UNSTABLE_EyebrowText>
  </Box>
);

export default EyebrowTextWordBreak;
