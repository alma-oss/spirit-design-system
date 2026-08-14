import figma from '@figma/code-connect';
import React, { type ReactNode } from 'react';
import type { SpiritAlertProps } from '../../../types';
import { Heading } from '../../Heading';
import { Link } from '../../Link';
import { Text } from '../../Text';
import Alert from '../Alert';

const ALERT_NODE_URL = '<FIGMA_FILE_ID>?node-id=3560%3A4323';

const commonProps = {
  color: figma.enum('Color', {
    Success: 'success',
    Informative: 'informative',
    Warning: 'warning',
    Danger: 'danger',
  }),
  isCentered: figma.enum('Content align', {
    'Full width': false,
    Center: true,
  }),
  link: figma.boolean('Link', {
    true: (
      <Link underlined="always" href="/">
        Show more
      </Link>
    ),
    false: undefined,
  }),
};

const example = ({
  children,
  headline = undefined,
  link = undefined,
  ...props
}: SpiritAlertProps & {
  headline?: ReactNode;
  link?: ReactNode;
}) => (
  <Alert {...props}>
    {headline}
    <Text>{children}</Text>
    {link}
  </Alert>
);

// Alert in informative color
figma.connect(Alert, ALERT_NODE_URL, {
  props: {
    ...commonProps,
    children: figma.string('Informative Text'),
    headline: figma.boolean('Headline', {
      true: (
        <Heading elementType="h3" fontWeight="semibold">
          Congratulations
        </Heading>
      ),
      false: undefined,
    }),
  },
  variant: { Color: 'Informative' },
  example,
});

// Alert in warning color
figma.connect(Alert, ALERT_NODE_URL, {
  props: {
    ...commonProps,
    children: figma.string('Warning Text'),
    headline: figma.boolean('Headline', {
      true: (
        <Heading elementType="h3" fontWeight="semibold">
          Warning
        </Heading>
      ),
      false: undefined,
    }),
  },
  variant: { Color: 'Warning' },
  example,
});

// Alert in danger color
figma.connect(Alert, ALERT_NODE_URL, {
  props: {
    ...commonProps,
    children: figma.string('Danger Text'),
    headline: figma.boolean('Headline', {
      true: (
        <Heading elementType="h3" fontWeight="semibold">
          Error
        </Heading>
      ),
      false: undefined,
    }),
  },
  variant: { Color: 'Danger' },
  example,
});

// Alert in success color
figma.connect(Alert, ALERT_NODE_URL, {
  props: {
    ...commonProps,
    children: figma.string('Success Text'),
    headline: figma.boolean('Headline', {
      true: (
        <Heading elementType="h3" fontWeight="semibold">
          Success
        </Heading>
      ),
      false: undefined,
    }),
  },
  variant: { Color: 'Success' },
  example,
});
