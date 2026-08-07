// url=<FIGMA_FILE_ID>?node-id=8579%3A3560
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Accordion/Accordion.tsx
// component=Accordion

import figma from 'figma';
import { getInstance, getText } from '../../../figma/helpers';

const instance = getInstance();

const isOpen = instance.getEnum('Open', { True: true, False: false });
const showPill = instance.getBoolean('Show Pill');
const headerText = getText(instance, 'Action');

let pillCode;
if (showPill) {
  const pill = instance.findInstance('Pill');
  if (pill && pill.type === 'INSTANCE') {
    pillCode = pill.executeTemplate().example;
  }
}

export default {
  id: 'Accordion',
  imports: [
    "import { useState } from 'react';",
    "import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from '@alma-oss/spirit-web-react';",
  ],
  example: figma.code`
    function Example() {
      const [openState, setOpenState] = useState(${isOpen ? "'accordion-item-0'" : 'undefined'});

      return (
        <Accordion
          open={openState}
          toggle={() => setOpenState(openState === 'accordion-item-0' ? undefined : 'accordion-item-0')}
        >
          <AccordionItem id="accordion-item-0">
            <AccordionHeader${pillCode ? figma.code` slot={${pillCode}}` : ''}>
              ${headerText}
            </AccordionHeader>
            <AccordionContent>Accordion content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    }`,
};
