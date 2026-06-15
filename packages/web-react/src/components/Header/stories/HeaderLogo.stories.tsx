import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ProductLogo } from '../../ProductLogo';
import { defaultSvgLogo } from '../../ProductLogo/demo/ProductLogoDefault';
import HeaderLogo from '../HeaderLogo';
import ReadMe from '../README.md?raw';

const meta: Meta<typeof HeaderLogo> = {
  title: 'Components/Header',
  component: HeaderLogo,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  args: {
    children: <ProductLogo>{defaultSvgLogo}</ProductLogo>,
    'aria-label': 'JobBoard homepage',
  },
};

export default meta;
type Story = StoryObj<typeof HeaderLogo>;

export const HeaderLogoPlayground: Story = {
  name: 'HeaderLogo',
};
