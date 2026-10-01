import ComponentShowcase from '@local/domains/homepage/ComponentShowcase';
import Hero from '@local/domains/homepage/Hero';
import { type ChildrenProps } from '@local/types';
import { Cover } from '@local/ui';

interface HomepageLayoutProps extends ChildrenProps {}

const HomepageLayout = async ({ children }: HomepageLayoutProps) => (
  <>
    <Hero />
    <ComponentShowcase />
    <Cover />
    {children}
  </>
);

export default HomepageLayout;
