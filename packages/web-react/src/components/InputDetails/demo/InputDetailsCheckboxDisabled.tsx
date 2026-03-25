import React from 'react';
import { Checkbox } from '../../Checkbox';
import { Link } from '../../Link';
import { Text } from '../../Text';

const InputDetailsCheckboxDisabled = () => (
  <Checkbox
    id="input-details-checkbox-disabled"
    name="consent"
    label={<span className="typography-body-medium-semibold">I agree to the terms and conditions</span>}
    isDisabled
    isRequired
    details={
      <>
        <Text marginBottom="space-0">We want to keep you informed</Text>
        <Link elementType="button" color="inherit" underlined="always" isDisabled>
          See full terms and conditions
        </Link>
      </>
    }
  />
);

export default InputDetailsCheckboxDisabled;
