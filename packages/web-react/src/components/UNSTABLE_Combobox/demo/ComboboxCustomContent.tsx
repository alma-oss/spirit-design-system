'use client';

import React from 'react';
import { Box } from '../../Box';
import { Flex } from '../../Flex';
import { Icon } from '../../Icon';
import { UNSTABLE_Combobox } from '..';
import { useComboboxDemoState } from './useComboboxDemoState';

const ComboboxCustomContent = () => {
  const state = useComboboxDemoState();

  return (
    <UNSTABLE_Combobox
      id="demo-combobox-custom-content"
      inputValue={state.inputValue}
      isOpen={state.isOpen}
      label="Languages"
      onInputChange={state.onInputChange}
      onSelectionChange={state.onSelectionChange}
      onToggle={state.onToggle}
      optionKeys={[]}
      optionsRole={null}
      selectedKeys={state.selectedKeys}
      auxiliaryContent={
        <Box colorScheme="neutral-subtle" borderRadius="300" padding="space-600">
          <Flex alignmentY="center" spacingX="space-400">
            <Icon name="search" boxSize={20} />
            <span>Type to find what you&apos;re looking for…</span>
          </Flex>
        </Box>
      }
    />
  );
};

export default ComboboxCustomContent;
