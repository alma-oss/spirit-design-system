'use client';

import { Flex } from '@alma-oss/spirit-web-react';
import React from 'react';

const itemStyle = {
  padding: '8px 16px',
  background: '#e6e6ec',
  borderRadius: '4px',
  fontSize: '14px',
};

const FlexPreview = () => (
  <Flex direction="horizontal" isWrapping={false} UNSAFE_style={{ width: 240 }}>
    <div style={itemStyle}>Item 1</div>
    <div style={itemStyle}>Item 2</div>
    <div style={itemStyle}>Item 3</div>
  </Flex>
);

export default FlexPreview;
