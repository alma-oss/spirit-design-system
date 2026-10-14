'use client';

import { InputContainer } from '@alma-oss/spirit-web-react';
import React from 'react';

const InputContainerPreview = () => (
  <div style={{ width: 260 }}>
    <InputContainer>
      <input
        type="text"
        id="card-input-container"
        name="cardInputContainer"
        placeholder="Placeholder"
        aria-label="Input"
      />
    </InputContainer>
  </div>
);

export default InputContainerPreview;
