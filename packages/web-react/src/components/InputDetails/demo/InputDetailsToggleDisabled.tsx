import React from 'react';
import { Link } from '../../Link';
import { Toggle } from '../../Toggle';

const InputDetailsWithToggleDisabled = () => (
  <Toggle
    id="input-details-toggle-disabled"
    name="consent"
    label="I agree to the terms and conditions"
    isDisabled
    isRequired
    inputPosition="end"
    validationState="danger"
    helperText="Please read the documents carefully before agreeing"
    validationText="You must agree to continue"
    details={
      <>
        <Link elementType="button" color="inherit" underlined="always" isDisabled>
          See full terms and conditions
        </Link>
        <Link elementType="button" color="inherit" underlined="always" isDisabled>
          See privacy policy
        </Link>
      </>
    }
  />
);

export default InputDetailsWithToggleDisabled;
