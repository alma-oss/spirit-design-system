import React, { type ChangeEvent, useState } from 'react';
import { DEMO_SLIDER_DEFAULT_VALUE } from '../constants';
import Slider from '../Slider';

const SliderSizes = () => {
  const [smallValue, setSmallValue] = useState(DEMO_SLIDER_DEFAULT_VALUE);
  const [mediumValue, setMediumValue] = useState(DEMO_SLIDER_DEFAULT_VALUE);
  const [largeValue, setLargeValue] = useState(DEMO_SLIDER_DEFAULT_VALUE);

  return (
    <>
      <Slider
        id="slider-size-small"
        label="Small"
        size="small"
        value={smallValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setSmallValue(Number(event.target.value))}
      />
      <Slider
        id="slider-size-medium"
        label="Medium (default)"
        value={mediumValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setMediumValue(Number(event.target.value))}
      />
      <Slider
        id="slider-size-large"
        label="Large"
        size="large"
        value={largeValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setLargeValue(Number(event.target.value))}
      />
    </>
  );
};

export default SliderSizes;
