import React, { useEffect, useState } from 'react';
import {
  UNSTABLE_FileUploadAttachment as FileUploadAttachmentComponent,
  UNSTABLE_AttachmentImagePreview,
  useFilePreviewUrl,
} from '..';
import { visualOnlyNoopOnDismiss } from './visualOnlyContext';

const DEMO_IMAGE_URL = 'https://picsum.photos/id/823/132/162';

const loadImageFile = async (url: string, name: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();

  return new File([blob], name, { type: blob.type || 'image/jpeg', lastModified: Date.now() });
};

const FileUploadAttachment = () => {
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
    <div className="FileUploader">
      <ul className="FileUploaderList">
        <FileUploadAttachmentComponent id="attachment-1" label="Document.pdf" onDismiss={onDismiss} />
        {portraitFile && (
          <>
            <FileUploadAttachmentComponent
              id="attachment-2"
              label="Image with a long name.jpg"
              onDismiss={onDismiss}
              onChange={() => {
                alert('Edit');
              }}
              {...(previewUrlPortrait && {
                thumbnail: (
                  <UNSTABLE_AttachmentImagePreview
                    imagePreview={previewUrlPortrait}
                    label="Image with a long name.jpg"
                  />
                ),
              })}
            />
            <FileUploadAttachmentComponent
              id="attachment-3"
              label="Contained image"
              onDismiss={onDismiss}
              {...(previewUrlPortrait && {
                thumbnail: (
                  <UNSTABLE_AttachmentImagePreview
                    imagePreview={previewUrlPortrait}
                    label="Contained image"
                    imageObjectFit="contain"
                  />
                ),
              })}
            />
            <FileUploadAttachmentComponent
              id="attachment-4"
              label="Cropped via meta"
              onDismiss={onDismiss}
              {...(previewUrlPortrait && {
                thumbnail: (
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
      </ul>
    </div>
  );
};

export default FileUploadAttachment;
