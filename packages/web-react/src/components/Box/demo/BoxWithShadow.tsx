import React from 'react';
import { type BoxShadowTokenType } from '../../../types';
import { Grid } from '../../Grid';
import Box from '../Box';

const SHADOW_LEVELS: BoxShadowTokenType[] = ['100', '200', '300', '400'];

const BoxWithShadow = () => (
  <>
    <p>For demo purposes, the boxes have custom padding.</p>
    <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }} spacing="space-1000">
      {SHADOW_LEVELS.map((level) => (
        <Box key={level} padding="space-800" backgroundColor="primary" boxShadow={level}>
          With shadow {level}
        </Box>
      ))}
    </Grid>
  </>
);

export default BoxWithShadow;
