'use client';

import { createContext, useContext } from 'react';
import { type SegmentedControlMultiselectProps } from '../../types/segmentedControl';

export type SegmentedControlContextProps = SegmentedControlMultiselectProps & {
  name: string;
  selectedValue: string | string[];
  setSelectedValue: (value: string | string[]) => void;
  onSelectionChange?: (value: string | string[]) => void;
};

const defaultContext: SegmentedControlContextProps = {
  isMultiselect: false,
  name: '',
  selectedValue: [],
  setSelectedValue: () => {},
  onSelectionChange: () => {},
};

const SegmentedControlContext = createContext<SegmentedControlContextProps>(defaultContext);
const SegmentedControlProvider = SegmentedControlContext.Provider;
const useSegmentedControlContext = (): SegmentedControlContextProps => useContext(SegmentedControlContext);

export default SegmentedControlContext;
// eslint-disable-next-line react-refresh/only-export-components -- Context file exports context alongside hooks
export { SegmentedControlProvider, useSegmentedControlContext };
