import React from 'react';
import { useDisclosureState } from '../../../hooks/disclosure';
import { Button } from '../../Button';
import Collapse from '../Collapse';

const CollapseDefault = () => {
  const { isExpanded, toggle } = useDisclosureState({ defaultExpanded: false });

  return (
    <>
      <Button onClick={toggle}>Collapse trigger</Button>
      <Collapse id="collapse-default-id" isOpen={isExpanded}>
        Aliquam varius, consequat posuere a lacinia mauris eu tellus condimentum ut id ante, accumsan vehicula nulla
        neque. Mauris mi orci, in donec nullam odio leo sapien et vehicula nunc a lacinia, fermentum arcu ullamcorper
        posuere. Mauris euismod, ac nec ante fermentum praesent nisi commodo neque placerat, vivamus dui et tempus
        pulvinar suspendisse. Porttitor eget, sollicitudin hendrerit bibendum nulla aliquam sit amet leo vitae, eget
        consectetur diam a vestibulum. Adipiscing lorem ipsum, arcu condimentum posuere semper morbi condimentum dui,
        bibendum nunc aenean facilisis. Phasellus euismod, donec sem odio ligula praesent finibus nibh convallis,
        tristique aliquam sed id tortor sem lobortis.
      </Collapse>
    </>
  );
};

export default CollapseDefault;
