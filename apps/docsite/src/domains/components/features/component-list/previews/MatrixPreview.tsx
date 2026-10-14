'use client';

import { Matrix } from '@alma-oss/spirit-web-react';
import React from 'react';

const MatrixPreview = () => (
  <Matrix UNSAFE_style={{ width: 280 }}>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </Matrix>
);

export default MatrixPreview;
