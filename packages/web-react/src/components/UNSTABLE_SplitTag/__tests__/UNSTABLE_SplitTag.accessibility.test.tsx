import React from 'react';
import { accessibilityDisabledTest, accessibilityTest } from '@local/tests';
import { Tag } from '../../Tag';
import { type SpiritUnstableSplitTagProps } from '../types';
import UNSTABLE_SplitTag from '../UNSTABLE_SplitTag';

jest.mock('../../../hooks/useIcon');

describe('UNSTABLE_SplitTag accessibility', () => {
  const SplitTagTest = (props: SpiritUnstableSplitTagProps) => (
    <UNSTABLE_SplitTag role="group" aria-label="Prague distance filter" {...props}>
      <Tag>Prague</Tag>
      <Tag elementType="button">+5 km</Tag>
    </UNSTABLE_SplitTag>
  );

  accessibilityTest(SplitTagTest, '[role="group"]');

  accessibilityDisabledTest(SplitTagTest, 'button');
});
