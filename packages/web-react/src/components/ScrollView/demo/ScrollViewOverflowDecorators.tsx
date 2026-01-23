import React, { type CSSProperties } from 'react';
import ScrollView from '../ScrollView';
import { HORIZONTAL_CONTENT, VERTICAL_CONTENT } from './constants';

const ScrollViewOverflowDecorators = () => (
  <>
    <ScrollView direction="horizontal" overflowDecorators="borders" marginBottom="space-1200">
      <p className="py-900" style={{ whiteSpace: 'nowrap' }}>
        {HORIZONTAL_CONTENT}
      </p>
    </ScrollView>

    <div className="mb-1200" style={{ height: '160px' }}>
      <ScrollView overflowDecorators="borders">
        <p>{VERTICAL_CONTENT}</p>
      </ScrollView>
    </div>

    <ScrollView direction="horizontal" overflowDecorators="both" UNSAFE_className="mb-1200">
      <p className="py-900" style={{ whiteSpace: 'nowrap' }}>
        {HORIZONTAL_CONTENT}
      </p>
    </ScrollView>

    <div className="mb-1200" style={{ height: '160px' }}>
      <ScrollView overflowDecorators="both">
        <p>{VERTICAL_CONTENT}</p>
      </ScrollView>
    </div>

    <div
      className="mb-1200 px-900 py-700"
      style={{ width: '100%', overflow: 'hidden', color: 'white', backgroundColor: '#9400d3' }}
    >
      <ScrollView
        direction="horizontal"
        overflowDecorators="shadows"
        data-spirit-toggle="scrollView"
        UNSAFE_style={
          {
            '--scroll-view-start-shadow-background': 'linear-gradient(to right, #9400d3 0%, #9400d300 100%)',
            '--scroll-view-end-shadow-background': 'linear-gradient(to left, #9400d3 0%, #9400d300 100%)',
          } as CSSProperties
        }
      >
        <p className="py-900" style={{ whiteSpace: 'nowrap' }}>
          {HORIZONTAL_CONTENT}
        </p>
      </ScrollView>
    </div>

    <div className="px-900 py-700" style={{ height: '160px', color: 'white', backgroundColor: '#9400d3' }}>
      <ScrollView
        direction="vertical"
        overflowDecorators="shadows"
        data-spirit-toggle="scrollView"
        UNSAFE_style={
          {
            '--scroll-view-start-shadow-background': 'linear-gradient(to bottom, #9400d3 0%, #9400d300 100%)',
            '--scroll-view-end-shadow-background': 'linear-gradient(to top, #9400d3 0%, #9400d300 100%)',
          } as CSSProperties
        }
      >
        <p>{VERTICAL_CONTENT}</p>
      </ScrollView>
    </div>
  </>
);

export default ScrollViewOverflowDecorators;
