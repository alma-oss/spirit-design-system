import ComponentCover from '@local/domains/components/ui/ComponentCover';
import { type ChildrenProps } from '@local/types';
import { Footer } from '@local/ui';

interface DocumentationLayoutProps extends ChildrenProps {}

const DocumentationLayout = async ({ children }: DocumentationLayoutProps) => (
  <>
    <ComponentCover />
    <main className="py-1100 pt-tablet-1600">{children}</main>
    <Footer />
  </>
);

export default DocumentationLayout;
