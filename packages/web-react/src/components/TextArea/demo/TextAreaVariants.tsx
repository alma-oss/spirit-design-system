import React from 'react';
import { FillVariants } from '../../../constants';
import TextArea from '../TextArea';

const TextAreaVariants = () => (
  <>
    <TextArea
      id="textarea-variant-fill"
      label="Fill (default)"
      name="textareaVariantFill"
      placeholder="Placeholder"
      variant={FillVariants.FILL}
    />

    <TextArea
      id="textarea-variant-outline"
      label="Outline"
      name="textareaVariantOutline"
      placeholder="Placeholder"
      variant={FillVariants.OUTLINE}
    />
  </>
);

export default TextAreaVariants;
