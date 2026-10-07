import BuildingBlocks from '@local/domains/homepage/BuildingBlocks';
import DesignTeaser from '@local/domains/homepage/DesignTeaser';
import FaqSection from '@local/domains/homepage/FaqSection';
import Hero from '@local/domains/homepage/Hero';
import LogoStrip from '@local/domains/homepage/LogoStrip';
import ProcessTabs from '@local/domains/homepage/ProcessTabs';
import WorkflowScroll from '@local/domains/homepage/WorkflowScroll';
import { type ChildrenProps } from '@local/types';

interface HomepageLayoutProps extends ChildrenProps {}

const HomepageLayout = async ({ children }: HomepageLayoutProps) => (
  <>
    <Hero />
    <LogoStrip />
    <WorkflowScroll />
    <BuildingBlocks />
    <DesignTeaser />
    <FaqSection />
    <ProcessTabs />
    {children}
  </>
);

export default HomepageLayout;
