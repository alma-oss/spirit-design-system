import React, { useState } from 'react';
import {
  ActionGroup,
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Divider,
  FieldGroup,
  Flex,
  Heading,
  Icon,
  InputAddon,
  Radio,
  Section,
  Select,
  Slider,
  Stack,
  Text,
  TextField,
  Tooltip,
  TooltipPopover,
  TooltipTrigger,
} from '../../../src/components';

export default {
  title: 'Examples/Pages',
  parameters: { layout: 'fullscreen' },
};

type SalaryType = 'unspecified' | 'specific';
type StartDateType = 'unspecified' | 'immediately' | 'after-notice' | 'specific';

export const CvBuilderPublish = () => {
  const [salaryType, setSalaryType] = useState<SalaryType>('unspecified');
  const [startDateType, setStartDateType] = useState<StartDateType>('unspecified');
  const [salaryValue, setSalaryValue] = useState(50000);
  const [isHideTooltipOpen, setIsHideTooltipOpen] = useState(false);

  return (
    <Section size="small" containerProps={{ size: 'large' }}>
      <Stack spacing="space-1000">
        <Stack spacing="space-1000">
          <Breadcrumbs goBackTitle="Zpět" items={[{ title: 'Životopis', url: '#' }]} />
          <Heading id="publish-cv-heading" elementType="h1" size="large" fontWeight="semibold" marginBottom="space-0">
            Jakým firmám se má váš životopis zobrazovat
          </Heading>
          <Text marginBottom="space-0">
            Zadejte obor, ve kterém chcete pracovat, lokalitu, úvazek a mzdu. Můžete si také nastavit, které firmy váš
            životopis vidět nemají.
          </Text>
        </Stack>
        <form action="#" method="post" aria-labelledby="publish-cv-heading">
          <Box
            backgroundColor="primary"
            borderColor="basic"
            borderRadius="400"
            borderWidth="100"
            paddingX="space-800"
            paddingY="space-900"
          >
            <Flex direction="vertical" alignmentX="stretch" spacing="space-900">
              {/* Search fields and remote checkbox */}
              <Flex direction="vertical" alignmentX="stretch" spacing="space-700">
                <TextField
                  id="publish-job-search"
                  label="Jakou práci hledáte?"
                  isRequired
                  placeholder="Zadejte obor, profesi ..."
                  startAddon={
                    <InputAddon>
                      <Icon name="search" />
                    </InputAddon>
                  }
                />
                <TextField
                  id="publish-location-search"
                  label="Ve kterém městě nebo kraji chcete pracovat?"
                  isRequired
                  placeholder="Např. Jihlava"
                  startAddon={
                    <InputAddon>
                      <Icon name="search" />
                    </InputAddon>
                  }
                />
                <Checkbox id="publish-remote" name="remote" label="Chci pracovat z domova (remote)" />
              </Flex>

              <Divider />

              <FieldGroup id="publish-job-type" label="Jaký typ úvazku preferujete?" isRequired>
                <Checkbox id="publish-job-type-full" name="jobType" label="Plný" />
                <Checkbox id="publish-job-type-part" name="jobType" label="Zkrácený" />
              </FieldGroup>

              <Divider />

              <Flex direction="vertical" alignmentX="stretch" spacing="space-800">
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
                    onChange={() => setSalaryType('specific')}
                  />
                </FieldGroup>
                {salaryType === 'specific' && (
                  <>
                    <TextField id="publish-salary-amount" label="Hrubá mzda od" defaultValue="50 000" />
                    <Slider
                      id="publish-salary-slider"
                      label="Hrubá mzda"
                      isLabelHidden
                      min={0}
                      max={200000}
                      value={salaryValue}
                      onChange={(e) => setSalaryValue(Number(e.target.value))}
                    />
                  </>
                )}
              </Flex>

              <Divider />

              <Flex direction="vertical" alignmentX="stretch" spacing="space-700">
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
                    onChange={() => setStartDateType('specific')}
                  />
                </FieldGroup>
                {startDateType === 'specific' && (
                  <Flex spacing="space-700" alignmentY="bottom">
                    <Select id="publish-start-month" label="Datum nástupu">
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
              </Flex>

              <Divider />

              <FieldGroup id="publish-additional" label="Doplňující údaje">
                <Checkbox id="publish-ico" name="additional" label="Mohu pracovat na IČ" />
                <Checkbox id="publish-disability" name="additional" label="Jsem osoba se zdravotním postižením" />
              </FieldGroup>

              <Divider />

              <TextField
                id="publish-hide-companies"
                label={
                  <Flex alignmentY="center" spacing="space-300">
                    Chcete životopis skrýt před některými firmami?
                    <Tooltip
                      id="publish-hide-tooltip"
                      isDismissible
                      isOpen={isHideTooltipOpen}
                      onToggle={setIsHideTooltipOpen}
                      placement="top-start"
                    >
                      <TooltipTrigger boxSize={16} elementType={Icon} name="info" UNSAFE_className="d-inline-block" />
                      <TooltipPopover>
                        Když nechcete, aby některé firmy nebo organizace váš životopis viděly, zadejte jejich názvy.
                        Hodí se to u firem, se kterými nemáte dobré zkušenosti, nebo třeba u současného zaměstnavatele.
                      </TooltipPopover>
                    </Tooltip>
                  </Flex>
                }
                placeholder="Uveďte název firmy"
                size="large"
              />

              <Divider />

              <ActionGroup
                direction={{ mobile: 'vertical', tablet: 'horizontal' }}
                alignmentX={{ mobile: 'stretch', tablet: 'left' }}
                spacing="space-600"
              >
                <Button type="submit">Vystavit životopis</Button>
                <Button color="secondary">Zrušit</Button>
              </ActionGroup>

              <Text textColor="secondary">
                Vystavením životopisu zpřístupníte údaje personalistům, tj. našim klientům/zaměstnavatelům, kteří mají
                přístup do databáze životopisů. Personalisté z celé Evropy Vás budou moci najít v databázi podle Vámi
                zadaných informací/kritérií a budou Vás moci oslovit s pracovní nabídkou
              </Text>
            </Flex>
          </Box>
        </form>
      </Stack>
    </Section>
  );
};
