import { type ChildrenProps } from '@local/types';
import { Cover } from '@local/ui';

interface HomepageLayoutProps extends ChildrenProps {}

const HomepageLayout = async ({ children }: HomepageLayoutProps) => (
  <>
    <Cover />
    {children}
  </>
);

export default HomepageLayout;
