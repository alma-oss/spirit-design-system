import { Stack } from '@alma-oss/spirit-web-react';
import { UNSTABLE_FileUpload, type UnstableFileUploadProps } from '@alma-oss/spirit-web-react';

const Example = (props: UnstableFileUploadProps) => (
  <Stack hasSpacing>
    <UNSTABLE_FileUpload
      id="upload"
      name="attachments"
      label="Label"
      linkText="Upload your file(s)"
      labelText="or drag and drop here"
      isFluid
      {...props}
    />
  </Stack>
);

export default Example;
