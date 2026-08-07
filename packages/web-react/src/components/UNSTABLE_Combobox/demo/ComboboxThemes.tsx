'use client';

import React from 'react';
import { Box } from '../..';
import { UNSTABLE_Combobox } from '..';
import { renderComboboxLanguageItems } from './ComboboxLanguageItems';
import { useComboboxDemoState } from './useComboboxDemoState';

const ComboboxThemes = () => {
  const state = useComboboxDemoState({
    defaultSelectedKeys: ['cs', 'en'],
  });

  return (
    <Box theme="theme-light-on-brand" backgroundColor="primary" padding="space-800" borderRadius="300">
      <div className="theme-light-default">
        <UNSTABLE_Combobox
          hasEmptyState={state.hasEmptyState}
          id="demo-combobox-themes"
          inputValue={state.inputValue}
          isOpen={state.isOpen}
          label="Languages"
          labelProps={{ theme: 'theme-light-on-brand' }}
          onInputChange={state.onInputChange}
          onSelectionChange={state.onSelectionChange}
          onToggle={state.onToggle}
          optionKeys={state.optionKeys}
          popoverProps={{ theme: 'theme-light-default' }}
          selectedKeys={state.selectedKeys}
        >
          {renderComboboxLanguageItems(state.filteredOptions)}
        </UNSTABLE_Combobox>
      </div>
    </Box>
  );
};

export default ComboboxThemes;
