import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import ScrollView from '../ScrollView';

const meta: Meta<typeof ScrollView> = {
  title: 'Components/ScrollView/Figma',
  component: ScrollView,
  tags: ['!autodocs', 'figma'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/w9Ca4hvkuYLshsrHu1bYwT/SPIRIT-DESIGN-SYSTEM--UI-Kit-?node-id=35163%3A22653',
      props: {
        direction: figma.enum('Direction', {
          Horizontal: 'horizontal',
        }),
        hasControls: figma.boolean('Arrows'),
      },
      examples: ['FigmaPlayground'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollView>;

export const FigmaPlayground: Story = {
  name: 'ScrollView',
  render: (props) => (
    <ScrollView {...props}>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
        nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
        aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
        felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
        eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante,
        dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
        Aenean imperdiet.
      </p>
    </ScrollView>
  ),
};
