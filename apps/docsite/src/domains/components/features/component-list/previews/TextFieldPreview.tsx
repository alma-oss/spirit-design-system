'use client';

import { Icon, InputAddon, TextField } from '@alma-oss/spirit-web-react';
import React from 'react';

const TextFieldPreview = () => (
  <TextField
    id="card-text-field"
    label="Search"
    isLabelHidden
    placeholder="Placeholder"
    startAddon={
      <InputAddon elementType="label" htmlFor="card-text-field">
        <Icon name="search" boxSize={20} />
      </InputAddon>
    }
    UNSAFE_style={{ width: 280 }}
  />
);

export default TextFieldPreview;
