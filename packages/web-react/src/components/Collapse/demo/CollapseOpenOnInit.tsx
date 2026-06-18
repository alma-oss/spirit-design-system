import React from 'react';
import { useDisclosureState } from '../../../hooks/disclosure';
import { Button } from '../../Button';
import Collapse from '../Collapse';

const CollapseOpenOnInit = () => {
  const { isExpanded, toggle } = useDisclosureState({ defaultExpanded: true });

  return (
    <>
      <Button onClick={toggle}>Collapse trigger</Button>
      <Collapse id="collapse-open-on-init-id" isOpen={isExpanded}>
        Cras dictum ante, mollis ollicitudin proin bibendum nec commodo consequat fusce ante, consequat venenatis
        suscipit odio morbi. Dolor sit amet porta, placerat tristique sit amet ligula nisl risus et vehicula, suscipit
        accumsan nunc curabitur. Et neque, augue ut nulla a sed porta scelerisque proin, elit sapien lacinia felis.
        Lorem nulla, iaculis ornare in donec ac nibh libero nisl ornare, elementum luctus sem aliquam consequat. Elit et
        iaculis, enim in quam neque facilisis cursus integer hendrerit, non nulla vulputate condimentum auctor. Turpis
        varius, scelerisque maximus iaculis efficitur bibendum et nisi sapien, ut nunc ut enim et sem lobortis at sem.
      </Collapse>
    </>
  );
};

export default CollapseOpenOnInit;
