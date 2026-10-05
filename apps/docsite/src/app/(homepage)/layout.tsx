import BuildingBlocks from '@local/domains/homepage/BuildingBlocks';
import ComponentsOverview from '@local/domains/homepage/ComponentsOverview';
import CustomAssets from '@local/domains/homepage/CustomAssets';
import Customization from '@local/domains/homepage/Customization';
import Hero from '@local/domains/homepage/Hero';
import LogoStrip from '@local/domains/homepage/LogoStrip';
import ProcessTabs from '@local/domains/homepage/ProcessTabs';
import { type ChildrenProps } from '@local/types';

interface HomepageLayoutProps extends ChildrenProps {}

const HomepageLayout = async ({ children }: HomepageLayoutProps) => (
  <>
    <Hero />
    <LogoStrip />
    <ProcessTabs />
    <BuildingBlocks />
    <Customization />
    <CustomAssets />
    <ComponentsOverview />
    {children}
  </>
);

export default HomepageLayout;
