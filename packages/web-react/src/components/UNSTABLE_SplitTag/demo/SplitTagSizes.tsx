import React from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { SizesExtended } from '../../../constants';
import SplitTagPragueRadius from './SplitTagPragueRadius';

const SplitTagSizes = () => (
  <>
    {Object.values(SizesExtended).map((size) => (
      <DocsSection key={size} title={`Size ${size}`} container="none" hasPadding={false}>
        <SplitTagPragueRadius id={`split-tag-prague-radius-${size}`} size={size} />
      </DocsSection>
    ))}
  </>
);

export default SplitTagSizes;
