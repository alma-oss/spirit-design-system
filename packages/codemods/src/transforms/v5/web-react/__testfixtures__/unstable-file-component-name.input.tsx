import { Stack } from '@alma-oss/spirit-web-react';
import { UNSTABLE_File, UNSTABLE_FileImagePreview, type UnstableFileItem } from '@alma-oss/spirit-web-react';

const items: UnstableFileItem[] = [{ id: '1', label: 'file.pdf' }];

const Example = () => (
  <Stack aria-label="Uploaded files" elementType="ul" hasSpacing>
    {items.map((item) => (
      <UNSTABLE_File
        key={item.id}
        id={item.id}
        label={item.label}
        previewSlot={<UNSTABLE_FileImagePreview imagePreview="/preview.jpg" label="Preview" />}
      />
    ))}
  </Stack>
);

export default Example;
