import React, { useState } from 'react';
import { Button } from '../../Button';
import { Link } from '../../Link';
import { Modal } from '../../Modal';
import ModalBody from '../../Modal/ModalBody';
import ModalDialog from '../../Modal/ModalDialog';
import ModalFooter from '../../Modal/ModalFooter';
import ModalHeader from '../../Modal/ModalHeader';
import Toggle from '../Toggle';

const ToggleConsentEmphasizedLabel = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Toggle
        id="consent-emphasized-label"
        name="consentEmphasizedLabel"
        label={<span className="typography-body-medium-semibold">I agree to the terms and conditions</span>}
        isRequired
        details={
          <Link elementType="button" color="inherit" underlined="always" onClick={() => setModalOpen(true)}>
            See full terms and conditions
          </Link>
        }
      />

      <Modal id="toggle-terms-modal" isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalDialog>
          <ModalHeader>Terms and Conditions</ModalHeader>
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam mollitia
              perferendis reprehenderit, voluptate. Cum delectus dicta ducimus eligendi excepturi natus perferendis
              provident unde. Eveniet, iste, molestiae?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setModalOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default ToggleConsentEmphasizedLabel;
