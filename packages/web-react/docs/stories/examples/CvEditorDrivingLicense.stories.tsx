import React, { type ChangeEvent, useState } from 'react';
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
  Toast,
  ToastBar,
  ToastBarMessage,
  Toggle,
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

/**
 * Interactive CV editor driving license page. The “Simulate validation errors” toggle puts the form
 * into the state it has after a failed save — the license group in its `danger` state and the error
 * Toast — so the error design can be reviewed without filling the form in.
 */
export const CvEditorDrivingLicense = () => {
  const [hasSimulatedErrors, setHasSimulatedErrors] = useState(false);
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);

  const handleSimulateErrorsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setHasSimulatedErrors(checked);
    setIsErrorToastOpen(checked);
  };

  return (
    <>
      <Toast alignmentX="center" alignmentY="top">
        <ToastBar
          id="cv-driving-license-error-toast"
          color="danger"
          onClose={() => setIsErrorToastOpen(false)}
          hasIcon
          isDismissible
          isOpen={isErrorToastOpen}
        >
          <ToastBarMessage>Formulář se nepovedlo uložit. Zkontrolujte prosím zvýrazněná pole.</ToastBarMessage>
        </ToastBar>
      </Toast>
      <Section elementType="div" size="small" containerProps={{ size: 'small' }}>
        <Box
          backgroundColor="emotion-informative-subtle"
          borderColor="emotion-informative-basic"
          borderWidth="100"
          borderRadius="200"
          padding="space-600"
        >
          <Toggle
            id="cv-driving-license-simulate-errors"
            label="Simulate validation errors"
            isChecked={hasSimulatedErrors}
            inputPosition="start"
            onChange={handleSimulateErrorsChange}
          />
        </Box>
      </Section>
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
          noValidate
        >
          {/* TODO [DS-2774]: The design applies `shadow-100` on this card. `Box` has no `boxShadow` prop
                and there is no shadow utility class in `web`, so the shadow is intentionally omitted here. */}
          <Box backgroundColor="primary" borderColor="basic" borderRadius="400" borderWidth="100" padding="space-900">
            <FieldGroup
              id="cv-driving-license-groups"
              label="Skupiny řidičského průkazu"
              isLabelHidden
              {...(hasSimulatedErrors && {
                validationState: 'danger',
                validationText: 'Vyberte alespoň jednu skupinu řidičského průkazu.',
              })}
            >
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
};
