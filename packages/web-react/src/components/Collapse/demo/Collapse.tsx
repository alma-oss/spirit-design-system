// Because there is no `dist` directory during the CI run
/* eslint-disable react-refresh/only-export-components -- Demo file exports constants alongside components */
import { type StoryFn } from '@storybook/react';
import React from 'react';
import { Button } from '../../Button';
import { Collapse, useCollapse } from '../index';

export const content = (
  <>
    <p>
      Condimentum odio, pulvinar et sollicitudin accumsan ac hendrerit vestibulum commodo, molestie laoreet dui sit
      amet. Molestie consectetur, sed ac felis scelerisque lectus accumsan purus id dolor sed vitae, praesent aliquam
      dolor quis ornare. Nulla sit amet, rhoncus at quis odio et iaculis lacinia suscipit vivamus sodales, nunc id
      condimentum felis. Consectetur nec commodo, praesent et elit magna purus molestie cursus molestie, libero ut
      venenatis erat id et nisi. Quam posuere, aliquam quam leo vitae tellus semper eget nunc, ultricies adipiscing sit
      amet accumsan. Lorem rutrum, porttitor ante mauris suspendisse ultricies consequat purus, congue a commodo magna
      et.
    </p>
    <p>
      Nunc potenti, mauris sollicitudin purus augue justo et condimentum, vivamus a ornare consequat. Aliquet ut, metus
      libero vitae volutpat felis a iaculis sapien dolor quis, augue fermentum donec urna. Sem facilisis, finibus non
      mauris suspendisse varius et nisi egestas potenti, praesent interdum nulla sem. Sodales dui, quam sagittis sapien
      elit lorem fringilla hendrerit nunc, porttitor quis dolor ut sit amet. Scelerisque aliquet, maximus integer cursus
      fusce vitae proin lacinia sed vitae, bibendum suspendisse nunc ut enim et at. Sem turpis, iaculis a eget non
      mauris nulla vitae augue, molestie porttitor luctus bibendum.
    </p>
  </>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CollapseTrigger = ({ isOpen, ...rest }: any) => (
  <Button {...rest}>Collapse Trigger ({isOpen ? 'Open' : 'Closed'})</Button>
);

const Story: StoryFn<typeof Collapse> = () => {
  const { isOpen, toggleHandler } = useCollapse(false);

  return (
    <div>
      {content}
      <CollapseTrigger isOpen={isOpen} onClick={toggleHandler} />
      <Collapse id="collapse-id" isOpen={isOpen}>
        {content}
      </Collapse>
    </div>
  );
};

export default Story;
