import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { type ComponentProps, type ReactNode } from 'react';
import { IconBox } from '../../IconBox';
import CardArtwork from '../CardArtwork';

const meta: Meta<typeof CardArtwork> = {
  title: 'Components/Card/Figma',
  component: CardArtwork,
  tags: ['!autodocs', 'figma'],
  parameters: {
    design: {
      type: 'figma',
      url: '<FIGMA_FILE_ID>?node-id=37173%3A2084',
      props: {
        type: figma.enum('Type', {
          Iconbox: <IconBox color="01" iconName="add" shape="rounded" isSubtle />,
          Illustration: 'Replace with illustration',
        }),
      },
      examples: ['FigmaCardArtwork'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardArtwork>;

export const FigmaCardArtwork: Story = {
  name: 'Card Artwork',
  render: ({ type, ...props }: ComponentProps<typeof CardArtwork> & { type?: ReactNode }) => (
    <CardArtwork {...props}>{type}</CardArtwork>
  ),
};
