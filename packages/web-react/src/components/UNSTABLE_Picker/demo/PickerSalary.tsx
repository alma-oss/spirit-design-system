'use client';

import React, { type ChangeEvent, useRef, useState } from 'react';
import { useToggle } from '../../../hooks';
import { Button } from '../../Button';
import { FieldGroup } from '../../FieldGroup';
import { Heading } from '../../Heading';
import { Radio } from '../../Radio';
import { Slider } from '../../Slider';
import { Text } from '../../Text';
import { TextField } from '../../TextField';
import type { SpiritUnstablePickerRef } from '../types';
import { UNSTABLE_Picker, UNSTABLE_PickerTag } from '..';

const salaryFormatter = new Intl.NumberFormat('cs-CZ');
const formatNumber = (value: number) => salaryFormatter.format(value);

const SALARY_FROM_MIN = 0;
const SALARY_FROM_MAX = 10000;
const SALARY_FROM_DEFAULT = 3000;
const SALARY_SLIDER_STEP = 100;

const clampFromAmount = (n: number) => Math.min(SALARY_FROM_MAX, Math.max(SALARY_FROM_MIN, n));

type PickerRenderTags = NonNullable<React.ComponentProps<typeof UNSTABLE_Picker>['renderTags']>;

const PickerSalary = () => {
  const [salary, setSalary] = useState<number | null>(null);
  const [isOpen, onToggle] = useToggle(false);
  const pickerRef = useRef<SpiritUnstablePickerRef>(null);
  const hasSalaryLimit = salary !== null && Number.isFinite(salary);

  const fromAmount = hasSalaryLimit ? clampFromAmount(salary) : SALARY_FROM_DEFAULT;
  const salaryTagLabel = hasSalaryLimit ? `From ${formatNumber(salary)}` : '';
  const updateSalaryFromValue = (value: string) => {
    const next = Number(value);
    if (!Number.isFinite(next)) {
      return;
    }

    setSalary(clampFromAmount(next));
  };

  return (
    <UNSTABLE_Picker
      id="demo-picker-salary"
      ref={pickerRef}
      addButtonLabel="Edit"
      helperText="Set your minimum expected salary"
      isOpen={isOpen}
      label="Salary"
      onToggle={onToggle}
      renderTags={({ getKeyboardGridRowProps, onRemove }: Parameters<PickerRenderTags>[0]) => {
        if (!hasSalaryLimit) {
          return null;
        }

        return (
          <UNSTABLE_PickerTag
            label={salaryTagLabel}
            tagKeyboardProps={getKeyboardGridRowProps(0)}
            onRemove={() => onRemove('salary')}
          />
        );
      }}
      selectedKeys={hasSalaryLimit ? ['salary'] : []}
      selectionAriaLabel="Selected salary"
      onSelectionChange={(keys: string[]) => {
        if (keys.length === 0) setSalary(null);
      }}
    >
      <Heading elementType="h3" size="xsmall">
        Salary
      </Heading>
      <Text size="small">Set your minimum expected salary.</Text>
      <FieldGroup id="demo-picker-salary-field-group" isLabelHidden label="Salary">
        <Radio
          id="salary-no-limit"
          name="salary"
          isChecked={!hasSalaryLimit}
          label="No limit"
          onChange={() => setSalary(null)}
        />
        <Radio
          id="salary-from"
          name="salary"
          isChecked={hasSalaryLimit}
          label="From"
          onChange={() => setSalary(SALARY_FROM_DEFAULT)}
        />
        <TextField
          id="salary-textfield"
          label="Salary"
          isLabelHidden
          type="number"
          value={String(fromAmount)}
          onChange={(e) => updateSalaryFromValue(e.currentTarget.value)}
        />
        <Slider
          id="demo-picker-salary-slider"
          isLabelHidden
          label="Salary"
          max={SALARY_FROM_MAX}
          min={SALARY_FROM_MIN}
          step={SALARY_SLIDER_STEP}
          value={fromAmount}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateSalaryFromValue(e.target.value)}
        />
      </FieldGroup>
      <div className="mt-600">
        <Button color="primary" onClick={() => pickerRef.current?.close()}>
          Apply
        </Button>
      </div>
    </UNSTABLE_Picker>
  );
};

export default PickerSalary;
