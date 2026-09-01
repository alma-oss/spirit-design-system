import React, { useState } from 'react';
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
  Select,
  Stack,
  Text,
  TextArea,
  TextField,
} from '../../../src/components';

const MONTHS = [
  { value: '1', label: 'Leden' },
  { value: '2', label: 'Únor' },
  { value: '3', label: 'Březen' },
  { value: '4', label: 'Duben' },
  { value: '5', label: 'Květen' },
  { value: '6', label: 'Červen' },
  { value: '7', label: 'Červenec' },
  { value: '8', label: 'Srpen' },
  { value: '9', label: 'Září' },
  { value: '10', label: 'Říjen' },
  { value: '11', label: 'Listopad' },
  { value: '12', label: 'Prosinec' },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1949 }, (_, index) => String(CURRENT_YEAR - index));

const PROFESSIONAL_FIELDS = [
  { value: '1', label: 'Administrativa' },
  { value: '2', label: 'Doprava a logistika' },
  { value: '3', label: 'IT a telekomunikace' },
  { value: '4', label: 'Marketing a PR' },
  { value: '5', label: 'Obchod a prodej' },
  { value: '6', label: 'Stavebnictví' },
  { value: '7', label: 'Strojírenství' },
  { value: '8', label: 'Vzdělávání' },
  { value: '9', label: 'Zdravotnictví' },
];

const DateSelects = ({
  idPrefix,
  namePrefix,
  isDisabled = false,
}: {
  idPrefix: string;
  namePrefix: string;
  isDisabled?: boolean;
}) => (
  <Grid cols={2} spacing="space-700">
    <GridItem>
      <Select id={`${idPrefix}-month`} name={`${namePrefix}Month`} label="Měsíc" isLabelHidden isDisabled={isDisabled}>
        <option value="">Měsíc</option>
        {MONTHS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </GridItem>
    <GridItem>
      <Select id={`${idPrefix}-year`} name={`${namePrefix}Year`} label="Rok" isLabelHidden isDisabled={isDisabled}>
        <option value="">Rok</option>
        {YEARS.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
    </GridItem>
  </Grid>
);

export default {
  title: 'Examples/Pages',
  parameters: { layout: 'fullscreen' },
};

export const CvEditorWorkExperience = () => {
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

  return (
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
            items={[
              { title: 'Můj Jobs.cz', url: '#' },
              { title: 'Životopis', url: '#' },
              { title: 'Pracovní zkušenosti' },
            ]}
          />
          <Stack spacing="space-400">
            <Heading
              id="cv-work-experience-heading"
              elementType="h1"
              size="small"
              fontWeight="semibold"
              marginBottom="space-0"
            >
              Pracovní zkušenosti
            </Heading>
            <Text textColor="secondary" size="small" marginBottom="space-0">
              Popište své profesní zkušenosti v bodech nebo krátkých odstavcích.
            </Text>
          </Stack>
        </Stack>
      </Section>
      <Section elementType="div" size="small" backgroundColor="secondary" containerProps={{ size: 'small' }}>
        <Stack
          elementType="form"
          onSubmit={(event) => event.preventDefault()}
          aria-labelledby="cv-work-experience-heading"
          spacing="space-1000"
        >
          {/* TODO [DS-2774]: The design applies `shadow-100` on this card. `Box` has no `boxShadow` prop
                and there is no shadow utility class in `web`, so the shadow is intentionally omitted here. */}
          <Box backgroundColor="primary" borderColor="basic" borderRadius="400" borderWidth="100" padding="space-900">
            {/* TODO [DS-2775]: Form fields render an internal `Stack` (`display: grid`). As a direct `Grid`
                  child they get vertically stretched to match the tallest sibling. Each field must be wrapped
                  in `GridItem` to contain the stretch. */}
            <Grid cols={{ mobile: 1, tablet: 2 }} spacing={{ mobile: 'space-700', tablet: 'space-900' }}>
              <GridItem>
                <TextField
                  id="work-experience-job-title"
                  name="jobTitle"
                  label="Název pracovní pozice"
                  autoComplete="organization-title"
                  isRequired
                />
              </GridItem>
              <GridItem>
                <TextField
                  id="work-experience-company"
                  name="company"
                  label="Firma, instituce"
                  autoComplete="organization"
                  isRequired
                />
              </GridItem>
              <GridItem>
                <Select id="work-experience-field" name="professionalField" label="Profesní obor" isRequired>
                  <option value="">Vyberte</option>
                  {PROFESSIONAL_FIELDS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </GridItem>
              <GridItem columnStart={1} columnEnd={{ mobile: 'span 1', tablet: 'span 2' }}>
                <FieldGroup id="work-experience-employment-period" label="Datum nástupu a ukončení" isLabelHidden>
                  <Grid cols={{ mobile: 1, tablet: 2 }} spacing={{ mobile: 'space-700', tablet: 'space-900' }}>
                    <GridItem>
                      <FieldGroup id="work-experience-start-date" label="Datum nástupu">
                        <DateSelects idPrefix="work-experience-start" namePrefix="start" />
                      </FieldGroup>
                    </GridItem>
                    {/* The checkbox comes before the end date in the DOM, so the form reads
                          “start date → still working here? → end date”. `rowStart` is local to this
                          nested grid, so the visual order stays dates side by side, checkbox below. */}
                    <GridItem
                      columnStart={1}
                      columnEnd={{ mobile: 'span 1', tablet: 'span 2' }}
                      rowStart={{ mobile: 3, tablet: 2 }}
                    >
                      <Checkbox
                        id="work-experience-currently-working"
                        name="currentlyWorking"
                        label="Stále zde pracuji"
                        isChecked={isCurrentlyWorking}
                        aria-controls="work-experience-end-month work-experience-end-year"
                        onChange={() => setIsCurrentlyWorking(!isCurrentlyWorking)}
                      />
                    </GridItem>
                    <GridItem columnStart={{ mobile: 1, tablet: 2 }} rowStart={{ mobile: 2, tablet: 1 }}>
                      <FieldGroup id="work-experience-end-date" label="Datum ukončení" isDisabled={isCurrentlyWorking}>
                        <DateSelects idPrefix="work-experience-end" namePrefix="end" isDisabled={isCurrentlyWorking} />
                      </FieldGroup>
                    </GridItem>
                  </Grid>
                </FieldGroup>
              </GridItem>
              <GridItem columnEnd={{ mobile: 'span 1', tablet: 'span 2' }}>
                <TextArea
                  id="work-experience-description"
                  name="description"
                  label="Vaše pracovní zkušenosti"
                  placeholder="Co bylo hlavní náplní vaší práce?"
                  counterThreshold={5000}
                  isAutoResizing
                />
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
        </Stack>
      </Section>
    </>
  );
};
