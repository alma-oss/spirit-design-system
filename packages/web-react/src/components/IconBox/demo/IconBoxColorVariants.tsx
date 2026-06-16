import { accentColors } from '@alma-oss/spirit-design-tokens';
import React, { useState } from 'react';
import { DemoEmotionColors } from '../../../../docs';
import { type AccentColorNamesType } from '../../../types';
import Checkbox from '../../Checkbox/Checkbox';
import { Grid } from '../../Grid';
import IconBoxColorDemoFactory from './IconBoxColorDemoFactory';

const accentColorsObject = Object.keys(accentColors) as AccentColorNamesType[];
const emotionColorsObject = Object.values(DemoEmotionColors);

const IconBoxColorVariants = () => {
  const [isSubtle, setIsSubtle] = useState(true);

  return (
    <div>
      <fieldset className="mb-600" style={{ border: 0 }}>
        <legend className="mb-500">Intensity:</legend>
        <Checkbox
          id="checkbox-subtle"
          name="checkboxSubtle"
          marginY="space-500"
          label="Subtle variant"
          isChecked={isSubtle}
          onChange={() => setIsSubtle(!isSubtle)}
        />
      </fieldset>

      <Grid cols={{ desktop: 3, mobile: 1 }}>
        <IconBoxColorDemoFactory label="Accent colors" colorList={accentColorsObject} isSubtle={isSubtle} />
        <IconBoxColorDemoFactory label="Emotion colors" colorList={emotionColorsObject} isSubtle={isSubtle} />
      </Grid>
    </div>
  );
};

export default IconBoxColorVariants;
