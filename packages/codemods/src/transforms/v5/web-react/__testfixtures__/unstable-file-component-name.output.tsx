import { Stack } from '@alma-oss/spirit-web-react';
import { File, FileImagePreview, type FileItem } from '@alma-oss/spirit-web-react';

const items: FileItem[] = [{ id: '1', label: 'file.pdf' }];

const Example = () => (
  <Stack aria-label="Uploaded files" elementType="ul" hasSpacing>
    {items.map((item) => (
      <File
        key={item.id}
        id={item.id}
        label={item.label}
        previewSlot={<FileImagePreview imagePreview="/preview.jpg" label="Preview" />}
      />
    ))}
  </Stack>
);

export default Example;
