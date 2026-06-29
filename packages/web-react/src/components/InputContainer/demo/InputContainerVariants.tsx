import React from 'react';
import DocsStack from '../../../../docs/DocsStack';
import { FillVariants } from '../../../constants';
import { Box } from '../../Box';
import { Grid } from '../../Grid';
import { Label } from '../../Label';
import { Stack } from '../../Stack';
import InputContainer from '../InputContainer';

type BackgroundVariant = {
  id: string;
  label: string;
  backgroundColor: 'primary' | 'secondary' | 'tertiary';
  theme?: 'theme-light-on-brand';
};

const BACKGROUND_VARIANTS: BackgroundVariant[] = [
  { id: 'bg-primary', label: 'On Default Theme With Primary Background', backgroundColor: 'primary' },
  { id: 'bg-secondary', label: 'On Default Theme With Secondary Background', backgroundColor: 'secondary' },
  { id: 'bg-tertiary', label: 'On Default Theme With Tertiary Background', backgroundColor: 'tertiary' },
  {
    id: 'theme-light-on-brand-bg-primary',
    label: 'On Light On Brand Theme With Primary Background',
    backgroundColor: 'primary',
    theme: 'theme-light-on-brand',
  },
];

const InputContainerVariants = () => (
  <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }}>
    {BACKGROUND_VARIANTS.map(({ id, label, backgroundColor, theme }) => (
      <Box key={id} backgroundColor={backgroundColor} padding="space-800" textColor="primary" theme={theme}>
        <DocsStack>
          <h3>{label}</h3>

          <Stack spacing="space-400">
            <Label htmlFor={`input-container-variant-fill-${id}`}>Fill (default)</Label>
            <InputContainer>
              <input
                type="text"
                id={`input-container-variant-fill-${id}`}
                name={`variantFill-${id}`}
                placeholder="Placeholder"
              />
            </InputContainer>
          </Stack>

          <Stack spacing="space-400">
            <Label htmlFor={`input-container-variant-outline-${id}`}>Outline</Label>
            <InputContainer variant={FillVariants.OUTLINE}>
              <input
                type="text"
                id={`input-container-variant-outline-${id}`}
                name={`variantOutline-${id}`}
                placeholder="Placeholder"
              />
            </InputContainer>
          </Stack>
        </DocsStack>
      </Box>
    ))}
  </Grid>
);

export default InputContainerVariants;
