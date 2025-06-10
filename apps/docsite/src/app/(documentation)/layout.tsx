import { type ChildrenProps } from '@local/types';
import { Cover, Footer } from '@local/ui';

interface DocumentationLayoutProps extends ChildrenProps {}

const DocumentationLayout = async ({ children }: DocumentationLayoutProps) => (
  <>
    <Cover />
    <main className="py-1100 pt-tablet-1600">{children}</main>
    <Footer />
  </>
);

export default DocumentationLayout;
