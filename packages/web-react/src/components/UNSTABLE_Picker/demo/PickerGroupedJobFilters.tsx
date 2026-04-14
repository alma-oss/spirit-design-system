'use client';

import React, { useRef } from 'react';
import { MULTIPLE_SELECTION_MODE } from '../../../constants';
import { Button } from '../../Button';
import { Divider } from '../../Divider';
import { Text } from '../../Text';
import type { SpiritUnstablePickerRef } from '../types';
import { UNSTABLE_PickerGroup, UNSTABLE_PickerItem, UNSTABLE_UncontrolledPicker } from '..';

const EMPLOYMENT_TYPE_OPTIONS = [
  { value: 'full', label: 'Full-time' },
  { value: 'part', label: 'Part-time' },
] as const;

const EMPLOYMENT_TYPE_FIELD_LABEL = 'Employment type';

const COOPERATION_OPTIONS = [
  { value: 'employment', label: 'Employment contract' },
  { value: 'trade-license', label: 'Trade license (freelance)' },
  { value: 'agreement', label: 'Agreement (DPP/DPČ)' },
] as const;

const COOPERATION_FIELD_LABEL = 'Cooperation type';

const INTERNSHIP_OPTIONS = [{ value: 'internships', label: 'Internships, traineeships and trainee programs' }] as const;

const INTERNSHIP_FIELD_LABEL = 'Internships';

const PickerGroupedJobFilters = () => {
  const pickerRef = useRef<SpiritUnstablePickerRef>(null);

  return (
    <UNSTABLE_UncontrolledPicker
      ref={pickerRef}
      id="demo-picker-job-filters-grouped"
      isAggregated
      isLabelHidden
      label="Employment type"
      selectionMode={MULTIPLE_SELECTION_MODE}
    >
      <div style={{ width: '300px' }}>
        <Text elementType="h3" emphasis="bold">
          {EMPLOYMENT_TYPE_FIELD_LABEL}
        </Text>
        <UNSTABLE_PickerGroup label={EMPLOYMENT_TYPE_FIELD_LABEL} marginBottom="space-0">
          {EMPLOYMENT_TYPE_OPTIONS.map(({ value, label }) => (
            <UNSTABLE_PickerItem key={value} value={value}>
              {label}
            </UNSTABLE_PickerItem>
          ))}
        </UNSTABLE_PickerGroup>
        <Divider marginY="space-600" />
        <Text elementType="h3" emphasis="bold">
          {COOPERATION_FIELD_LABEL}
        </Text>
        <UNSTABLE_PickerGroup label={COOPERATION_FIELD_LABEL} marginBottom="space-0">
          {COOPERATION_OPTIONS.map(({ value, label }) => (
            <UNSTABLE_PickerItem key={value} value={value}>
              {label}
            </UNSTABLE_PickerItem>
          ))}
        </UNSTABLE_PickerGroup>
        <Divider marginY="space-600" />
        <Text elementType="h3" emphasis="bold">
          {INTERNSHIP_FIELD_LABEL}
        </Text>
        <UNSTABLE_PickerGroup label={INTERNSHIP_FIELD_LABEL}>
          {INTERNSHIP_OPTIONS.map(({ value, label }) => (
            <UNSTABLE_PickerItem key={value} value={value}>
              {label}
            </UNSTABLE_PickerItem>
          ))}
        </UNSTABLE_PickerGroup>
      </div>
      <div className="d-grid mt-600">
        <Button onClick={() => pickerRef.current?.close()}>Apply</Button>
      </div>
    </UNSTABLE_UncontrolledPicker>
  );
};

export default PickerGroupedJobFilters;
