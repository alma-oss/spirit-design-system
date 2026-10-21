'use client';

import { Tooltip, TooltipPopover } from '@alma-oss/spirit-web-react';
import React from 'react';

const TooltipPreview = () => (
  <div style={{ paddingBottom: 8 }}>
    <Tooltip id="card-tooltip" isOpen onToggle={() => {}} placement="top" enableFlipping={false} enableShifting={false}>
      <TooltipPopover
        UNSAFE_className="is-visible"
        UNSAFE_style={{ position: 'relative', inset: 'auto', translate: 'none' }}
      >
        Tooltip text
      </TooltipPopover>
    </Tooltip>
  </div>
);

export default TooltipPreview;
