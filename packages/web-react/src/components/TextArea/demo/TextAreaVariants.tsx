import React from 'react';
import DocsStack from '../../../../docs/DocsStack';
import { FillVariants } from '../../../constants';
import { Box } from '../../Box';
import { Grid } from '../../Grid';
import TextArea from '../TextArea';

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

const TextAreaVariants = () => (
  <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }}>
    {BACKGROUND_VARIANTS.map(({ id, label, backgroundColor, theme }) => (
      <Box key={id} backgroundColor={backgroundColor} padding="space-800" textColor="primary" theme={theme}>
        <DocsStack>
          <h3>{label}</h3>

          <TextArea
            id={`textarea-variant-fill-${id}`}
            label="Fill (default)"
            name={`textareaVariantFill-${id}`}
            placeholder="Placeholder"
          />

          <TextArea
            id={`textarea-variant-outline-${id}`}
            label="Outline"
            name={`textareaVariantOutline-${id}`}
            placeholder="Placeholder"
            variant={FillVariants.OUTLINE}
          />
        </DocsStack>
      </Box>
    ))}
  </Grid>
);

export default TextAreaVariants;
