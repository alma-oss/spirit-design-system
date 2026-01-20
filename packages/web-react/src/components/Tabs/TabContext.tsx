'use client';

import { createContext, useContext } from 'react';
import { type TabId, type TabsContextType, type TabsToggler } from '../../types';

const defaultContext: TabsContextType = {
  selectedId: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectTab: (id: TabId) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSelectionChange: (previousId, currentId) => {},
};

const TabsContext = createContext<TabsContextType>(defaultContext);
const TabsProvider = TabsContext.Provider;
const TabsConsumer = TabsContext.Consumer;
const useTabContext = (): TabsContextType => useContext(TabsContext);

export default TabsContext;
// eslint-disable-next-line react-refresh/only-export-components -- Context file exports context alongside hooks
export { TabsConsumer, TabsProvider, useTabContext };
export type { TabsContextType, TabsToggler };
