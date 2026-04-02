import React from 'react';
import DocsStack from '../../../../docs/DocsStack';
import { Grid } from '../../Grid';
import Box from '../Box';

const BoxWithColorScheme = () => (
  <>
    <p>For demo purposes, the boxes have custom padding.</p>
    <Grid cols={{ desktop: 3, tablet: 1, mobile: 1 }}>
      <div>
        <DocsStack stackAlignment="start">
          <h3>Neutral and selected</h3>
          <Box padding="space-800" colorScheme="neutral-basic">
            neutral-basic surface
          </Box>
          <Box padding="space-800" colorScheme="neutral-subtle">
            neutral-subtle surface
          </Box>
          <Box padding="space-800" colorScheme="selected-basic">
            selected-basic surface
          </Box>
          <Box padding="space-800" colorScheme="selected-subtle">
            selected-subtle surface
          </Box>
        </DocsStack>
      </div>
      <div>
        <DocsStack stackAlignment="start">
          <h3>Emotion colors</h3>
          <Box padding="space-800" colorScheme="emotion-success-basic">
            emotion-success-basic surface
          </Box>
          <Box padding="space-800" colorScheme="emotion-warning-subtle">
            emotion-warning-subtle surface
          </Box>
          <Box padding="space-800" colorScheme="emotion-danger-basic">
            emotion-danger-basic surface
          </Box>
          <Box padding="space-800" colorScheme="emotion-informative-subtle">
            emotion-informative-subtle surface
          </Box>
        </DocsStack>
      </div>
      <div>
        <DocsStack stackAlignment="start">
          <h3>Accent colors</h3>
          <Box padding="space-800" colorScheme="accent-01-basic">
            accent-01-basic surface
          </Box>
          <Box padding="space-800" colorScheme="accent-01-subtle">
            accent-01-subtle surface
          </Box>
          <Box padding="space-800" colorScheme="accent-02-basic">
            accent-02-basic surface
          </Box>
          <Box padding="space-800" colorScheme="accent-02-subtle">
            accent-02-subtle surface
          </Box>
        </DocsStack>
      </div>
    </Grid>
    <Grid cols={{ desktop: 1, tablet: 1, mobile: 1 }}>
      <div>
        <DocsStack stackAlignment="start">
          <h3>Disabled</h3>
          <Box padding="space-800" colorScheme="disabled">
            disabled surface
          </Box>
        </DocsStack>
      </div>
    </Grid>
    <Grid cols={{ desktop: 1, tablet: 1, mobile: 1 }}>
      <div>
        <DocsStack stackAlignment="start">
          <h3>With border</h3>
          <Box padding="space-800" colorScheme="emotion-success-basic" borderWidth="100" borderStyle="solid">
            Border uses scheme color
          </Box>
        </DocsStack>
      </div>
    </Grid>
  </>
);

export default BoxWithColorScheme;
