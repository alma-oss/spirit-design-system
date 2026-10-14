'use client';

import { TextArea } from '@alma-oss/spirit-web-react';
import React from 'react';

const TextAreaPreview = () => (
  <TextArea id="card-text-area" label="Label" isLabelHidden placeholder="Placeholder" UNSAFE_style={{ width: 280 }} />
);

export default TextAreaPreview;
