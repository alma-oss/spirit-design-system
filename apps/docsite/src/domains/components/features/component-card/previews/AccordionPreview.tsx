import { AccordionContent, AccordionHeader, AccordionItem, UncontrolledAccordion } from '@alma-oss/spirit-web-react';
import React from 'react';
import type { PreviewComponent } from '../../component-catalog';
import { PREVIEW_GUIDES } from '../../component-catalog/constants/previewGuides';

const AccordionPreview: PreviewComponent = () => (
  <UncontrolledAccordion UNSAFE_style={{ width: 320 }}>
    <AccordionItem id="card-accordion-1">
      <AccordionHeader>How do I get started?</AccordionHeader>
      <AccordionContent>Create an account and follow the short setup guide.</AccordionContent>
    </AccordionItem>
    <AccordionItem id="card-accordion-2">
      <AccordionHeader>Can I change my plan later?</AccordionHeader>
      <AccordionContent>Yes, you can switch plans at any time.</AccordionContent>
    </AccordionItem>
  </UncontrolledAccordion>
);

AccordionPreview.guides = PREVIEW_GUIDES.VERTICAL;

export default AccordionPreview;
