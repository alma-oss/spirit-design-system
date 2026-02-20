import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import DocsBox from '../../../../docs/DocsBox';
import { AlignmentXExtended, AlignmentYExtended } from '../../../constants';
import ReadMe from '../README.md?raw';
import { Grid } from '..';

const meta: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    alignmentX: {
      control: 'select',
      options: [undefined, ...Object.values(AlignmentXExtended)],
      table: {
        defaultValue: { summary: undefined },
      },
    },
    alignmentY: {
      control: 'select',
      options: [undefined, ...Object.values(AlignmentYExtended)],
      table: {
        defaultValue: { summary: undefined },
      },
    },
    cols: {
      control: 'object',
    },
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'div' },
      },
    },
    spacing: {
      control: 'object',
    },
    spacingX: {
      control: 'object',
    },
    spacingY: {
      control: 'object',
    },
  },
  args: {
    alignmentX: undefined,
    alignmentY: undefined,
    cols: {
      mobile: 2,
      tablet: 3,
      desktop: 4,
    },
    elementType: 'div',
    spacing: {
      mobile: 'space-600',
      tablet: 'space-600',
      desktop: 'space-600',
    },
    spacingX: {
      mobile: 'space-600',
      tablet: 'space-600',
      desktop: 'space-600',
    },
    spacingY: {
      mobile: 'space-600',
      tablet: 'space-600',
      desktop: 'space-600',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Playground: Story = {
  name: 'Grid',
  render: (args) => {
    const { alignmentX, alignmentY, ...restProps } = args;

    return (
      <Grid {...restProps}>
        {[...Array(12)].map((_, index) => {
          const key = `item-${index}`;

          return (
            <Grid key={key} cols={1} alignmentX={alignmentX} alignmentY={alignmentY} UNSAFE_className="bg-cover">
              <DocsBox key={key}>
                {index === 11 ? (
                  <>
                    Item <br />…<br />…
                  </>
                ) : (
                  'Item'
                )}
              </DocsBox>
            </Grid>
          );
        })}
      </Grid>
    );
  },
};
