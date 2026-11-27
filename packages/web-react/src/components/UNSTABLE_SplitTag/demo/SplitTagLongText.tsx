import React from 'react';
import { TextHyphens, TextWordBreaks } from '../../../constants';
import { Box } from '../../Box';
import { Stack } from '../../Stack';
import SplitTagLocationRadius from './SplitTagLocationRadius';

const SplitTagLongText = () => (
  <Box UNSAFE_style={{ maxWidth: '18rem' }}>
    <Stack spacing="space-600">
      <SplitTagLocationRadius
        id="split-tag-long-multi-word"
        label="Horní Rokytnice, Rokytnice nad Jizerou"
        textHyphens={TextHyphens.NONE}
        textWordBreak={TextWordBreaks.LONG_WORDS}
      />
      <SplitTagLocationRadius
        id="split-tag-long-single-word"
        label="longtextwithoutspaceslongtextwithoutspaceslongtextwithoutspaces"
        textHyphens={TextHyphens.NONE}
        textWordBreak={TextWordBreaks.LONG_WORDS}
      />
    </Stack>
  </Box>
);

export default SplitTagLongText;
