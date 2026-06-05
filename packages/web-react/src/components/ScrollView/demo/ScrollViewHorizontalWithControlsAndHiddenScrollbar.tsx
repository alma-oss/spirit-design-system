import React from 'react';
import ScrollView from '../ScrollView';
import { HORIZONTAL_CONTENT } from './constants';

const ScrollViewHorizontalWithControlsAndHiddenScrollbar = () => (
  <ScrollView direction="horizontal" hasControls isScrollbarDisabled>
    <p className="py-900" style={{ whiteSpace: 'nowrap' }}>
      {HORIZONTAL_CONTENT}
    </p>
  </ScrollView>
);

export default ScrollViewHorizontalWithControlsAndHiddenScrollbar;
