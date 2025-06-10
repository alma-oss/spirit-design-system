import { type ChildrenProps } from '@local/types';
import { Cover, Footer } from '@local/ui';
import ComponentCover from '@local/domains/components/ui/ComponentCover';

interface DocumentationLayoutProps extends ChildrenProps {}

const DocumentationLayout = async ({ children }: DocumentationLayoutProps) => (
  <>
    <ComponentCover isUnstable={false} />
    <main className="py-1100 pt-tablet-1600">{children}</main>
    <Footer />
  </>
);

export default DocumentationLayout;
