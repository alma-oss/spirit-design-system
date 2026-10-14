'use client';

import { ActionGroup, ButtonLink } from '@alma-oss/spirit-web-react';
import React from 'react';

const ActionGroupPreview = () => (
  <ActionGroup alignmentX="left" direction="horizontal" spacingX="space-600">
    <ButtonLink href="#" color="primary" size="medium">
      Primary
    </ButtonLink>
    <ButtonLink href="#" color="secondary" size="medium">
      Secondary
    </ButtonLink>
  </ActionGroup>
);

export default ActionGroupPreview;
