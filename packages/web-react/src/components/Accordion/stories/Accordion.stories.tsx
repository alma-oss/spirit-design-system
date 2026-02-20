import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React, { type ElementType, useState } from 'react';
import { type AccordionOpenStateType, type SpiritAccordionProps } from '../../../types';
import { Link } from '../../Link';
import { Pill } from '../../Pill';
import toggleValueByType from '../demo/toggleValueByType';
import ReadMe from '../README.md?raw';
import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from '..';
import content from './content';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'section' },
      },
    },
    open: {
      control: 'text',
    },
    toggle: {
      control: 'text',
    },
  },
  args: {
    elementType: 'section',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const AccordionWithHooks = (args: SpiritAccordionProps<ElementType>) => {
  const [openState, setOpenState] = useState<AccordionOpenStateType>('accordion-item-example-1');

  const toggle = (id: string) => {
    setOpenState(toggleValueByType(id, openState));
  };

  return (
    <Accordion {...args} open={openState} toggle={toggle}>
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
    </Accordion>
  );
};

export const Playground: Story = {
  name: 'Accordion',
  render: (args) => <AccordionWithHooks {...args} />,
};
