import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import DocsBox from '../../../../docs/DocsBox';
import { Stack } from '../../Stack';
import {
  MATRIX_COLS_DEFAULT,
  MATRIX_ITEM_ROWS_DEFAULT,
  MATRIX_ROWS_DEFAULT,
  MATRIX_SPACING_X_DEFAULT,
  MATRIX_SPACING_Y_DEFAULT,
} from '../constant';
import Matrix from '../Matrix';
import ReadMe from '../README.md?raw';

const meta: Meta<typeof Matrix> = {
  title: 'Components/Matrix',
  component: Matrix,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    cols: {
      control: 'object',
      table: {
        defaultValue: { summary: MATRIX_COLS_DEFAULT.toString() },
      },
    },
    rows: {
      control: 'object',
      table: {
        defaultValue: { summary: MATRIX_ROWS_DEFAULT.toString() },
      },
    },
    itemRows: {
      control: 'object',
      table: {
        defaultValue: { summary: MATRIX_ITEM_ROWS_DEFAULT.toString() },
      },
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
      table: {
        defaultValue: { summary: MATRIX_SPACING_X_DEFAULT.toString() },
      },
    },
    spacingY: {
      control: 'object',
      table: {
        defaultValue: { summary: MATRIX_SPACING_Y_DEFAULT.toString() },
      },
    },
  },
  args: {
    cols: {
      mobile: MATRIX_COLS_DEFAULT,
      tablet: MATRIX_COLS_DEFAULT,
      desktop: MATRIX_COLS_DEFAULT,
    },
    rows: MATRIX_ROWS_DEFAULT,
    itemRows: {
      mobile: MATRIX_ITEM_ROWS_DEFAULT,
      tablet: MATRIX_ITEM_ROWS_DEFAULT,
      desktop: MATRIX_ITEM_ROWS_DEFAULT,
    },
    elementType: 'div',
    spacing: undefined,
    spacingX: {
      mobile: MATRIX_SPACING_X_DEFAULT,
      tablet: MATRIX_SPACING_X_DEFAULT,
      desktop: MATRIX_SPACING_X_DEFAULT,
    },
    spacingY: {
      mobile: MATRIX_SPACING_Y_DEFAULT,
      tablet: MATRIX_SPACING_Y_DEFAULT,
      desktop: MATRIX_SPACING_Y_DEFAULT,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Matrix>;

export const Playground: Story = {
  name: 'Matrix',
  render: (args) => {
    const { ...restProps } = args;

    return (
      <Matrix {...restProps}>
        {[...Array(MATRIX_COLS_DEFAULT)].map((_col, colIndex) => {
          const key = `col-${colIndex}`;

          return (
            <Stack key={key} hasSpacing>
              {[...Array(3)].map((_item, itemIndex) => {
                const itemKey = `${key}-item-${itemIndex}`;

                return (
                  <DocsBox key={itemKey}>
                    {`Col ${colIndex + 1} - Item ${itemIndex + 1}`}
                    {(colIndex === 1 && itemIndex === 1) || (colIndex === 2 && itemIndex === 2) ? (
                      <>
                        <br />
                        ...
                        <br />
                        ...
                        <br />
                        ...
                      </>
                    ) : null}
                  </DocsBox>
                );
              })}
            </Stack>
          );
        })}
      </Matrix>
    );
  },
};
