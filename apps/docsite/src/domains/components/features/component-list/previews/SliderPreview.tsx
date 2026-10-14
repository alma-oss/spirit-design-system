'use client';

import { Slider } from '@alma-oss/spirit-web-react';
import React from 'react';

const SliderPreview = () => (
  <Slider id="card-slider" label="Slider" isLabelHidden value={40} onChange={() => {}} UNSAFE_style={{ width: 240 }} />
);

export default SliderPreview;
