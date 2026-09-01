import React from 'react';
import {
  ActionGroup,
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  FieldGroup,
  Grid,
  GridItem,
  Heading,
  Section,
  Stack,
} from '../../../src/components';

const LICENSE_GROUPS = [
  { id: 'a', label: 'Skupina A' },
  { id: 'b', label: 'Skupina B' },
  { id: 'c', label: 'Skupina C' },
  { id: 'd', label: 'Skupina D' },
  { id: 'e', label: 'Skupina E' },
  { id: 't', label: 'Skupina T' },
  { id: 'active-driver', label: 'Aktivní řidič' },
] as const;

export default {
  title: 'Examples/Pages',
  parameters: { layout: 'fullscreen' },
};

export const CvEditorDrivingLicense = () => (
  <>
    <Section
      elementType="div"
      size="small"
      backgroundColor="secondary"
      containerProps={{ size: 'small' }}
      paddingBottom={{ mobile: 'space-0', tablet: 'space-0' }}
    >
      <Stack spacing="space-1000">
        <Breadcrumbs
          goBackTitle="Zpět"
          items={[{ title: 'Můj Jobs.cz', url: '#' }, { title: 'Životopis', url: '#' }, { title: 'Řidičský průkaz' }]}
        />
        <Heading
          id="cv-driving-license-heading"
          elementType="h1"
          size="small"
          fontWeight="semibold"
          marginBottom="space-0"
        >
          Řidičský průkaz
        </Heading>
      </Stack>
    </Section>
    <Section elementType="div" size="small" backgroundColor="secondary" containerProps={{ size: 'small' }}>
      <Stack
        elementType="form"
        onSubmit={(event) => event.preventDefault()}
        aria-labelledby="cv-driving-license-heading"
        spacing="space-1000"
      >
        {/* TODO [DS-2774]: The design applies `shadow-100` on this card. `Box` has no `boxShadow` prop
              and there is no shadow utility class in `web`, so the shadow is intentionally omitted here. */}
        <Box backgroundColor="primary" borderColor="basic" borderRadius="400" borderWidth="100" padding="space-900">
          <FieldGroup id="cv-driving-license-groups" label="Skupiny řidičského průkazu" isLabelHidden>
            <Grid cols={{ mobile: 1, tablet: 3 }} spacing="space-500">
              {LICENSE_GROUPS.map(({ id, label }) => (
                <GridItem key={id}>
                  <Checkbox id={`cv-driving-license-${id}`} name="drivingLicense" value={id} label={label} />
                </GridItem>
              ))}
            </Grid>
          </FieldGroup>
        </Box>
        <ActionGroup
          direction={{ mobile: 'vertical', tablet: 'horizontal-reversed' }}
          alignmentX={{ mobile: 'stretch', tablet: 'left' }}
          spacing="space-600"
        >
          <Button type="submit">Uložit</Button>
          <Button color="secondary">Zrušit</Button>
        </ActionGroup>
      </Stack>
    </Section>
  </>
);
