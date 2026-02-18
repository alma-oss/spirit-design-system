import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BackgroundColors, TextAlignments } from '../../../constants';
import { Container } from '../../Container';
import { PADDING_BOTTOM, PADDING_TOP } from '../constants';
import Footer from '../Footer';
import ReadMe from '../README.md?raw';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'object',
    },
    backgroundColor: {
      control: 'select',
      options: [...Object.values(BackgroundColors)],
      table: {
        defaultValue: { summary: BackgroundColors.SECONDARY },
      },
    },
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'footer' },
        type: { summary: 'ElementType' },
      },
      description: 'The HTML element or React element used to render the footer, e.g. "footer", "div", "section"',
    },
    paddingBottom: {
      control: 'text',
      table: {
        defaultValue: { summary: 'space-1200' },
      },
    },
    paddingTop: {
      control: 'text',
      table: {
        defaultValue: { summary: 'space-1400' },
      },
    },
    textAlignment: {
      control: 'select',
      options: [...Object.values(TextAlignments), undefined],
      table: {
        defaultValue: { summary: undefined },
      },
    },
  },
  args: {
    children: <Container>Footer content</Container>,
    backgroundColor: BackgroundColors.SECONDARY,
    elementType: 'footer',
    paddingBottom: PADDING_BOTTOM,
    paddingTop: PADDING_TOP,
    textAlignment: TextAlignments.LEFT,
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Playground: Story = {
  name: 'Footer',
  render: (args) => <Footer {...args} />,
};
