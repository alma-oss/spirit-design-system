import React, { useEffect, useState } from 'react';
import { Stack } from '../..';
import { UNSTABLE_Attachment, UNSTABLE_AttachmentImagePreview } from '..';
import { useFilePreviewUrl } from './useFilePreviewUrl';
import { visualOnlyNoopOnDismiss } from './visualOnlyContext';

const DEMO_IMAGE_URL = 'https://picsum.photos/id/823/132/162';

const loadImageFile = async (url: string, name: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();

  return new File([blob], name, { type: blob.type || 'image/jpeg', lastModified: Date.now() });
};

const Attachment = () => {
  const onDismiss = visualOnlyNoopOnDismiss;
  const [portraitFile, setPortraitFile] = useState<File | null>(null);

  const previewUrlPortrait = useFilePreviewUrl(portraitFile ?? new File([], ''));

  useEffect(() => {
    loadImageFile(DEMO_IMAGE_URL, 'demo-image.jpg').then((file) => {
      setPortraitFile(file);
    });
  }, []);

  // ⚠️ VISUAL EXAMPLE ONLY, DO NOT COPY-PASTE
  return (
    <Stack aria-label="Attachments" elementType="ul" hasSpacing>
      <UNSTABLE_Attachment id="attachment-1" label="Document.pdf" onDismiss={onDismiss} />
      {portraitFile && (
        <>
          <UNSTABLE_Attachment
            id="attachment-2"
            label="Image with a long name.jpg"
            onDismiss={onDismiss}
            onChange={() => {
              alert('Edit');
            }}
            {...(previewUrlPortrait && {
              previewSlot: (
                <UNSTABLE_AttachmentImagePreview imagePreview={previewUrlPortrait} label="Image with a long name.jpg" />
              ),
            })}
          />
          <UNSTABLE_Attachment
            id="attachment-3"
            label="Contained image"
            onDismiss={onDismiss}
            {...(previewUrlPortrait && {
              previewSlot: (
                <UNSTABLE_AttachmentImagePreview
                  imagePreview={previewUrlPortrait}
                  label="Contained image"
                  imageObjectFit="contain"
                />
              ),
            })}
          />
          <UNSTABLE_Attachment
            id="attachment-4"
            label="Cropped via meta"
            onDismiss={onDismiss}
            {...(previewUrlPortrait && {
              previewSlot: (
                <UNSTABLE_AttachmentImagePreview
                  imagePreview={previewUrlPortrait}
                  label="Cropped via meta"
                  meta={{
                    x: 26,
                    y: 41,
                    cropWidth: 80,
                    cropHeight: 80,
                    originalWidth: 132,
                    originalHeight: 162,
                  }}
                />
              ),
            })}
          />
        </>
      )}
    </Stack>
  );
};

export default Attachment;
