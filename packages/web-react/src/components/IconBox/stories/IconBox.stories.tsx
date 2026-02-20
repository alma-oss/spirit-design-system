import { accentColors } from '@alma-oss/spirit-design-tokens';
import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EmotionColors, SizesExtended } from '../../../constants';
import { IconBoxShapes } from '../constants';
import { IconBox } from '../index';
import ReadMe from '../README.md?raw';

const meta: Meta<typeof IconBox> = {
  title: 'Components/IconBox',
  component: IconBox,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: [...[...Object.keys(accentColors), ...Object.values(EmotionColors)]],
      table: {
        type: {
          summary: 'AccentColor | EmotionColorsType',
        },
      },
      defaultValue: {
        summary: EmotionColors.INFORMATIVE,
      },
    },
    elementType: {
      control: 'text',
      table: {
        defaultValue: {
          summary: 'div',
        },
      },
    },
    hasBorder: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    iconName: {
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
    isSubtle: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    shape: {
      control: 'select',
      options: [...Object.values(IconBoxShapes)],
      table: {
        type: {
          summary: 'rounded | circle | square',
        },
      },
      defaultValue: {
        summary: IconBoxShapes.ROUNDED,
      },
    },
    size: {
      control: 'select',
      options: [...Object.values(SizesExtended)],
      table: {
        type: {
          summary: 'SizeExtendedDictionaryType | Responsive<SizeExtendedDictionaryType>',
        },
      },
    },
  },
  args: {
    color: EmotionColors.INFORMATIVE,
    elementType: 'div',
    hasBorder: true,
    iconName: 'search',
    isSubtle: true,
    shape: IconBoxShapes.ROUNDED,
    size: SizesExtended.MEDIUM,
  },
};

export default meta;
type Story = StoryObj<typeof IconBox>;

export const Playground: Story = {
  args: {
    isSubtle: true,
  },

  name: 'IconBox',
  render: (args) => <IconBox {...args} />,
};
