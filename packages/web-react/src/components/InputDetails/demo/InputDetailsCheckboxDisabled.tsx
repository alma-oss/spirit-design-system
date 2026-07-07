import React from 'react';
import { Checkbox } from '../../Checkbox';
import { Link } from '../../Link';

const InputDetailsCheckboxDisabled = () => (
  <Checkbox
    id="input-details-checkbox-disabled"
    name="consent"
    label="I agree to the terms and conditions"
    isDisabled
    isRequired
    details={
      <>
        <span>We want to keep you informed</span>
        <Link elementType="button" color="inherit" underlined="always" isDisabled>
          See full terms and conditions
        </Link>
      </>
    }
  />
);

export default InputDetailsCheckboxDisabled;
