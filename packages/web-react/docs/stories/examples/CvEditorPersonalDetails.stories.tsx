import React, { useState } from 'react';
import {
  ActionGroup,
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Grid,
  GridItem,
  Heading,
  Section,
  Stack,
  TextField,
} from '../../../src/components';

export default {
  title: 'Examples/Pages',
  parameters: { layout: 'fullscreen' },
};

export const CvEditorPersonalDetails = () => {
  const [showTitle, setShowTitle] = useState(false);

  return (
    <>
      <Section elementType="div" backgroundColor="secondary" containerProps={{ size: 'small' }} paddingTop="space-1000">
        <Stack spacing="space-1000">
          <Breadcrumbs
            goBackTitle="Zpět"
            items={[{ title: 'Můj Jobs.cz', url: '#' }, { title: 'Životopis', url: '#' }, { title: 'Osobní údaje' }]}
          />
          <Heading
            id="cv-personal-details-heading"
            elementType="h1"
            size="small"
            fontWeight="semibold"
            marginBottom="space-0"
          >
            Osobní údaje
          </Heading>
        </Stack>
      </Section>
      <Section elementType="div" size="small" backgroundColor="secondary" containerProps={{ size: 'small' }}>
        <Stack spacing="space-1000">
          <form aria-labelledby="cv-personal-details-heading" method="post" action="#">
            <Box
              backgroundColor="primary"
              borderColor="basic"
              borderRadius="400"
              borderWidth="100"
              padding="space-900"
              marginBottom={{ mobile: 'space-900', tablet: 'space-1000' }}
            >
              <Grid cols={{ mobile: 1, tablet: 2 }} spacing={{ mobile: 'space-700', tablet: 'space-900' }}>
                <GridItem>
                  <TextField id="personal-details-first-name" label="Jméno" autoComplete="given-name" isRequired />
                </GridItem>
                <GridItem>
                  <TextField id="personal-details-last-name" label="Příjmení" autoComplete="family-name" isRequired />
                </GridItem>
                <GridItem columnEnd={{ mobile: 'span 1', tablet: 'span 2' }}>
                  <Checkbox
                    id="personal-details-show-title"
                    name="showTitle"
                    label="Uvádět titul u jména"
                    aria-expanded={showTitle}
                    {...(showTitle && {
                      'aria-controls': 'personal-details-title-before personal-details-title-after',
                    })}
                    isChecked={showTitle}
                    onChange={() => setShowTitle(!showTitle)}
                  />
                </GridItem>
                {showTitle && (
                  <>
                    <GridItem>
                      <TextField
                        id="personal-details-title-before"
                        label="Titul před jménem"
                        autoComplete="honorific-prefix"
                      />
                    </GridItem>
                    <GridItem>
                      <TextField
                        id="personal-details-title-after"
                        label="Titul za jménem"
                        autoComplete="honorific-suffix"
                      />
                    </GridItem>
                  </>
                )}
                <GridItem>
                  <TextField id="personal-details-email" label="E-mail" type="email" autoComplete="email" isRequired />
                </GridItem>
                <GridItem>
                  <TextField
                    id="personal-details-phone"
                    label="Telefon"
                    type="tel"
                    autoComplete="tel"
                    helperText="Číslo zadejte včetně předvolby (např. +420111222333)"
                  />
                </GridItem>
                <GridItem>
                  <TextField id="personal-details-city" label="Město / Obec" autoComplete="address-level2" />
                </GridItem>
              </Grid>
            </Box>
            <ActionGroup
              direction={{ mobile: 'vertical', tablet: 'horizontal-reversed' }}
              alignmentX={{ mobile: 'stretch', tablet: 'left' }}
              spacing="space-600"
            >
              <Button type="submit">Uložit</Button>
              <Button color="secondary">Zrušit</Button>
            </ActionGroup>
          </form>
        </Stack>
      </Section>
    </>
  );
};
