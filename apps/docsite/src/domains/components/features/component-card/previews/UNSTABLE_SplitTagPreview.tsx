'use client';

import { ControlButton, Dropdown, DropdownTrigger, Icon, Tag, UNSTABLE_SplitTag } from '@alma-oss/spirit-web-react';
import React from 'react';

const UNSTABLE_SplitTagPreview = () => (
  <UNSTABLE_SplitTag role="group" aria-label="Prague, radius +5 km" color="neutral" size="medium">
    <Tag>Prague</Tag>
    <Dropdown id="card-split-tag" isOpen={false} onToggle={() => {}}>
      <DropdownTrigger elementType={Tag}>
        <span>+5 km</span>
        <ControlButton elementType="span" aria-hidden isStretched isSymmetrical>
          <Icon name="chevron-down" boxSize={16} />
        </ControlButton>
      </DropdownTrigger>
    </Dropdown>
  </UNSTABLE_SplitTag>
);

export default UNSTABLE_SplitTagPreview;
