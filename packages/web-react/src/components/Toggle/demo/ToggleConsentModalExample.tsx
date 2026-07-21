import React, { useState } from 'react';
import { Button } from '../../Button';
import { Link } from '../../Link';
import { Modal } from '../../Modal';
import ModalBody from '../../Modal/ModalBody';
import ModalDialog from '../../Modal/ModalDialog';
import ModalFooter from '../../Modal/ModalFooter';
import ModalHeader from '../../Modal/ModalHeader';
import { Text } from '../../Text';
import Toggle from '../Toggle';

const ToggleConsentModalExample = () => {
  const [isTermsOpen, setTermsOpen] = useState(false);

  return (
    <>
      <Toggle
        id="consent-with-modal-example"
        name="consentWithModalExample"
        label="I agree to the terms and conditions"
        isRequired
        details={
          <>
            <Text size="small" marginBottom="space-0">
              Please review our terms and conditions before you agree.
            </Text>
            <Link elementType="button" color="inherit" underlined="always" onClick={() => setTermsOpen(true)}>
              See full terms and conditions
            </Link>
          </>
        }
      />

      <Modal id="consent-with-modal-terms-modal" isOpen={isTermsOpen} onClose={() => setTermsOpen(false)}>
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
    </>
  );
};

export default ToggleConsentModalExample;
