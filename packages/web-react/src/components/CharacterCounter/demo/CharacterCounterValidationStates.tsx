import React from 'react';
import { ValidationStates } from '../../../constants';
import CharacterCounter from '../CharacterCounter';

const CharacterCounterValidationStates = () => (
  <>
    <CharacterCounter
      id="character-counter-demo-validation-success"
      counterThreshold={200}
      currentLength={130}
      validationState={ValidationStates.SUCCESS}
    />
    <CharacterCounter
      id="character-counter-demo-validation-warning"
      counterThreshold={200}
      currentLength={190}
      validationState={ValidationStates.WARNING}
    />
    <CharacterCounter
      id="character-counter-demo-validation-danger"
      counterThreshold={200}
      currentLength={201}
      validationState={ValidationStates.DANGER}
    />
  </>
);

export default CharacterCounterValidationStates;
