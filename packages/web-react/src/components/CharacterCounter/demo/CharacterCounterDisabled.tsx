import React from 'react';
import CharacterCounter from '../CharacterCounter';

const CharacterCounterDisabled = () => (
  <CharacterCounter id="character-counter-demo-disabled-only" counterThreshold={200} currentLength={8} isDisabled />
);

export default CharacterCounterDisabled;
