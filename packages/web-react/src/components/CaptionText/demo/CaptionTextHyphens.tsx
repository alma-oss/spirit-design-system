import React from 'react';
import { TextHyphens } from '../../../constants';
import { CaptionText } from '..';

const CaptionTextHyphens = () => (
  <div style={{ maxWidth: '12.5rem' }} className="border-100 border-dashed border-basic">
    <CaptionText elementType="p">
      Caption text with no specific hyphenation: supercalifragilisticexpialidocious
    </CaptionText>
    <CaptionText elementType="p" textHyphens={TextHyphens.NONE}>
      Caption text with no hyphens: supercalifragilisticexpialidocious
    </CaptionText>
    <CaptionText elementType="p" textHyphens={TextHyphens.MANUAL}>
      Caption text with manual hyphens: super&shy;califragilisticexpialidocious
    </CaptionText>
  </div>
);

export default CaptionTextHyphens;
