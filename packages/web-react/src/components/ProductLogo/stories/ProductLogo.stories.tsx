import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { defaultSvgLogo } from '../demo/ProductLogoDefault';
import ProductLogo from '../ProductLogo';
import ReadMe from '../README.md?raw';

const meta: Meta<typeof ProductLogo> = {
  title: 'Components/ProductLogo',
  component: ProductLogo,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  args: {
    children: defaultSvgLogo,
  },
};

export default meta;
type Story = StoryObj<typeof ProductLogo>;

export const Default: Story = {
  name: 'ProductLogo',
};
