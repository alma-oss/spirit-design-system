import React from 'react';
import { DocsStack } from '../../../../docs';
import SplitTagPragueRadius from './SplitTagPragueRadius';

const SplitTagDisabled = () => (
  <DocsStack stackAlignment="start">
    <SplitTagPragueRadius id="split-tag-prague-radius-disabled-tag-button" isDisabled />
    <SplitTagPragueRadius
      id="split-tag-prague-radius-disabled-control-button"
      isDisabled
      removeSegmentVariant="control-button"
    />
  </DocsStack>
);

export default SplitTagDisabled;
