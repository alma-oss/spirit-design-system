'use client';

import { Button, DropdownTrigger, UncontrolledDropdown } from '@alma-oss/spirit-web-react';
import React from 'react';

const DropdownPreview = () => (
  <UncontrolledDropdown id="card-dropdown">
    <DropdownTrigger elementType={Button} color="primary" size="medium">
      Dropdown
    </DropdownTrigger>
  </UncontrolledDropdown>
);

export default DropdownPreview;
