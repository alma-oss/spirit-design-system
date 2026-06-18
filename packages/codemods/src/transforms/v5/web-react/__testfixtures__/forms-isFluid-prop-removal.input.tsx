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
    <TextField id="textfield" label="Label" isFluid />
    <TextArea id="textarea" label="Label" isFluid={true} />
    <Select id="select" label="Label" isFluid />
    <Slider id="slider" label="Label" value={50} onChange={() => {}} isFluid />
    <Toggle id="toggle" label="Label" isFluid />
    <FieldGroup id="field-group" label="Label" isFluid />
    <UNSTABLE_Picker id="unstable-picker" label="Label" isOpen={false} onToggle={() => {}} selectedKeys={[]} onSelectionChange={() => {}}>
      <div />
    </UNSTABLE_Picker>
    <UNSTABLE_UncontrolledPicker id="unstable-uncontrolled-picker" label="Label" isFluid>
      <div />
    </UNSTABLE_UncontrolledPicker>
    <SegmentedControl name="segmented-control" label="Label" isFluid />
    <PartnerLogo isFluid>Brand</PartnerLogo>
  </>
);
