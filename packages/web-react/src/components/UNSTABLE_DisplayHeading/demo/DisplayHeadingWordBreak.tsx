import React from 'react';
import { TextWordBreaks } from '../../../constants';
import { Box } from '../../Box';
import { UNSTABLE_DisplayHeading } from '..';

const DisplayHeadingWordBreak = () => (
  <Box borderWidth="100" borderStyle="dashed" UNSAFE_style={{ maxWidth: '12.5rem' }}>
    <UNSTABLE_DisplayHeading elementType="h2" size="small">
      Display heading with no specific word break: supercalifragilisticexpialidocious
    </UNSTABLE_DisplayHeading>
    <UNSTABLE_DisplayHeading elementType="h2" size="small" textWordBreak={TextWordBreaks.ANYWHERE}>
      Display heading with long word that should break anywhere: supercalifragilisticexpialidocious
    </UNSTABLE_DisplayHeading>
    <UNSTABLE_DisplayHeading elementType="h2" size="small" textWordBreak={TextWordBreaks.LONG_WORDS}>
      Display heading with long word that should break at long words: supercalifragilisticexpialidocious
    </UNSTABLE_DisplayHeading>
  </Box>
);

export default DisplayHeadingWordBreak;
