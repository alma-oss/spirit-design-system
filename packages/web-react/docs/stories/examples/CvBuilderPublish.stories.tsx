import React, { useMemo, useState } from 'react';
import {
  ActionGroup,
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  FieldGroup,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  InputAddon,
  Label,
  Radio,
  Section,
  Select,
  Slider,
  Stack,
  StackItem,
  Text,
  TextField,
  Tooltip,
  TooltipPopover,
  TooltipTrigger,
  UNSTABLE_Combobox,
  UNSTABLE_ComboboxOption,
  VisuallyHidden,
} from '../../../src/components';
import { useToggle } from '../../../src/hooks';

export default {
  title: 'Examples/Pages',
  parameters: { layout: 'fullscreen' },
};

type SalaryType = 'unspecified' | 'specific';
type StartDateType = 'unspecified' | 'immediately' | 'after-notice' | 'specific';

const SALARY_MIN = 0;
const SALARY_MAX = 200000;
const SALARY_STEP = 5000;

const formatSalary = (n: number) => Math.round(n).toString();

const parseSalary = (s: string) => {
  const digits = s.replace(/\D/g, '');

  return digits === '' ? 0 : Math.min(parseInt(digits, 10), SALARY_MAX);
};

const JOB_OPTIONS = [
  { id: 'developer', label: 'Vývojář' },
  { id: 'designer', label: 'Designer' },
  { id: 'manager', label: 'Manažer' },
  { id: 'analyst', label: 'Analytik' },
  { id: 'tester', label: 'Tester' },
];

const LOCATION_OPTIONS = [
  { id: 'prague', label: 'Praha' },
  { id: 'brno', label: 'Brno' },
  { id: 'ostrava', label: 'Ostrava' },
  { id: 'jihlava', label: 'Jihlava' },
  { id: 'liberec', label: 'Liberec' },
];

export const CvBuilderPublish = () => {
  const [salaryType, setSalaryType] = useState<SalaryType>('unspecified');
  const [startDateType, setStartDateType] = useState<StartDateType>('unspecified');
  const [salaryValue, setSalaryValue] = useState(50000);
  const [isHideTooltipOpen, setIsHideTooltipOpen] = useState(false);

  const [isJobOpen, onJobToggle] = useToggle(false);
  const [jobSelectedKeys, setJobSelectedKeys] = useState<string[]>([]);
  const [jobInputValue, setJobInputValue] = useState('');

  const [isLocationOpen, onLocationToggle] = useToggle(false);
  const [locationSelectedKeys, setLocationSelectedKeys] = useState<string[]>([]);
  const [locationInputValue, setLocationInputValue] = useState('');

  const filteredJobOptions = useMemo(() => {
    const query = jobInputValue.trim().toLowerCase();

    return JOB_OPTIONS.filter((option) => option.label.toLowerCase().includes(query));
  }, [jobInputValue]);

  const filteredLocationOptions = useMemo(() => {
    const query = locationInputValue.trim().toLowerCase();

    return LOCATION_OPTIONS.filter((option) => option.label.toLowerCase().includes(query));
  }, [locationInputValue]);

  return (
    <>
      <Section elementType="div" containerProps={{ size: 'large' }} paddingTop="space-1000">
        <Stack spacing="space-1000">
          <Breadcrumbs
            goBackTitle="Zpět"
            items={[
              { title: 'Můj Jobs.cz', url: '#' },
              { title: 'Životopis', url: '#' },
              { title: 'Vystavit životopis' },
            ]}
          />
          <Heading id="publish-cv-heading" elementType="h1" size="large" fontWeight="semibold" marginBottom="space-0">
            Jakým firmám se má váš životopis zobrazovat
          </Heading>
          <Text marginBottom="space-0">
            Zadejte obor, ve kterém chcete pracovat, lokalitu, úvazek a mzdu. Můžete si také nastavit, které firmy váš
            životopis vidět nemají.
          </Text>
        </Stack>
      </Section>
      <Section elementType="div" size="small" containerProps={{ size: 'large' }}>
        <Stack elementType="form" action="#" method="post" aria-labelledby="publish-cv-heading" spacing="space-1000">
          <Box
            backgroundColor="primary"
            borderColor="basic"
            borderRadius="400"
            borderWidth="100"
            paddingX="space-800"
            paddingY="space-900"
          >
            <Stack hasIntermediateDividers spacing="space-900">
              <StackItem>
                <Stack spacing="space-700">
                  {/* TODO: DS-2771 — Combobox popover needs z-index when it's open to be in front of another nodes with higher z-index */}
                  <UNSTABLE_Combobox
                    id="publish-job-search"
                    label="Jakou práci hledáte?"
                    emptySelectionLabel="Zadejte obor, profesi,…"
                    isRequired
                    isOpen={isJobOpen}
                    onToggle={onJobToggle}
                    selectedKeys={jobSelectedKeys}
                    onSelectionChange={setJobSelectedKeys}
                    inputValue={jobInputValue}
                    onInputChange={setJobInputValue}
                    optionKeys={JOB_OPTIONS.map((o) => o.id)}
                    hasEmptyState={filteredJobOptions.length === 0}
                  >
                    {filteredJobOptions.map((option) => (
                      <UNSTABLE_ComboboxOption key={option.id} value={option.id}>
                        <Label>{option.label}</Label>
                      </UNSTABLE_ComboboxOption>
                    ))}
                  </UNSTABLE_Combobox>
                  <UNSTABLE_Combobox
                    id="publish-location-search"
                    label="Ve kterém městě nebo kraji chcete pracovat?"
                    emptySelectionLabel="Jihlava"
                    isRequired
                    isOpen={isLocationOpen}
                    onToggle={onLocationToggle}
                    selectedKeys={locationSelectedKeys}
                    onSelectionChange={setLocationSelectedKeys}
                    inputValue={locationInputValue}
                    onInputChange={setLocationInputValue}
                    optionKeys={LOCATION_OPTIONS.map((o) => o.id)}
                    hasEmptyState={filteredLocationOptions.length === 0}
                  >
                    {filteredLocationOptions.map((option) => (
                      <UNSTABLE_ComboboxOption key={option.id} value={option.id}>
                        <Label>{option.label}</Label>
                      </UNSTABLE_ComboboxOption>
                    ))}
                  </UNSTABLE_Combobox>
                  <Checkbox id="publish-remote" name="remote" label="Chci pracovat z domova (remote)" />
                </Stack>
              </StackItem>

              <StackItem>
                <FieldGroup id="publish-job-type" label="Jaký typ úvazku preferujete?" isRequired>
                  <Checkbox id="publish-job-type-full" name="jobType" label="Plný" />
                  <Checkbox id="publish-job-type-part" name="jobType" label="Zkrácený" />
                </FieldGroup>
              </StackItem>

              <StackItem>
                <Stack spacing="space-800">
                  <FieldGroup id="publish-salary" label="Očekávaná hrubá mzda">
                    <Radio
                      id="publish-salary-unspecified"
                      name="salary"
                      label="Neurčeno"
                      isChecked={salaryType === 'unspecified'}
                      onChange={() => setSalaryType('unspecified')}
                    />
                    <Radio
                      id="publish-salary-gross"
                      name="salary"
                      label="Zadám hrubou mzdu"
                      isChecked={salaryType === 'specific'}
                      {...(salaryType === 'specific' && {
                        'aria-controls': 'publish-salary-amount',
                      })}
                      onChange={() => setSalaryType('specific')}
                    />
                  </FieldGroup>
                  {salaryType === 'specific' && (
                    <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }}>
                      <GridItem>
                        <Stack spacing="space-800">
                          <TextField
                            id="publish-salary-amount"
                            label="Hrubá mzda od"
                            value={formatSalary(salaryValue)}
                            onChange={(e) => setSalaryValue(parseSalary(e.target.value))}
                            endAddon={<InputAddon>Kč</InputAddon>}
                            min={SALARY_MIN}
                            max={SALARY_MAX}
                            type="number"
                            aria-labelledby="publish-salary-gross"
                          />
                          <Slider
                            id="publish-salary-slider"
                            label="Hrubá mzda"
                            isLabelHidden
                            min={SALARY_MIN}
                            max={SALARY_MAX}
                            step={SALARY_STEP}
                            value={salaryValue}
                            onChange={(e) => setSalaryValue(Number(e.target.value))}
                            // We are hiding `Slider` for assistive technologies because
                            // it shared the same value as `TextField`. Moreover the `TextField`
                            // should be much easier for users to control than `Slider`.
                            aria-hidden="true"
                          />
                        </Stack>
                      </GridItem>
                    </Grid>
                  )}
                </Stack>
              </StackItem>

              <StackItem>
                <Stack spacing="space-700">
                  <FieldGroup id="publish-start-date" label="Kdy můžete nastoupit?">
                    <Radio
                      id="publish-start-unspecified"
                      name="startDate"
                      label="Neurčeno"
                      isChecked={startDateType === 'unspecified'}
                      onChange={() => setStartDateType('unspecified')}
                    />
                    <Radio
                      id="publish-start-immediately"
                      name="startDate"
                      label="Okamžitě"
                      isChecked={startDateType === 'immediately'}
                      onChange={() => setStartDateType('immediately')}
                    />
                    <Radio
                      id="publish-start-notice"
                      name="startDate"
                      label="Po uplynutí výpovědní doby"
                      isChecked={startDateType === 'after-notice'}
                      onChange={() => setStartDateType('after-notice')}
                    />
                    <Radio
                      id="publish-start-date-specific"
                      name="startDate"
                      label="Zadám přesné datum"
                      isChecked={startDateType === 'specific'}
                      {...(startDateType === 'specific' && {
                        'aria-controls': 'publish-start-month publish-start-year',
                      })}
                      onChange={() => setStartDateType('specific')}
                    />
                  </FieldGroup>
                  {startDateType === 'specific' && (
                    <Flex spacing="space-700" alignmentY="bottom">
                      <Select
                        id="publish-start-month"
                        label="Datum nástupu"
                        aria-labelledby="publish-start-date-specific"
                      >
                        <option value="1">Leden</option>
                        <option value="2">Únor</option>
                        <option value="3">Březen</option>
                        <option value="4">Duben</option>
                        <option value="5">Květen</option>
                        <option value="6">Červen</option>
                        <option value="7">Červenec</option>
                        <option value="8">Srpen</option>
                        <option value="9">Září</option>
                        <option value="10">Říjen</option>
                        <option value="11">Listopad</option>
                        <option value="12">Prosinec</option>
                      </Select>
                      <Select id="publish-start-year" label="Rok" isLabelHidden>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                      </Select>
                    </Flex>
                  )}
                </Stack>
              </StackItem>

              <StackItem>
                <FieldGroup id="publish-additional" label="Doplňující údaje">
                  <Checkbox id="publish-ico" name="additional" label="Mohu pracovat na IČ" />
                  <Checkbox id="publish-disability" name="additional" label="Jsem osoba se zdravotním postižením" />
                </FieldGroup>
              </StackItem>

              <StackItem>
                <TextField
                  id="publish-hide-companies"
                  label={
                    <>
                      Chcete životopis skrýt před některými firmami?{' '}
                      {/* TODO: DS-2773 — Vertical alignment should be handled by the component or label styles rather than UNSAFE_ overrides. */}
                      <Tooltip
                        elementType="span"
                        id="publish-hide-tooltip"
                        isOpen={isHideTooltipOpen}
                        onToggle={setIsHideTooltipOpen}
                        placement="top-start"
                        UNSAFE_style={{ verticalAlign: 'middle' }}
                      >
                        {/* TODO: DS-2772 — TooltipTrigger should set type="button" when elementType is a button
                            to prevent accidental form submission. */}
                        {/* TODO: DS-2773 — Button reset styles should be handled by the component or label styles rather than UNSAFE_ overrides. */}
                        <TooltipTrigger type="button" UNSAFE_className="button-unstyled">
                          <Icon name="info" boxSize={16} aria-hidden />
                          <VisuallyHidden>Více informací</VisuallyHidden>
                        </TooltipTrigger>
                        <TooltipPopover id="publish-tooltip-popover">
                          Když nechcete, aby některé firmy nebo organizace váš životopis viděly, zadejte jejich názvy.
                          Hodí se to u firem, se kterými nemáte dobré zkušenosti, nebo třeba u současného
                          zaměstnavatele.
                        </TooltipPopover>
                      </Tooltip>
                    </>
                  }
                  placeholder="Uveďte název firmy"
                  size="large"
                />
              </StackItem>
              <StackItem>
                <Stack spacing="space-900">
                  <ActionGroup
                    direction={{ mobile: 'vertical', tablet: 'horizontal' }}
                    alignmentX={{ mobile: 'stretch', tablet: 'left' }}
                    spacing="space-600"
                  >
                    <Button type="submit">Vystavit životopis</Button>
                    <Button color="secondary">Zrušit</Button>
                  </ActionGroup>
                  <Text textColor="secondary">
                    Vystavením životopisu zpřístupníte údaje personalistům, tj. našim klientům/zaměstnavatelům, kteří
                    mají přístup do databáze životopisů. Personalisté z celé Evropy Vás budou moci najít v databázi
                    podle Vámi zadaných informací/kritérií a budou Vás moci oslovit s pracovní nabídkou
                  </Text>
                </Stack>
              </StackItem>
            </Stack>
          </Box>
        </Stack>
      </Section>
    </>
  );
};
