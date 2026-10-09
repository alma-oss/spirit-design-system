import React from 'react';
import Box from '../Box';

const BoxWithRadius = () => (
  <>
    <p>For demo purposes, the boxes have custom padding.</p>
    <Box padding="space-800" backgroundColor="secondary">
      Without radius
    </Box>
    <Box padding="space-800" backgroundColor="secondary" borderRadius="300">
      With custom radius
    </Box>
    <Box padding="space-800" backgroundColor="secondary" borderRadius="full">
      With full radius
    </Box>
    <Box
      padding="space-800"
      backgroundColor="secondary"
      borderRadius={{ mobile: '100', tablet: '200', desktop: '400' }}
    >
      With responsive radius
    </Box>
    <Box
      padding="space-800"
      backgroundColor="secondary"
      borderRadius={{ topStart: '0', topEnd: '0', bottomEnd: '300', bottomStart: '300' }}
    >
      With radius per corner
    </Box>
    <Box
      padding="space-800"
      backgroundColor="secondary"
      borderRadius={{ all: '300', topStart: '0', bottomEnd: { mobile: '100', tablet: '500' } }}
    >
      With radius for all corners and per-corner overrides
    </Box>
  </>
);

export default BoxWithRadius;
