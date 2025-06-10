import { type ChildrenProps } from '@local/types';
import { Cover, Header, Footer } from '@local/ui';

interface HomepageLayoutProps extends ChildrenProps {}

const HomepageLayout = async ({ children }: HomepageLayoutProps) => (
  <>
    <Cover />
    <main className="py-1100 pt-tablet-1600">{children}</main>
    <Footer />
  </>
);

export default HomepageLayout;
