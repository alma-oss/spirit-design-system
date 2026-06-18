import { Stack } from '@alma-oss/spirit-web-react';
import { FileUpload, type FileUploadProps } from '@alma-oss/spirit-web-react';

const Example = (props: FileUploadProps) => (
  <Stack hasSpacing>
    <FileUpload
      id="upload"
      name="attachments"
      label="Label"
      inputUploadText="Upload your file(s)"
      inputDragAndDropText="or drag and drop here"
      isFluid
      {...props}
    />
  </Stack>
);

export default Example;
