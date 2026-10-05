import BuildingBlocks from '@local/domains/homepage/BuildingBlocks';
import ComponentShowcase from '@local/domains/homepage/ComponentShowcase';
import ComponentsOverview from '@local/domains/homepage/ComponentsOverview';
import CustomAssets from '@local/domains/homepage/CustomAssets';
import Customization from '@local/domains/homepage/Customization';
import Hero from '@local/domains/homepage/Hero';
import { type ChildrenProps } from '@local/types';

interface HomepageLayoutProps extends ChildrenProps {}

const HomepageLayout = async ({ children }: HomepageLayoutProps) => (
  <>
    <Hero />
    <ComponentShowcase />
    <Customization />
    <CustomAssets />
    <ComponentsOverview />
    <BuildingBlocks />
    {children}
  </>
);

export default HomepageLayout;
