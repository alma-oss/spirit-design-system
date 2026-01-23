import React, { type ChangeEvent, useState } from 'react';
import { type PlacementDictionaryType } from '../../../types';
import { Button } from '../../Button';
import { Grid, GridItem } from '../../Grid';
import { Item } from '../../Item';
import { Radio } from '../../Radio';
import Dropdown from '../Dropdown';
import DropdownPopover from '../DropdownPopover';
import DropdownTrigger from '../DropdownTrigger';

const DropdownPlacements = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState<PlacementDictionaryType>('bottom-start');
  const onToggle = () => setIsOpen(!isOpen);

  const handlePlacementChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlacement(e.target.value as PlacementDictionaryType);
  };

  return (
    <form autoComplete="off">
      <Grid cols={3} marginX="auto" UNSAFE_style={{ alignItems: 'center', justifyItems: 'center', maxWidth: '40rem' }}>
        <GridItem columnStart={2} rowStart={1}>
          <Radio
            name="placement"
            isChecked={placement === 'top-start'}
            isLabelHidden
            onChange={handlePlacementChange}
            id="placement-top-start"
            label="top-start"
            value="top-start"
          />{' '}
          <Radio
            name="placement"
            isChecked={placement === 'top'}
            isLabelHidden
            onChange={handlePlacementChange}
            id="placement-top"
            label="top"
            value="top"
          />{' '}
          <Radio
            name="placement"
            isChecked={placement === 'top-end'}
            isLabelHidden
            onChange={handlePlacementChange}
            id="placement-top-end"
            label="top-end"
            value="top-end"
          />
        </GridItem>
        <GridItem columnStart={2} rowStart={3}>
          <Radio
            name="placement"
            isChecked={placement === 'bottom-start'}
            isLabelHidden
            onChange={handlePlacementChange}
            id="placement-bottom-start"
            label="bottom-start"
            value="bottom-start"
          />{' '}
          <Radio
            name="placement"
            isChecked={placement === 'bottom'}
            isLabelHidden
            onChange={handlePlacementChange}
            id="placement-bottom"
            label="bottom"
            value="bottom"
          />{' '}
          <Radio
            name="placement"
            isChecked={placement === 'bottom-end'}
            isLabelHidden
            onChange={handlePlacementChange}
            id="placement-bottom-end"
            label="bottom-end"
            value="bottom-end"
          />
        </GridItem>
        <GridItem
          columnStart={1}
          rowStart={2}
          UNSAFE_style={{ display: 'flex', flexDirection: 'column', justifySelf: 'start' }}
        >
          <Radio
            name="placement"
            isChecked={placement === 'left-start'}
            isLabelHidden
            onChange={handlePlacementChange}
            id="placement-left-start"
            label="left-start"
            value="left-start"
          />
          <Radio
            name="placement"
            isChecked={placement === 'left'}
            isLabelHidden
            onChange={handlePlacementChange}
            id="placement-left"
            label="left"
            value="left"
          />
          <Radio
            name="placement"
            isChecked={placement === 'left-end'}
            isLabelHidden
            onChange={handlePlacementChange}
            id="placement-left-end"
            label="left-end"
            value="left-end"
          />
        </GridItem>
        <GridItem
          columnStart={3}
          rowStart={2}
          UNSAFE_style={{ display: 'flex', flexDirection: 'column', justifySelf: 'end' }}
        >
          <Radio
            name="placement"
            isChecked={placement === 'right-start'}
            isLabelHidden
            onChange={handlePlacementChange}
            id="placement-right-start"
            label="right-start"
            value="right-start"
          />
          <Radio
            name="placement"
            isChecked={placement === 'right'}
            isLabelHidden
            onChange={handlePlacementChange}
            id="placement-right"
            label="right"
            value="right"
          />
          <Radio
            name="placement"
            isChecked={placement === 'right-end'}
            isLabelHidden
            onChange={handlePlacementChange}
            id="placement-right-end"
            label="right-end"
            value="right-end"
          />
        </GridItem>
        <GridItem columnStart={2} rowStart={2}>
          <Dropdown
            enableAutoClose={false}
            id="dropdown-default"
            isOpen={isOpen}
            onToggle={onToggle}
            placement={placement}
            UNSAFE_style={{ margin: '8rem auto' }}
          >
            <DropdownTrigger elementType={Button}>
              <span style={{ whiteSpace: 'nowrap' }}>{placement}</span>
            </DropdownTrigger>
            <DropdownPopover>
              <Item elementType="a" href="#" label="Action" />
              <Item elementType="a" href="#" label="Another action" />
              <Item elementType="a" href="#" label="Something else here" />
            </DropdownPopover>
          </Dropdown>
        </GridItem>
      </Grid>
    </form>
  );
};

export default DropdownPlacements;
