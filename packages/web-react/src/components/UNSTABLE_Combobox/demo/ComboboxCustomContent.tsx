'use client';

import React from 'react';
import { Flex } from '../../Flex';
import { Icon } from '../../Icon';
import { UNSTABLE_Combobox } from '..';
import { useComboboxDemoState } from './useComboboxDemoState';

const ComboboxCustomContent = () => {
  const state = useComboboxDemoState();

  return (
    <UNSTABLE_Combobox
      id="demo-combobox-custom-content"
      label="Languages"
      isOpen={state.isOpen}
      onToggle={state.onToggle}
      selectedKeys={state.selectedKeys}
      onSelectionChange={state.onSelectionChange}
      inputValue={state.inputValue}
      onInputChange={state.onInputChange}
      optionKeys={[]}
      auxiliaryContent={
        <div className="color-scheme-on-neutral-subtle bg-color-scheme text-color-scheme rounded-300 p-600">
          <Flex direction="horizontal" isWrapping={false} alignmentY="center" spacingX="space-400">
            <Icon name="search" boxSize={20} />
            <span>Type to find what you&apos;re looking for…</span>
          </Flex>
        </div>
      }
    />
  );
};

export default ComboboxCustomContent;
