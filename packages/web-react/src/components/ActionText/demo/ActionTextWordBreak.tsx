import React from 'react';
import { TextWordBreaks } from '../../../constants';
import { ActionText } from '..';

const ActionTextWordBreak = () => (
  <div style={{ maxWidth: '12.5rem' }} className="border-100 border-dashed border-basic">
    <ActionText>Action text with no specific word break: supercalifragilisticexpialidocious</ActionText>
    <ActionText textWordBreak={TextWordBreaks.ANYWHERE}>
      Action text with long word that should break anywhere: supercalifragilisticexpialidocious
    </ActionText>
    <ActionText textWordBreak={TextWordBreaks.LONG_WORDS}>
      Action text with long word that should break at long words: supercalifragilisticexpialidocious
    </ActionText>
  </div>
);

export default ActionTextWordBreak;
