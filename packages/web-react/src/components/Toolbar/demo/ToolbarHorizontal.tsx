import React from 'react';
import { Toolbar } from '..';
import ToolbarItems from './ToolbarItems';

const ToolbarHorizontal = () => (
  <Toolbar aria-label="Horizontal document actions">
    <ToolbarItems idPrefix="toolbar-horizontal" />
  </Toolbar>
);

export default ToolbarHorizontal;
