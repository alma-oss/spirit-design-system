import ComponentCover from '@local/domains/components/ui/ComponentCover';
import { type ChildrenProps } from '@local/types';

const ComponentsLayout = ({ children }: ChildrenProps) => (
  <>
    <ComponentCover />
    {children}
  </>
);

export default ComponentsLayout;
