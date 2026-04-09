'use client';

import React, { useState } from 'react';
import { type AccordionOpenStateType } from '../../../types';
import { Link } from '../../Link';
import { Pill } from '../../Pill';
import Accordion from '../Accordion';
import AccordionContent from '../AccordionContent';
import AccordionHeader from '../AccordionHeader';
import AccordionItem from '../AccordionItem';
import toggleValueByType from './toggleValueByType';

const AccordionBasic = () => {
  const [openState, setOpenState] = useState<AccordionOpenStateType>(['accordion-item-example-0']);

  const toggle = (id: string) => {
    setOpenState(toggleValueByType(id, openState));
  };

  return (
    <Accordion open={openState} toggle={toggle}>
      <AccordionItem id="accordion-item-example-0">
        <AccordionHeader>Accordion Item no. 1</AccordionHeader>
        <AccordionContent>
          Sit amet interdum, accumsan dolor sit amet posuere vel arcu mauris placerat non mauris, non sed vitae
          curabitur odio leo. Dignissim tristique, consequat vel arcu et nisi odio leo pretium accumsan condimentum at
          sem, mauris aenean aliquet enim. Neque sapien, volutpat erat id nunc facilisis eget ipsum phasellus, tellus
          ultricies sollicitudin ligula. Sem proin, nibh maximus donec nec commodo molestie nulla sapien nec commodo,
          commodo et fermentum et. Mauris posuere, mi orci et nisi et iaculis lorem fringilla sed mauris auctor, lorem
          tempus a pulvinar felis scelerisque. Suscipit vivamus, elit vel arcu lorem fringilla finibus quis sit amet
          ligula convallis, consectetur potenti aenean efficitur.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="accordion-item-example-1">
        <AccordionHeader
          slot={
            <>
              <Link href="/">Link</Link>
              <Pill color="selected">3</Pill>
            </>
          }
        >
          Accordion Item no. 2
        </AccordionHeader>
        <AccordionContent>
          Non suspendisse, maximus suscipit tortor non mauris bibendum felis scelerisque bibendum, nam augue scelerisque
          non nulla. Erat nec, integer nec egestas integer consequat cursus sed porttitor, dolor sit amet lorem ipsum
          consectetur porta. Condimentum urna, suspendisse mauris ligula duis id vivamus quis odio eget, integer ornare
          fermentum et vehicula. Consequat bibendum, dui fusce gravida iaculis urna integer vitae id, ante purus nullam
          et nisl. Accumsan arcu, nunc nulla faucibus purus vivamus facilisis augue, volutpat convallis eget suscipit.
          Tellus nunc ut enim et, urna fusce pulvinar fusce et mauris donec, vitae odio morbi risus aliquet. et.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="accordion-item-example-2">
        <AccordionHeader>Accordion Item no. 3</AccordionHeader>
        <AccordionContent>
          Sit amet interdum, accumsan dolor sit amet posuere vel arcu mauris placerat non mauris, non sed vitae
          curabitur odio leo. Dignissim tristique, consequat vel arcu et nisi odio leo pretium accumsan condimentum at
          sem, mauris aenean aliquet enim. Neque sapien, volutpat erat id nunc facilisis eget ipsum phasellus, tellus
          ultricies sollicitudin ligula. Sem proin, nibh maximus donec nec commodo molestie nulla sapien nec commodo,
          commodo et fermentum et. Mauris posuere, mi orci et nisi et iaculis lorem fringilla sed mauris auctor, lorem
          tempus a pulvinar felis scelerisque. Suscipit vivamus, elit vel arcu lorem fringilla finibus quis sit amet
          ligula convallis, consectetur potenti aenean efficitur.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="accordion-item-example-3">
        <AccordionHeader slot={<Pill color="selected">3</Pill>}>
          Augue iaculis, quis ante sapien aliquam aliquam non cursus, vestibulum nunc ipsum maximus. Libero sed non
          nulla, condimentum lorem ipsum molestie integer curabitur rutrum curabitur, tellus pulvinar libero tempus
        </AccordionHeader>
        <AccordionContent>
          Non suspendisse, maximus suscipit tortor non mauris bibendum felis scelerisque bibendum, nam augue scelerisque
          non nulla. Erat nec, integer nec egestas integer consequat cursus sed porttitor, dolor sit amet lorem ipsum
          consectetur porta. Condimentum urna, suspendisse mauris ligula duis id vivamus quis odio eget, integer ornare
          fermentum et vehicula. Consequat bibendum, dui fusce gravida iaculis urna integer vitae id, ante purus nullam
          et nisl. Accumsan arcu, nunc nulla faucibus purus vivamus facilisis augue, volutpat convallis eget suscipit.
          Tellus nunc ut enim et, urna fusce pulvinar fusce et mauris donec, vitae odio morbi risus aliquet. et.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionBasic;
