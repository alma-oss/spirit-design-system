import React, { useState } from 'react';
import { Button } from '../../Button';
import { Link } from '../../Link';
import { Modal } from '../../Modal';
import ModalBody from '../../Modal/ModalBody';
import ModalDialog from '../../Modal/ModalDialog';
import ModalFooter from '../../Modal/ModalFooter';
import ModalHeader from '../../Modal/ModalHeader';
import Toggle from '../Toggle';

const ToggleConsentFullExample = () => {
  const [isTermsOpen, setTermsOpen] = useState(false);
  const [isPrivacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <Toggle
        id="consent-full-example"
        name="consentFullExample"
        label="I agree to the terms and privacy policy"
        isRequired
        helperText="Please read the documents carefully before agreeing"
        validationState="danger"
        validationText="You must agree to continue"
        details={
          <>
            <Link elementType="button" color="inherit" underlined="always" onClick={() => setTermsOpen(true)}>
              See full terms and conditions
            </Link>
            <Link elementType="button" color="inherit" underlined="always" onClick={() => setPrivacyOpen(true)}>
              See privacy policy
            </Link>
          </>
        }
      />

      <Modal id="toggle-terms-modal" isOpen={isTermsOpen} onClose={() => setTermsOpen(false)}>
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
            <Button onClick={() => setTermsOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalDialog>
      </Modal>

      <Modal id="toggle-privacy-modal" isOpen={isPrivacyOpen} onClose={() => setPrivacyOpen(false)}>
        <ModalDialog>
          <ModalHeader>Privacy Policy</ModalHeader>
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam mollitia
              perferendis reprehenderit, voluptate. Cum delectus dicta ducimus eligendi excepturi natus perferendis
              provident unde. Eveniet, iste, molestiae?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setPrivacyOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default ToggleConsentFullExample;
