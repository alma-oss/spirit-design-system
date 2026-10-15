import {
  BuildingBlocks,
  ComponentsOverview,
  DesignTeaser,
  FaqSection,
  Hero,
  LogoStrip,
  WorkflowScroll,
} from '@local/domains/homepage';
import { type ChildrenProps } from '@local/types';

interface HomepageLayoutProps extends ChildrenProps {}

const HomepageLayout = async ({ children }: HomepageLayoutProps) => (
  <>
    <Hero />
    <LogoStrip />
    <WorkflowScroll />
    <BuildingBlocks />
    <DesignTeaser />
    <ComponentsOverview />
    <FaqSection />
    {children}
  </>
);

export default HomepageLayout;
