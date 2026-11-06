import React from 'react';
import { Toolbar } from '..';
import ToolbarItems from './ToolbarItems';

const ToolbarVertical = () => (
  <Toolbar orientation="vertical" aria-label="Vertical document actions">
    <ToolbarItems idPrefix="toolbar-vertical" />
  </Toolbar>
);

export default ToolbarVertical;
