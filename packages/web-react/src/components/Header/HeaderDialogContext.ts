'use client';

import { type SyntheticEvent, createContext, useContext } from 'react';

export interface HeaderDialogContextProps {
  id: string;
  isOpen: boolean;
  onClose: (event: Event | SyntheticEvent) => void;
}

const defaultContext: HeaderDialogContextProps = {
  id: '',
  isOpen: false,
  onClose: () => null,
};

const HeaderDialogContext = createContext<HeaderDialogContextProps>(defaultContext);
const HeaderDialogProvider = HeaderDialogContext.Provider;
const HeaderDialogConsumer = HeaderDialogContext.Consumer;
const useHeaderDialogContext = (): HeaderDialogContextProps => useContext(HeaderDialogContext);

export { HeaderDialogConsumer, HeaderDialogProvider, useHeaderDialogContext };
export default HeaderDialogContext;
