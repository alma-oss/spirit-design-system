import React from 'react';
import DocsBox from '../../../../docs/DocsBox';
import { Stack } from '../../Stack';
import FieldGroup from '../FieldGroup';

const FieldGroupSizes = () => (
  <Stack spacing="space-800">
    <FieldGroup id="field-group-size-small" label="Small" size="small">
      <DocsBox>Item</DocsBox>
      <DocsBox>Item</DocsBox>
    </FieldGroup>
    <FieldGroup id="field-group-size-medium" label="Medium (default)">
      <DocsBox>Item</DocsBox>
      <DocsBox>Item</DocsBox>
    </FieldGroup>
    <FieldGroup id="field-group-size-large" label="Large" size="large">
      <DocsBox>Item</DocsBox>
      <DocsBox>Item</DocsBox>
    </FieldGroup>
  </Stack>
);

export default FieldGroupSizes;
