import figma from '@figma/code-connect';
import React, { type ReactNode } from 'react';
import Label from '../Label';

const commonProps = {
  children: figma.string('Label'),
};

figma.connect(Label, '<FIGMA_FILE_ID>?node-id=26437%3A2180', {
  props: commonProps,
  variant: { Required: false },
  example: ({ children, ...props }: { children: ReactNode }) => <Label {...props}>{children}</Label>,
});

figma.connect(Label, '<FIGMA_FILE_ID>?node-id=26437%3A2180', {
  props: commonProps,
  variant: { Required: true },
  example: ({ children, ...props }: { children: ReactNode }) => <Label {...props}>{children} *</Label>,
});
