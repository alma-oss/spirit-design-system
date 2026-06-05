import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import {
  ScrollView,
  ScrollViewControls,
  SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_START,
  useScrollViewControls,
  type ScrollViewControlsAriaLabelType,
} from '@alma-oss/spirit-web-react';

const labels: ScrollViewControlsAriaLabelType = {
  start: SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_START,
};

export const MyComponent = () => {
  const { controls } = useScrollViewControls(true, labels, 200);
  const classProps = { controls: [] as { label: string }[] };

  return (
    <>
      <ScrollView hasControls controlsScrollStep={200} ariaLabelControls={labels}>
        content
      </ScrollView>
      <ScrollViewControls ariaLabelControls={labels} direction="horizontal" scrollStep={200} viewportRef={{ current: null }} />
      {controls.map(({ label }) => label)}
      {classProps.controls.map(({ label }) => label)}
    </>
  );
};
