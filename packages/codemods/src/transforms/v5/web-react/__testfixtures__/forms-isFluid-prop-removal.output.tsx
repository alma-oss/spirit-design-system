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
    <TextField id="textfield" label="Label" />
    <TextArea id="textarea" label="Label" />
    <Select id="select" label="Label" />
    <Slider id="slider" label="Label" value={50} onChange={() => {}} />
    <Toggle id="toggle" label="Label" />
    <FieldGroup id="field-group" label="Label" />
    <FileUploader id="file-uploader" />
    <UncontrolledFileUploader
      id="uncontrolled-file-uploader"
      inputId="input"
      inputLabel="Input"
      inputName="attachments"
      listId="list"
      attachmentComponent={() => null} />
    <UNSTABLE_FileUpload id="unstable-file-upload" name="attachments" />
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
