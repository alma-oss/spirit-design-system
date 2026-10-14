'use client';

import { CharacterCounter } from '@alma-oss/spirit-web-react';
import React from 'react';

const CharacterCounterPreview = () => (
  <CharacterCounter counterThreshold={200} currentLength={0} id="card-character-counter" />
);

export default CharacterCounterPreview;
