import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ActionGroup } from '../../ActionGroup';
import { ButtonLink } from '../../Button';
import { Heading } from '../../Heading';
import { Link } from '../../Link';
import { Text } from '../../Text';
import ReadMe from '../README.md?raw';
import { EmptyState, EmptyStateSection } from '..';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {},
  args: {
    spacing: 'space-700',
    children: (
      <>
        <EmptyStateSection spacing="space-500">
          <Heading elementType="h2" size="xsmall">
            Headline
          </Heading>
          <Text color="secondary">
            In publishing and graphic design, lorem ipsum is common placeholder text used to demonstrate the graphic
            elements
          </Text>
        </EmptyStateSection>
        <EmptyStateSection>
          <ActionGroup alignmentX={{ mobile: 'stretch', tablet: 'center' }}>
            <ButtonLink color="primary" href="#">
              Action
            </ButtonLink>
            <ButtonLink color="secondary" href="#">
              Action
            </ButtonLink>
          </ActionGroup>
        </EmptyStateSection>
        <EmptyStateSection>
          <Link href="/">Link to something</Link>
        </EmptyStateSection>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Playground: Story = {
  name: 'EmptyState',
};
