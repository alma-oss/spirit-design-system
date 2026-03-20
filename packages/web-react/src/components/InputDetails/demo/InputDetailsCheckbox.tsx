import React, { useState } from 'react';
import { Checkbox } from '../../Checkbox';
import { Link } from '../../Link';
import { Modal, ModalBody, ModalDialog, ModalHeader } from '../../Modal';

const InputDetailsCheckbox = () => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  return (
    <>
      <Checkbox
        id="input-details-checkbox"
        name="consent"
        label={<span className="typography-body-medium-semibold">I agree to the terms and conditions</span>}
        isRequired
        details={
          <Link elementType="button" color="inherit" underlined="always" onClick={() => setIsTermsModalOpen(true)}>
            See full terms and conditions
          </Link>
        }
      />
      <Modal
        id="input-details-checkbox-terms-modal"
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      >
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
    </>
  );
};

export default InputDetailsCheckbox;
