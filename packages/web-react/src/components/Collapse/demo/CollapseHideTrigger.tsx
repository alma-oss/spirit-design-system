import React from 'react';
import { Link } from '../../Link';
import Collapse from '../Collapse';
import { useCollapse } from '../useCollapse';

const CollapseHideTrigger = () => {
  const { isOpen, ariaProps } = useCollapse(false, { id: 'collapse-hide-trigger-id' });

  return (
    <p>
      Quis orci molestie, condimentum metus a lorem lorem fringilla sem lobortis libero rhoncus nullam, purus sapien
      aenean sed id tortor. Molestie quam, lectus quis ac nec suspendisse consectetur finibus a accumsan, bibendum dolor
      sit amet congue rhoncus erat. Semper turpis, varius iaculis venenatis ut congue sollicitudin nulla, convallis nibh
      maximus erat id aliquam. Nec interdum, auctor elit vitae pulvinar fusce gravida curabitur odio leo, nunc a mauris
      auctor. Vel integer, placerat pulvinar nisi nunc donec felis erat quis, phasellus ac nec phasellus ac nibh.
      Scelerisque fringilla, viverra nisl vel purus sed porttitor porttitor et iaculis commodo, vehicula urna purus
      ultrices.{' '}
      {!isOpen ? (
        <Link elementType="button" type="button" {...ariaProps.trigger}>
          … more
        </Link>
      ) : (
        ' '
      )}
      <Collapse {...ariaProps.panel} elementType="span" isOpen={isOpen}>
        Commodo metus a lorem, a aliquet vestibulum rutrum pharetra sapien sed, ullamcorper quis odio dolor ut aliquam.
        Rutrum suspendisse, fermentum tellus metus a lorem cursus volutpat proin bibendum, sed diam a duis id dui et
        tempus. Ligula non, sapien augue libero eget aliquam semper varius, posuere urna leo vitae ullamcorper.
        Venenatis posuere, sapien rhoncus dolor quis semper porttitor et vestibulum, odio leo ac nibh molestie placerat.
        Tellus suspendisse, dui lectus tellus quis eget sollicitudin dolor sit amet, dui ac nibh nulla mauris. Feugiat
        sollicitudin, integer bibendum at sem sapien non nullam sed id tortor, suscipit fusce gravida nec eget.
      </Collapse>
    </p>
  );
};

export default CollapseHideTrigger;
