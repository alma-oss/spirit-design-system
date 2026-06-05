import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import {
  ScrollView,
  ScrollViewArrows,
  SCROLL_VIEW_ARROWS_LABEL_HORIZONTAL_START,
  useScrollViewArrows,
  type ScrollViewArrowsAriaLabelType,
} from '@alma-oss/spirit-web-react';

const labels: ScrollViewArrowsAriaLabelType = {
  start: SCROLL_VIEW_ARROWS_LABEL_HORIZONTAL_START,
};

export const MyComponent = () => {
  const { arrows } = useScrollViewArrows(true, labels, 200);
  const classProps = { arrows: [] as { label: string }[] };

  return (
    <>
      <ScrollView hasArrows arrowsScrollStep={200} ariaLabelArrows={labels}>
        content
      </ScrollView>
      <ScrollViewArrows ariaLabelArrows={labels} direction="horizontal" scrollStep={200} viewportRef={{ current: null }} />
      {arrows.map(({ label }) => label)}
      {classProps.arrows.map(({ label }) => label)}
    </>
  );
};
