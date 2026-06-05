import React from 'react';
import ScrollView from '../ScrollView';
import { VERTICAL_CONTENT } from './constants';

const ScrollViewVerticalWithControls = () => (
  <div style={{ height: '160px' }}>
    <ScrollView data-spirit-toggle="scrollView" hasControls>
      <p>{VERTICAL_CONTENT}</p>
    </ScrollView>
  </div>
);

export default ScrollViewVerticalWithControls;
