import React from 'react';
import { useDisclosureState } from '../../../hooks/disclosure';
import { Button } from '../../Button';
import Collapse from '../Collapse';

const CollapseHelperClass = () => {
  const { isExpanded, toggle } = useDisclosureState({ defaultExpanded: false });

  return (
    <>
      <p>
        Ante rhoncus, tristique nunc et elit id in ex sem consectetur id, consectetur et elit nibh sed ac. Sed ac
        convallis, sem lobortis convallis et nisi sapien in ex sem ullamcorper iaculis, aliquet sem lobortis
        pellentesque sit amet. Congue nulla congue, porttitor quis orci quam elit rutrum scelerisque nibh maximus, felis
        a integer maximus praesent. Metus varius, at sem dui vivamus elementum luctus nisl sit amet dolor sit amet,
        mauris et iaculis nec fermentum. Augue sapien, nisl vel purus nullam odio morbi a fusce vitae mattis vitae,
        posuere tristique bibendum aliquam. In donec dolor ut, imperdiet quam fermentum molestie vulputate scelerisque
        ac nec, tortor mi orci sollicitudin elementum.
      </p>
      <Collapse id="collapse-helper-class-id" isOpen={isExpanded}>
        Aliquam varius, consequat posuere a lacinia mauris eu tellus condimentum ut id ante, accumsan vehicula nulla
        neque. Mauris mi orci, in donec nullam odio leo sapien et vehicula nunc a lacinia, fermentum arcu ullamcorper
        posuere. Mauris euismod, ac nec ante fermentum praesent nisi commodo neque placerat, vivamus dui et tempus
        pulvinar suspendisse. Porttitor eget, sollicitudin hendrerit bibendum nulla aliquam sit amet leo vitae, eget
        consectetur diam a vestibulum. Adipiscing lorem ipsum, arcu condimentum posuere semper morbi condimentum dui,
        bibendum nunc aenean facilisis. Phasellus euismod, donec sem odio ligula praesent finibus nibh convallis,
        tristique aliquam sed id tortor sem lobortis.
      </Collapse>
      <Button onClick={toggle} aria-expanded={isExpanded}>
        <span className="accessibility-open">Show less</span>
        <span className="accessibility-closed">Show more</span>
      </Button>
      <a href="#" role="button" onClick={toggle} aria-expanded={isExpanded}>
        <span className="accessibility-open">Show less</span>
        <span className="accessibility-closed">Show more</span>
      </a>
    </>
  );
};

export default CollapseHelperClass;
