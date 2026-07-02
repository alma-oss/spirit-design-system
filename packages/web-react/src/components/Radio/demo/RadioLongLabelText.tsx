import React from 'react';
import Radio from '../Radio';

const RadioLongLabelText = () => {
  const labelText = `This is an example of a very long label text for a radio button.
  It is specifically designed to test how well the layout handles text wrapping when the content becomes significantly longer.
  The purpose of this text is to confirm that the radio button's composition remains intact, visually aligned, and free from
  any unexpected breakage or misalignment. Ensuring proper spacing and alignment for multiline labels is essential for
  creating a consistent and user-friendly interface across different screen sizes and resolutions.`;

  return <Radio id="radio-long-label" label={labelText} name="radioLongLabel" />;
};
export default RadioLongLabelText;
