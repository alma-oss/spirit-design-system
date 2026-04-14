'use client';

import React, { useRef } from 'react';
import { SINGLE_SELECTION_MODE } from '../../../constants';
import { useSelectionState, useToggle } from '../../../hooks';
import { Button } from '../../Button';
import { Radio } from '../../Radio';
import { Text } from '../../Text';
import type { SpiritUnstablePickerRef } from '../types';
import { UNSTABLE_Picker, UNSTABLE_PickerGroup, UNSTABLE_PickerItem } from '..';

const PUBLICATION_PICKER_ID = 'demo-picker-publication-time';

const PUBLICATION_PERIOD_OPTIONS = [
  { value: '24h', label: 'Last 24 hours' },
  { value: '3d', label: 'Last 3 days' },
  { value: '1w', label: 'Last week' },
] as const;

const PUBLICATION_FIELD_LABEL = 'Publication time';

const PickerSingle = () => {
  const [isOpen, onToggle] = useToggle(false);
  const { selectedKeys, setSelectedKeys } = useSelectionState({
    defaultSelectedKeys: [],
    selectionMode: SINGLE_SELECTION_MODE,
  });
  const pickerRef = useRef<SpiritUnstablePickerRef>(null);
  const isAnyTime = selectedKeys.length === 0;

  return (
    <UNSTABLE_Picker
      ref={pickerRef}
      id={PUBLICATION_PICKER_ID}
      isOpen={isOpen}
      isLabelHidden
      label={PUBLICATION_FIELD_LABEL}
      selectedKeys={selectedKeys}
      selectionMode={SINGLE_SELECTION_MODE}
      onSelectionChange={setSelectedKeys}
      onToggle={onToggle}
    >
      <Text elementType="h3" emphasis="bold">
        {PUBLICATION_FIELD_LABEL}
      </Text>
      <UNSTABLE_PickerGroup label={PUBLICATION_FIELD_LABEL}>
        <Radio
          id={`${PUBLICATION_PICKER_ID}-any`}
          name={PUBLICATION_PICKER_ID}
          isChecked={isAnyTime}
          isItem
          label="Any time"
          onChange={() => setSelectedKeys([])}
        />
        {PUBLICATION_PERIOD_OPTIONS.map(({ value, label }) => (
          <UNSTABLE_PickerItem key={value} value={value}>
            {label}
          </UNSTABLE_PickerItem>
        ))}
      </UNSTABLE_PickerGroup>
      <div className="d-grid mt-600">
        <Button onClick={() => pickerRef.current?.close()}>Apply</Button>
      </div>
    </UNSTABLE_Picker>
  );
};

export default PickerSingle;
