import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TruncateModes } from '../../../types';
import ReadMe from '../README.md?raw';
import Truncate from '../Truncate';

const meta: Meta<typeof Truncate> = {
  title: 'Components/Truncate',
  component: Truncate,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'text',
    },
    limit: {
      control: 'number',
      table: {
        defaultValue: { summary: '3' },
      },
    },
    mode: {
      control: 'select',
      options: Object.values(TruncateModes),
      table: {
        defaultValue: { summary: TruncateModes.LINES },
      },
    },
  },
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam quis nulla. Vivamus ac leo pretium faucibus.\n' +
      'Pellentesque pretium lectus id turpis. Maecenas lorem. Maecenas sollicitudin. Nullam justo enim, consectetuer nec,\n' +
      'ullamcorper ac, vestibulum in, elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium\n' +
      'doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae\n' +
      'vitae dicta sunt explicabo. Suspendisse sagittis ultrices augue. Aenean fermentum risus id tortor. Etiam bibendum\n' +
      'elit eget erat. Nulla quis diam. Donec iaculis gravida nulla. Nulla pulvinar eleifend sem. Fusce aliquam vestibulum\n' +
      'ipsum. Sed ac dolor sit amet purus malesuada congue. In dapibus augue non sapien. Morbi imperdiet, mauris ac auctor\n' +
      'dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Nam sed tellus id magna elementum tincidunt.',
    limit: 3,
    mode: TruncateModes.LINES,
  },
};

export default meta;
type Story = StoryObj<typeof Truncate>;

export const Playground: Story = {
  name: 'Truncate',
};
