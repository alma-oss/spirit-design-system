import React from 'react';
import Box from '../Box';

const BoxWithBackgroundGradient = () => (
  <>
    <p>For demo purposes, the boxes have custom padding.</p>
    <Box padding="space-800" backgroundGradient="primary">
      Primary background gradient
    </Box>
    <Box padding="space-800" backgroundGradient="secondary">
      Secondary background gradient
    </Box>
    <Box padding="space-800" backgroundGradient={{ mobile: 'primary', tablet: 'secondary' }}>
      Responsive background gradient
    </Box>
  </>
);

export default BoxWithBackgroundGradient;
