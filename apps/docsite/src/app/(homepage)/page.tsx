import {
  BuildingBlocks,
  ComponentsOverview,
  DesignTeaser,
  FaqSection,
  Hero,
  LogoStrip,
  WorkflowScroll,
} from '@local/domains/homepage';
import { NextPage } from 'next';

const Home: NextPage = () => (
  <>
    <Hero />
    <LogoStrip />
    <WorkflowScroll />
    <BuildingBlocks />
    <DesignTeaser />
    <ComponentsOverview />
    <FaqSection />
  </>
);

export default Home;
