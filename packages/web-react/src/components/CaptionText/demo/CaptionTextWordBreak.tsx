import React from 'react';
import { TextWordBreaks } from '../../../constants';
import { CaptionText } from '..';

const CaptionTextWordBreak = () => (
  <div style={{ maxWidth: '12.5rem' }} className="border-100 border-dashed border-basic">
    <CaptionText elementType="p">
      Caption text with no specific word break: supercalifragilisticexpialidocious
    </CaptionText>
    <CaptionText elementType="p" textWordBreak={TextWordBreaks.ANYWHERE}>
      Caption text with long word that should break anywhere: supercalifragilisticexpialidocious
    </CaptionText>
    <CaptionText elementType="p" textWordBreak={TextWordBreaks.LONG_WORDS}>
      Caption text with long word that should break at long words: supercalifragilisticexpialidocious
    </CaptionText>
  </div>
);

export default CaptionTextWordBreak;
