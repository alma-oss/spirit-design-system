import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
  Box,
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  Stack,
  Text,
  Toggle,
} from '../../../src/components';
import { UNSTABLE_File, UNSTABLE_FileImagePreview } from '../../../src/components/UNSTABLE_File';
import { useFilePreviewUrl } from '../../../src/components/UNSTABLE_File/demo/useFilePreviewUrl';
import { UNSTABLE_FileUpload } from '../../../src/components/UNSTABLE_FileUpload';
import { useFileQueue } from '../../../src/components/UNSTABLE_FileUpload/demo/useFileQueue';
import type { UnstableFileUploadAttachmentsItem } from '../../../src/components/UNSTABLE_FileUpload/types';

const ASPECT_RATIO = 1; // 1:1
const MIN_WIDTH_PX = 100;
const MIN_HEIGHT_PX = 100;
const EMPTY_FILE = new File([], '');
const fileToKey = (name: string): string => `file__${name.replace(/\./g, '_').replace(/\s/g, '_')}`;

type ImageSize = {
  width: number;
  height: number;
};

type UploadState = 'uploading' | 'success' | 'error';

export default {
  title: 'Examples/Compositions',
};

export const FileUploaderWithModalImageCrop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileToCrop, setFileToCrop] = useState<File | null>(null);
  const [cropParams, setCropParams] = useState<Crop | null>(null);
  const [cropError, setCropError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<ImageSize | null>(null);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [simulateError, setSimulateError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [uploadStates, setUploadStates] = useState<Map<string, UploadState>>(new Map());
  const filesMap = useRef<Map<string, File>>(new Map());
  const uploadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileToCropUrl = useFilePreviewUrl(fileToCrop ?? EMPTY_FILE);
  const { fileQueue, addToQueue, updateQueue, onDismiss } = useFileQueue();

  useEffect(
    () => () => {
      if (uploadTimerRef.current) clearTimeout(uploadTimerRef.current);
    },
    [],
  );

  const items: UnstableFileUploadAttachmentsItem[] = useMemo(
    () =>
      Array.from(fileQueue.entries(), ([id, value]) => ({
        id,
        label: value.label,
        previewUrl: value.previewUrl,
        meta: value.meta,
      })),
    [fileQueue],
  );

  // Validates image dimensions and opens the crop modal. Non-image files are added to the queue directly.
  const onFilesSelected = (files: File[]) => {
    setFileError(null);

    if (files.length > 1) {
      // If the error is already visible, bump the key to re-trigger the shake animation.
      if (fileError !== null) {
        setShakeKey((k) => k + 1);
      }
      setFileError('Please select only one file at a time.');

      return;
    }

    // Reset shake state when the user makes a valid selection.
    setShakeKey(0);

    const [file] = files;

    if (!file?.type.includes('image')) {
      files.forEach((f) => addToQueue(fileToKey(f.name), f));

      return;
    }

    const imgUrl = URL.createObjectURL(file);
    let img: HTMLImageElement | null = new Image();
    img.onload = () => {
      if (
        (img as HTMLImageElement).naturalWidth < MIN_WIDTH_PX ||
        (img as HTMLImageElement).naturalHeight < MIN_HEIGHT_PX
      ) {
        setFileError(`Image is too small. Minimum size is ${MIN_WIDTH_PX}×${MIN_HEIGHT_PX} px.`);
        URL.revokeObjectURL(imgUrl);
        img = null;

        return;
      }

      URL.revokeObjectURL(imgUrl);
      // Keep a reference to the original File so it can be re-opened for editing later.
      filesMap.current.set(fileToKey(file.name), file);
      setFileToCrop(file);
      img = null;
      setIsModalOpen(true);
    };
    img.onerror = () => {
      URL.revokeObjectURL(imgUrl);
      setFileError('The image could not be loaded.');
      img = null;
    };
    img.src = imgUrl;
  };

  // Re-opens the crop modal for an already uploaded file so the user can adjust the crop.
  const handleEdit = (key: string) => {
    const file = filesMap.current.get(key);

    if (!file) {
      return;
    }

    setEditingKey(key);
    setFileToCrop(file);
    setIsModalOpen(true);
  };

  // Sets the initial centered crop area once the image has loaded inside the modal.
  const handleImageLoaded = (img: HTMLImageElement) => {
    setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
    // Ensure the default crop is never smaller than MIN_WIDTH_PX (e.g. a 100×100 image with 90% would be 90px).
    const minWidthPct = Math.min(100, Math.ceil((MIN_WIDTH_PX / img.naturalWidth) * 100));
    const initialWidth = Math.max(90, minWidthPct);
    setCropParams(
      centerCrop(
        makeAspectCrop({ unit: '%', width: initialWidth }, ASPECT_RATIO, img.naturalWidth, img.naturalHeight),
        img.naturalWidth,
        img.naturalHeight,
      ),
    );
  };

  // Shows an error message when the crop image fails to load.
  const handleImageError = () => {
    setCropError('The image could not be loaded.');
  };

  // Resets all modal-related state and closes the modal without saving.
  const handleModalClose = () => {
    setFileToCrop(null);
    setCropParams(null);
    setCropError(null);
    setImageSize(null);
    setEditingKey(null);
    setIsModalOpen(false);
  };

  // Converts the percentage-based crop to absolute pixels, validates the minimum crop size,
  // then adds (or updates) the file in the queue and simulates a fake async upload.
  const handleModalUpload = () => {
    if (!fileToCrop || !cropParams || !imageSize) {
      return;
    }

    const absoluteCrop = {
      x: Math.round(imageSize.width * (cropParams.x / 100)),
      y: Math.round(imageSize.height * (cropParams.y / 100)),
      cropWidth: Math.round(imageSize.width * (cropParams.width / 100)),
      cropHeight: Math.round(imageSize.height * (cropParams.height / 100)),
      originalWidth: imageSize.width,
      originalHeight: imageSize.height,
    };

    if (absoluteCrop.cropWidth < MIN_WIDTH_PX || absoluteCrop.cropHeight < MIN_HEIGHT_PX) {
      setCropError(`Crop area is too small. Minimum is ${MIN_WIDTH_PX}×${MIN_HEIGHT_PX} px.`);

      return;
    }

    const key = editingKey ?? fileToKey(fileToCrop.name);

    // Use updateQueue when re-cropping an existing entry to replace its preview and metadata.
    if (editingKey) {
      updateQueue(key, fileToCrop, absoluteCrop);
    } else {
      addToQueue(key, fileToCrop, absoluteCrop);
    }

    setUploadStates((prev) => new Map(prev).set(key, 'uploading'));
    handleModalClose();

    // Simulate a network upload delay, then resolve to success or error based on the toggle.
    if (uploadTimerRef.current) clearTimeout(uploadTimerRef.current);
    uploadTimerRef.current = setTimeout(() => {
      setUploadStates((prev) => new Map(prev).set(key, simulateError ? 'error' : 'success'));
    }, 1500);
  };

  // Removes the file from the queue, the original-file cache, and the upload-state tracker.
  const handleDismiss = (key: string) => {
    onDismiss(key);
    filesMap.current.delete(key);
    setUploadStates((prev) => {
      const next = new Map(prev);
      next.delete(key);

      return next;
    });
  };

  return (
    <Stack hasSpacing>
      <Box
        backgroundColor="emotion-informative-subtle"
        borderColor="emotion-informative-basic"
        borderWidth="100"
        borderRadius="200"
        padding="space-600"
        marginBottom="space-1000"
      >
        <Toggle
          id="simulate-upload-error"
          label="Simulate file upload error"
          isChecked={simulateError}
          inputPosition="start"
          onChange={(e) => setSimulateError(e.target.checked)}
          isFluid
        />
        <Text textColor="emotion-informative-basic">
          💡 Drop multiple files to see validation; drop them again while the error is visible to trigger a shake
          animation.
        </Text>
      </Box>
      <UNSTABLE_FileUpload
        id="file-uploader-react-image-crop"
        accept=".png,image/jpeg"
        helperText="Max file size is 10 MB"
        isUploadDisabled={items.length > 0}
        label="Label"
        labelText="or drag and drop here"
        linkText="Upload your file"
        name="attachments"
        onFilesSelected={onFilesSelected}
        {...(fileError && { validationState: 'danger' })}
        // The `key` prop on the div restarts the CSS animation on each repeated drop of multiple
        // files: the first drop shows the error, every subsequent drop while the error is already
        // visible increments `shakeKey`, which forces React to remount the div and replay the
        // `animation-shake` effect. A plain `div` (block element) is intentional — CSS `transform`
        // used by the animation has no visual effect on inline elements such as `span`.
        {...(fileError && {
          validationText: (
            <div key={shakeKey} {...(shakeKey > 0 && { className: 'animation-shake' })}>
              {fileError}
            </div>
          ),
        })}
      />
      <Stack aria-label="Uploaded files" elementType="ul" hasSpacing>
        {items.map((item) => {
          const uploadState = uploadStates.get(item.id);
          const isUploading = uploadState === 'uploading';
          const isSuccess = uploadState === 'success';
          const isError = uploadState === 'error';

          return (
            <UNSTABLE_File
              key={item.id}
              id={item.id}
              isDisabled={isUploading}
              label={item.label}
              removeText={`Remove ${item.label} from list`}
              {...(!isError && {
                editText: `Edit crop of ${item.label}`,
                onChange: () => handleEdit(item.id),
              })}
              onDismiss={() => handleDismiss(item.id)}
              {...(isUploading && {
                helperText: (
                  <>
                    <Icon name="spinner" boxSize={16} UNSAFE_className="animation-spin-clockwise" />{' '}
                    <span>Uploading your file…</span>
                  </>
                ),
              })}
              {...(isSuccess && {
                validationState: 'success',
                hasValidationIcon: true,
                validationText: 'File uploaded successfully',
              })}
              {...(isError && {
                validationState: 'danger',
                hasValidationIcon: true,
                validationText: 'Upload failed – please try again',
              })}
              {...(item.previewUrl && {
                previewSlot: (
                  <UNSTABLE_FileImagePreview
                    imageObjectFit="contain"
                    imagePreview={item.previewUrl}
                    label={`Preview of ${item.label}`}
                    meta={item.meta}
                  />
                ),
              })}
            />
          );
        })}
      </Stack>
      <Modal id="photo-uploader-crop" isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalDialog isDockedOnMobile isExpandedOnMobile={false}>
          <ModalHeader>Crop photo</ModalHeader>
          <ModalBody>
            <div>
              <ReactCrop
                aspect={ASPECT_RATIO}
                {...(cropParams && { crop: cropParams })}
                onChange={(_, percentageCrop: Crop) => setCropParams(percentageCrop)}
                ruleOfThirds
              >
                <img
                  alt="Crop preview"
                  onError={handleImageError}
                  onLoad={(event) => handleImageLoaded(event.target as HTMLImageElement)}
                  src={fileToCropUrl}
                />
              </ReactCrop>
            </div>
            {/* TODO: replace with ValidationText component once available */}
            <div>
              {cropError && (
                <Text textColor="emotion-danger-basic" textAlignment="center">
                  {cropError}
                </Text>
              )}
            </div>
          </ModalBody>
          <ModalFooter alignmentX="center">
            <Button onClick={handleModalUpload}>Upload</Button>
            <Button color="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalDialog>
      </Modal>
    </Stack>
  );
};
