import ComponentCover from '@local/domains/components/ui/ComponentCover';
import { type ChildrenProps } from '@local/types';

interface DocumentationLayoutProps extends ChildrenProps {}

const DocumentationLayout = async ({ children }: DocumentationLayoutProps) => (
  <>
    <ComponentCover />
    {children}
  </>
);

export default DocumentationLayout;
