import React from 'react';
import { TextHyphens } from '../../../constants';
import { ActionText } from '..';

const ActionTextHyphens = () => (
  <div style={{ maxWidth: '12.5rem' }} className="border-100 border-dashed border-basic">
    <ActionText>Action text with no specific hyphenation: supercalifragilisticexpialidocious</ActionText>
    <ActionText textHyphens={TextHyphens.NONE}>
      Action text with no hyphens: supercalifragilisticexpialidocious
    </ActionText>
    <ActionText textHyphens={TextHyphens.MANUAL}>
      Action text with manual hyphens: super&shy;califragilisticexpialidocious
    </ActionText>
  </div>
);

export default ActionTextHyphens;
