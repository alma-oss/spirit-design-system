import React, { type MouseEvent, useState } from 'react';
import { type SpiritFileUploaderAttachmentProps } from '../../../types';
import { Button } from '../../Button';
import { Modal, ModalBody, ModalDialog, ModalFooter } from '../../Modal';
import { FileUploader, FileUploaderAttachment, FileUploaderInput, FileUploaderList, useFileQueue } from '..';

const FileUploaderMetaData = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [base64File, setBase64File] = useState<string>('');
  const [fileToPreview, setFileToPreview] = useState<File | null>(null);
  const [toggleMeta, setToggleMeta] = useState<boolean>(false);
  const { fileQueue, addToQueue, clearQueue, onDismiss, updateQueue, findInQueue } = useFileQueue();

  const customOnDismiss = (key: string) => onDismiss(key);

  const customAddToQueue = (key: string, file: File) => {
    if (file.type.includes('image')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // FileReader.result contains the file content as a base64 encoded string
        setBase64File(reader.result as string);
      };
      reader.readAsDataURL(file);

      setFileToPreview(file);
      setIsModalOpen(true);

      return fileQueue;
    }

    return addToQueue(key, file);
  };

  const customUpdate = (_event: MouseEvent, file: File) => {
    const newMeta = toggleMeta
      ? { x: 30, y: 30, cropWidth: 150, cropHeight: 150, originalWidth: 560, originalHeight: 330 }
      : { x: 22, y: 0, cropWidth: 110, cropHeight: 100, originalWidth: 560, originalHeight: 330 };

    setIsModalOpen(false);
    setToggleMeta(!toggleMeta);

    return updateQueue(file.name, file, newMeta);
  };

  const confirmPreview = () => {
    const newMeta = { x: 0, y: 0, width: 100, height: 100 };

    setIsModalOpen(false);
    addToQueue(fileToPreview?.name || '', fileToPreview as File, newMeta);
  };

  const resetCropImageState = () => {
    setIsModalOpen(false);
    setFileToPreview(null);
    setBase64File('');
  };

  const handleClose = () => {
    resetCropImageState();
  };

  const attachmentComponent = ({ id, meta, ...props }: SpiritFileUploaderAttachmentProps) => (
    <FileUploaderAttachment key={id} id={id} meta={meta} onEdit={customUpdate} {...props} />
  );

  return (
    <>
      <FileUploader
        addToQueue={customAddToQueue}
        clearQueue={clearQueue}
        fileQueue={fileQueue}
        findInQueue={findInQueue}
        id="file-uploader-with-meta-data"
        onDismiss={customOnDismiss}
        updateQueue={updateQueue}
      >
        <FileUploaderInput
          helperText="Max size of each file is 10 MB"
          id="file-uploader-with-meta-data-input"
          label="Label"
          labelText="or drag and drop here"
          linkText="Upload your file(s)"
          name="attachments"
          maxUploadedFiles={1}
          onError={(error) => console.error('My error log', error)}
        />
        <FileUploaderList
          attachmentComponent={attachmentComponent}
          id="file-uploader-with-meta-data-attachment"
          inputName="attachments"
          label="Attachments"
          hasImagePreview
        />
      </FileUploader>
      <Modal id="modal-example" isOpen={isModalOpen} onClose={handleClose}>
        <ModalDialog>
          <ModalBody>
            <div className="pt-400 pt-tablet-600">
              <img src={base64File} style={{ width: '100%', height: 'auto' }} alt="fileToPreview" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={confirmPreview}>
              Confirm
            </Button>
            <Button color="tertiary" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default FileUploaderMetaData;
