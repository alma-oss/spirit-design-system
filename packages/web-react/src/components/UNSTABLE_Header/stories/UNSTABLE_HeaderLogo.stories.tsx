import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProductLogo } from '../../ProductLogo';
import { defaultSvgLogo } from '../../ProductLogo/demo/ProductLogoDefault';
import ReadMe from '../README.md?raw';
import UNSTABLE_HeaderLogo from '../UNSTABLE_HeaderLogo';

const meta: Meta<typeof UNSTABLE_HeaderLogo> = {
  title: 'Experimental/UNSTABLE_Header',
  component: UNSTABLE_HeaderLogo,
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
type Story = StoryObj<typeof UNSTABLE_HeaderLogo>;

export const HeaderLogoPlayground: Story = {
  name: 'UNSTABLE_HeaderLogo',
};
