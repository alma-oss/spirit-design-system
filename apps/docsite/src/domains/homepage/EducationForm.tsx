'use client';

import {
  ActionGroup,
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  Heading,
  Select,
  Stack,
  TextField,
} from '@alma-oss/spirit-web-react';

// The form is only a demonstration, the buttons neither cancel nor save anything.
const EducationForm = () => (
  <Box
    backgroundColor="primary"
    borderColor="basic"
    borderWidth="100"
    borderRadius="500"
    padding={{ mobile: 'space-700', tablet: 'space-1000' }}
  >
    <Stack spacing="space-900">
      <Heading elementType="h3" size="xsmall">
        Education
      </Heading>

      <Stack spacing="space-800">
        <Grid cols={{ mobile: 1, tablet: 2 }} spacing="space-700">
          <TextField
            id="building-blocks-school"
            name="buildingBlocksSchool"
            label="School name"
            placeholder="e.g. Masaryk University"
            variant="fill"
            isRequired
          />
          <TextField
            id="building-blocks-field"
            name="buildingBlocksField"
            label="Field of study"
            placeholder="e.g. Economics"
            variant="fill"
            isRequired
          />
        </Grid>

        <Grid cols={2} spacing="space-700" alignmentY="bottom">
          <Select
            id="building-blocks-from"
            name="buildingBlocksFrom"
            label="Period from – to"
            variant="fill"
            isRequired
          >
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
          </Select>
          <Select id="building-blocks-to" name="buildingBlocksTo" label="Period to" isLabelHidden variant="fill">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </Select>
        </Grid>

        <Checkbox id="building-blocks-studying" name="buildingBlocksStudying" label="I still study here" />
      </Stack>

      <Divider />

      <ActionGroup>
        <Button color="secondary">Cancel</Button>
        <Button>Save</Button>
      </ActionGroup>
    </Stack>
  </Box>
);

export default EducationForm;
