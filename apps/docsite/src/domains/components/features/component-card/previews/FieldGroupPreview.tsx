'use client';

import { Checkbox, FieldGroup } from '@alma-oss/spirit-web-react';
import React from 'react';

const FieldGroupPreview = () => (
  <FieldGroup id="card-field-group" isLabelHidden label="Options" UNSAFE_style={{ width: 200 }}>
    <Checkbox id="card-field-group-1" isChecked label="Option 1" name="card-field-group-1" onChange={() => undefined} />
    <Checkbox id="card-field-group-2" label="Option 2" name="card-field-group-2" />
    <Checkbox id="card-field-group-3" label="Option 3" name="card-field-group-3" />
  </FieldGroup>
);

export default FieldGroupPreview;
