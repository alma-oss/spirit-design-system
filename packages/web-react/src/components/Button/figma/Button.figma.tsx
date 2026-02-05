import figma from '@figma/code-connect';
import React, { type ReactNode } from 'react';
import { Icon } from '../../Icon';
import Button from '../Button';

const BUTTON_NODE_URL = '<FIGMA_FILE_ID>?node-id=776%3A20';

const commonProps = {
  color: figma.enum('Color', {
    Secondary: 'secondary',
    Tertiary: 'tertiary',
    Success: 'success',
    Warning: 'warning',
    Danger: 'danger',
    Informative: 'informative',
    Plain: 'plain',
  }),
  isDisabled: figma.boolean('Disabled'),
  isLoading: figma.boolean('Loading'),
  size: figma.enum('Size', {
    Large: 'large',
    Small: 'small',
  }),
};

const textProps = {
  ...commonProps,
  children: figma.textContent('Action'),
};

const basicExample = ({ children, ...props }: { children: ReactNode }) => <Button {...props}>{children}</Button>;

// Text only variant
figma.connect(Button, BUTTON_NODE_URL, {
  props: textProps,
  variant: { Content: 'Text' },
  example: basicExample,
});

// Text with icon variant
figma.connect(Button, BUTTON_NODE_URL, {
  props: textProps,
  variant: { Content: 'Text-and-icon' },
  example: ({ children, ...props }) => (
    <Button {...props}>
      <Icon name="placeholder" />
      {children}
    </Button>
  ),
});

// Icon only variant
figma.connect(Button, BUTTON_NODE_URL, {
  props: {
    ...commonProps,
    children: figma.children('Icon*'),
    isSymmetrical: true,
  },
  variant: { Content: 'Icon' },
  example: basicExample,
});
