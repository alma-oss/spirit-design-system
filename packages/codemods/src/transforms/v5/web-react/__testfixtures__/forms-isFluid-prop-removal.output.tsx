// @ts-nocheck
import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import {
  FieldGroup,
  FileUpload,
  PartnerLogo,
  SegmentedControl,
  Select,
  Slider,
  TextArea,
  TextField,
  Toggle,
  UNSTABLE_Picker,
  UNSTABLE_UncontrolledPicker,
} from '@alma-oss/spirit-web-react';

export const MyComponent = () => (
  <>
    <TextField id="textfield" label="Label" />
    <TextArea id="textarea" label="Label" />
    <Select id="select" label="Label" />
    <Slider id="slider" label="Label" value={50} onChange={() => {}} />
    <Toggle id="toggle" label="Label" />
    <FieldGroup id="field-group" label="Label" />
    <UNSTABLE_Picker id="unstable-picker" label="Label" isOpen={false} onToggle={() => {}} selectedKeys={[]} onSelectionChange={() => {}}>
      <div />
    </UNSTABLE_Picker>
    <UNSTABLE_UncontrolledPicker id="unstable-uncontrolled-picker" label="Label">
      <div />
    </UNSTABLE_UncontrolledPicker>
    <SegmentedControl name="segmented-control" label="Label" isFluid />
    <PartnerLogo isFluid>Brand</PartnerLogo>
  </>
);
