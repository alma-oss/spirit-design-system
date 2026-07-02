import { type Placement } from '@floating-ui/react';
import React, { type ChangeEvent, useState } from 'react';
import DocsBox from '../../../../docs/DocsBox';
import { Grid, GridItem } from '../../Grid';
import { Radio } from '../../Radio';
import { Stack } from '../../Stack';
import Tooltip from '../Tooltip';
import TooltipPopover from '../TooltipPopover';
import TooltipTrigger from '../TooltipTrigger';

const TooltipPlacements = () => {
  const [placement, setPlacement] = useState<Placement>('bottom');

  const handlePlacementChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlacement(event.target.value as Placement);
  };

  return (
    <form autoComplete="off">
      <Grid cols={3} marginX="auto" UNSAFE_style={{ alignItems: 'center', justifyItems: 'center', maxWidth: '30rem' }}>
        <GridItem columnStart={2} rowStart={1}>
          <div className="my-500">
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
          </div>
        </GridItem>
        <GridItem columnStart={2} rowStart={3}>
          <div className="my-500">
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
          </div>
        </GridItem>
        <GridItem
          columnStart={1}
          rowStart={2}
          UNSAFE_style={{ display: 'flex', flexDirection: 'column', justifySelf: 'start' }}
        >
          <Stack>
            <Radio
              name="placement"
              isChecked={placement === 'left-start'}
              isLabelHidden
              onChange={handlePlacementChange}
              id="placement-left-start"
              label="left-start"
              value="left-start"
            />{' '}
            <Radio
              name="placement"
              isChecked={placement === 'left'}
              isLabelHidden
              onChange={handlePlacementChange}
              id="placement-left"
              label="left"
              value="left"
            />{' '}
            <Radio
              name="placement"
              isChecked={placement === 'left-end'}
              isLabelHidden
              onChange={handlePlacementChange}
              id="placement-left-end"
              label="left-end"
              value="left-end"
            />
          </Stack>
        </GridItem>
        <GridItem
          columnStart={3}
          rowStart={2}
          UNSAFE_style={{ display: 'flex', flexDirection: 'column', justifySelf: 'end' }}
        >
          <Stack>
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
          </Stack>
        </GridItem>
        <GridItem columnStart={2} rowStart={2}>
          <div className="mx-auto space-1600">
            <Tooltip
              isOpen
              id="tooltip-placement"
              placement={placement as Placement}
              onToggle={() => {}}
              enableFlipping={false}
            >
              <TooltipTrigger elementType="div" UNSAFE_style={{ margin: '5rem auto' }}>
                <DocsBox UNSAFE_className="px-1100 py-1100">
                  Click
                  <br /> the dots!
                </DocsBox>
              </TooltipTrigger>
              <TooltipPopover>{placement}</TooltipPopover>
            </Tooltip>
          </div>
        </GridItem>
      </Grid>
    </form>
  );
};

export default TooltipPlacements;
