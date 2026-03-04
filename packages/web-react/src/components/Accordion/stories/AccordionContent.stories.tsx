import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { type AccordionContentProps, type AccordionOpenStateType } from '../../../types';
import { Link } from '../../Link';
import { Pill } from '../../Pill';
import toggleValueByType from '../demo/toggleValueByType';
import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from '..';
import content from './content';

const meta: Meta<typeof AccordionContent> = {
  title: 'Components/Accordion',
  component: AccordionContent,
  argTypes: {
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Accordion Content',
  },
};

export default meta;
type Story = StoryObj<typeof AccordionContent>;

const AccordionWithHooks = (args: AccordionContentProps) => {
  const [openState, setOpenState] = useState<AccordionOpenStateType>('accordion-item-example-0');

  const toggle = (id: string) => {
    setOpenState(toggleValueByType(id, openState));
  };

  return (
    <Accordion open={openState} toggle={toggle}>
      <AccordionItem id="accordion-item-example-0">
        <AccordionHeader
          slot={
            <>
              <Link href="/">Link</Link>
              <Pill>3</Pill>
            </>
          }
        >
          Accordion Header #0
        </AccordionHeader>
        <AccordionContent {...args} />
      </AccordionItem>
      <AccordionItem id="accordion-item-example-1">
        <AccordionHeader slot={<Pill>3</Pill>}>Accordion Header #1</AccordionHeader>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
      <AccordionItem id="accordion-item-example-2">
        <AccordionHeader>Accordion Header #2</AccordionHeader>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
      <AccordionItem id="accordion-item-example-3">
        <AccordionHeader slot={<Pill>3</Pill>}>Accordion Header #3</AccordionHeader>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const AccordionContentPlayground: Story = {
  name: 'AccordionContent',
  render: (args) => <AccordionWithHooks {...args} />,
};
