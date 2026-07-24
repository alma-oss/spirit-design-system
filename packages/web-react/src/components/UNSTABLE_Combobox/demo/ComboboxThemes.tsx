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
          id="demo-combobox-themes"
          label="Languages"
          labelProps={{ theme: 'theme-light-on-brand' }}
          popoverProps={{ theme: 'theme-light-default' }}
          isOpen={state.isOpen}
          onToggle={state.onToggle}
          selectedKeys={state.selectedKeys}
          onSelectionChange={state.onSelectionChange}
          inputValue={state.inputValue}
          onInputChange={state.onInputChange}
          optionKeys={state.optionKeys}
          hasEmptyState={state.hasEmptyState}
        >
          {renderComboboxLanguageItems(state.filteredOptions)}
        </UNSTABLE_Combobox>
      </div>
    </Box>
  );
};

export default ComboboxThemes;
