import React, { useState } from 'react';
import { Link } from '../../Link';
import { Modal, ModalBody, ModalDialog, ModalHeader } from '../../Modal';
import { Toggle } from '../../Toggle';

const InputDetailsWithToggle = () => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  return (
    <>
      <Toggle
        id="input-details-toggle"
        name="consent"
        label="I agree to the terms and conditions"
        isRequired
        inputPosition="end"
        validationState="danger"
        helperText="Please read the documents carefully before agreeing"
        validationText="You must agree to continue"
        details={
          <>
            <Link elementType="button" color="inherit" underlined="always" onClick={() => setIsTermsModalOpen(true)}>
              See full terms and conditions
            </Link>
            <Link elementType="button" color="inherit" underlined="always" onClick={() => setIsPrivacyModalOpen(true)}>
              See privacy policy
            </Link>
          </>
        }
      />
      <Modal id="input-details-toggle-terms-modal" isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)}>
        <ModalDialog>
          <ModalHeader>Terms and Conditions</ModalHeader>
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam mollitia
              perferendis reprehenderit, voluptate. Cum delectus dicta ducimus eligendi excepturi natus perferendis
              provident unde. Eveniet, iste, molestiae?
            </p>
          </ModalBody>
        </ModalDialog>
      </Modal>
      <Modal
        id="input-details-toggle-privacy-modal"
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      >
        <ModalDialog>
          <ModalHeader>Privacy Policy</ModalHeader>
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam mollitia
              perferendis reprehenderit, voluptate. Cum delectus dicta ducimus eligendi excepturi natus perferendis
              provident unde. Eveniet, iste, molestiae?
            </p>
          </ModalBody>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default InputDetailsWithToggle;
