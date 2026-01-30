import React, { useState } from 'react';
import { Box } from '../../Box';
import { Button } from '../../Button';
import { Grid } from '../../Grid';
import { Item } from '../../Item';
import Dropdown from '../Dropdown';
import DropdownPopover from '../DropdownPopover';
import DropdownTrigger from '../DropdownTrigger';

const DropdownAlignment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen(!isOpen);

  return (
    <Grid cols={2}>
      <Dropdown
        alignmentX={{ mobile: 'right', tablet: 'left', desktop: 'center' }}
        alignmentY="center"
        id="dropdown-alignment"
        isOpen={isOpen}
        onToggle={onToggle}
        placement="bottom"
      >
        <DropdownTrigger elementType={Button}>Button as anchor</DropdownTrigger>
        <DropdownPopover>
          <Item elementType="a" href="#" label="Action" />
          <Item elementType="a" href="#" label="Another action" />
          <Item elementType="a" href="#" label="Something else here" />
        </DropdownPopover>
      </Dropdown>
      <Box paddingX="space-800" paddingY="space-1300" backgroundColor="tertiary" UNSAFE_className="text-center">
        This is a big unrelated box to demonstrate the Dropdown Trigger alignment
      </Box>
    </Grid>
  );
};

export default DropdownAlignment;
