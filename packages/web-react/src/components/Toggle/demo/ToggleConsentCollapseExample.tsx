import React, { useState } from 'react';
import { Collapse, useCollapse } from '../../Collapse';
import { Link } from '../../Link';
import { Text } from '../../Text';
import Toggle from '../Toggle';

const ToggleConsentCollapseExample = () => {
  const [isChecked, setChecked] = useState(true);
  const { isOpen, toggleHandler } = useCollapse(false);

  return (
    <Toggle
      id="consent-with-collapse-example"
      name="consentWithCollapseExample"
      label="Notifications about similar positions from this company"
      isChecked={isChecked}
      onChange={() => setChecked(!isChecked)}
      details={
        <>
          <Text size="small" marginBottom="space-0">
            I agree that Bright Horizon Ltd., Nova Talent Group, Summit Recruiting Co., Blueharbor Staffing Inc. and
            Ironclad Careers Ltd. may let me know when they have another suitable position for me.
          </Text>
          <Link elementType="button" color="inherit" underlined="always" onClick={toggleHandler} aria-expanded={isOpen}>
            Show more
          </Link>
          <Collapse id="consent-with-collapse-example-details" isOpen={isOpen}>
            <p>
              You can withdraw this consent at any time in your account settings or by contacting our support team.
              Withdrawing your consent will not affect the lawfulness of any processing carried out before that point.
            </p>
          </Collapse>
        </>
      }
    />
  );
};

export default ToggleConsentCollapseExample;
