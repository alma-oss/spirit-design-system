import React from 'react';
import { Button, ButtonLink } from '../../Button';
import Collapse from '../Collapse';
import { useCollapse } from '../useCollapse';

const CollapseMultipleTriggers = () => {
  const { isOpen, ariaProps } = useCollapse(false, { id: 'collapse-multiple-triggers-id' });
  // Only one trigger may carry the generated `id` — the others still need matching aria-expanded/aria-controls/onClick.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _triggerId, ...sharedTriggerAriaProps } = ariaProps.trigger;

  return (
    <>
      <Button {...ariaProps.trigger}>Collapse trigger</Button>
      <Collapse {...ariaProps.panel} isOpen={isOpen}>
        Aliquam varius, consequat posuere a lacinia mauris eu tellus condimentum ut id ante, accumsan vehicula nulla
        neque. Mauris mi orci, in donec nullam odio leo sapien et vehicula nunc a lacinia, fermentum arcu ullamcorper
        posuere. Mauris euismod, ac nec ante fermentum praesent nisi commodo neque placerat, vivamus dui et tempus
        pulvinar suspendisse. Porttitor eget, sollicitudin hendrerit bibendum nulla aliquam sit amet leo vitae, eget
        consectetur diam a vestibulum. Adipiscing lorem ipsum, arcu condimentum posuere semper morbi condimentum dui,
        bibendum nunc aenean facilisis. Phasellus euismod, donec sem odio ligula praesent finibus nibh convallis,
        tristique aliquam sed id tortor sem lobortis.
      </Collapse>
      <Button {...sharedTriggerAriaProps} color="secondary">
        Secondary trigger
      </Button>{' '}
      <ButtonLink {...sharedTriggerAriaProps} color="tertiary">
        Tertiary trigger
      </ButtonLink>
    </>
  );
};

export default CollapseMultipleTriggers;
