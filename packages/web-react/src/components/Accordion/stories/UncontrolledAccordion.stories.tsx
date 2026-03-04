import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Link } from '../../Link';
import { Pill } from '../../Pill';
import { type Accordion, AccordionContent, AccordionHeader, AccordionItem, UncontrolledAccordion } from '..';
import content from './content';

const meta: Meta<typeof UncontrolledAccordion> = {
  title: 'Components/Accordion',
  component: UncontrolledAccordion,
  argTypes: {
    defaultOpen: {
      control: 'object',
    },
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'section' },
      },
    },
    stayOpen: {
      control: 'boolean',
    },
  },
  args: {
    defaultOpen: ['accordion-item-example-1'],
    elementType: 'section',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const UncontrolledAccordionPlayground: Story = {
  name: 'UncontrolledAccordion',
  render: (args) => (
    <UncontrolledAccordion {...args} id="accordion-example">
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
        <AccordionContent>{content}</AccordionContent>
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
    </UncontrolledAccordion>
  ),
};
