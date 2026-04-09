// @ts-nocheck
import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import {
  FieldGroup,
  FileUploader,
  PartnerLogo,
  SegmentedControl,
  Select,
  Slider,
  TextArea,
  TextField,
  Toggle,
  UNSTABLE_FileUpload,
  UNSTABLE_Picker,
  UNSTABLE_UncontrolledPicker,
  UncontrolledFileUploader,
} from '@alma-oss/spirit-web-react';

export const MyComponent = () => (
  <>
    <TextField id="textfield" label="Label" isFluid />
    <TextArea id="textarea" label="Label" isFluid={true} />
    <Select id="select" label="Label" isFluid />
    <Slider id="slider" label="Label" value={50} onChange={() => {}} isFluid />
    <Toggle id="toggle" label="Label" isFluid />
    <FieldGroup id="field-group" label="Label" isFluid />
    <FileUploader id="file-uploader" isFluid />
    <UncontrolledFileUploader
      id="uncontrolled-file-uploader"
      inputId="input"
      inputLabel="Input"
      inputName="attachments"
      listId="list"
      attachmentComponent={() => null}
      isFluid
    />
    <UNSTABLE_FileUpload id="unstable-file-upload" name="attachments" isFluid />
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
