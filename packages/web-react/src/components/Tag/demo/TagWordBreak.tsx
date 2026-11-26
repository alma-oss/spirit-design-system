'use client';

import React from 'react';
import { TextWordBreaks } from '../../../constants';
import { Box } from '../../Box';
import { Tag } from '..';

const LONG_TEXT_WITHOUT_SPACES = 'longtextwithoutspaceslongtextwithoutspaceslongtextwithoutspaces';

const TagWordBreak = () => (
  <Box borderWidth="100" borderStyle="dashed" UNSAFE_style={{ maxWidth: '16rem' }}>
    <p>
      <Tag>Tag with no specific word break: {LONG_TEXT_WITHOUT_SPACES}</Tag>
    </p>
    <p>
      <Tag textWordBreak={TextWordBreaks.ANYWHERE}>
        Tag with long word that should break anywhere: {LONG_TEXT_WITHOUT_SPACES}
      </Tag>
    </p>
    <p>
      <Tag textWordBreak={TextWordBreaks.LONG_WORDS}>
        Tag with long word that should break at long words: {LONG_TEXT_WITHOUT_SPACES}
      </Tag>
    </p>
  </Box>
);

export default TagWordBreak;
