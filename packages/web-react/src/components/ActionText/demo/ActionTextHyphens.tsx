import React from 'react';
import { TextHyphens } from '../../../constants';
import { Box } from '../../Box';
import { ActionText } from '..';

const ActionTextHyphens = () => (
  <Box borderWidth="100" borderStyle="dashed" UNSAFE_style={{ maxWidth: '12.5rem' }}>
    <ActionText elementType="p">
      Action text with no specific hyphenation: supercalifragilisticexpialidocious
    </ActionText>
    <ActionText elementType="p" textHyphens={TextHyphens.NONE}>
      Action text with no hyphens: supercalifragilisticexpialidocious
    </ActionText>
    <ActionText elementType="p" textHyphens={TextHyphens.MANUAL}>
      Action text with manual hyphens: super&shy;califragilisticexpialidocious
    </ActionText>
  </Box>
);

export default ActionTextHyphens;
