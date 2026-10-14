'use client';

import { Grid } from '@alma-oss/spirit-web-react';
import React from 'react';

const cellStyle = {
  padding: '8px 16px',
  background: '#e6e6ec',
  borderRadius: '4px',
  fontSize: '14px',
};

const GridPreview = () => (
  <Grid cols={3} UNSAFE_style={{ width: 240 }}>
    {['1', '2', '3', '4', '5', '6'].map((cell) => (
      <div key={cell} style={cellStyle}>
        {cell}
      </div>
    ))}
  </Grid>
);

export default GridPreview;
