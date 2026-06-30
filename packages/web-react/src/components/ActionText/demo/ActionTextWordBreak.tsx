import React from 'react';
import { TextWordBreaks } from '../../../constants';
import { Box } from '../../Box';
import { ActionText } from '..';

const ActionTextWordBreak = () => (
  <Box borderWidth="100" borderStyle="dashed" UNSAFE_style={{ maxWidth: '12.5rem' }}>
    <ActionText elementType="p">Action text with no specific word break: supercalifragilisticexpialidocious</ActionText>
    <ActionText elementType="p" textWordBreak={TextWordBreaks.ANYWHERE}>
      Action text with long word that should break anywhere: supercalifragilisticexpialidocious
    </ActionText>
    <ActionText elementType="p" textWordBreak={TextWordBreaks.LONG_WORDS}>
      Action text with long word that should break at long words: supercalifragilisticexpialidocious
    </ActionText>
  </Box>
);

export default ActionTextWordBreak;
