import { Grid, Section } from '@alma-oss/spirit-web-react';
import FeatureCard from '@local/domains/homepage/FeatureCard';
import { routes } from '@local/domains/routing/routes';
import { NextPage } from 'next';

const Home: NextPage = () => (
  <Section size="xlarge">
    <Grid cols={{ mobile: 1, tablet: 2 }}>
      <FeatureCard
        icon="file"
        title="Components"
        description="Our components are collection of interface elements that can be reused across the Spirit Design System."
        href={routes.components}
        linkLabel="See all components"
      />
      <FeatureCard
        icon="placeholder"
        title="Icons"
        description="Spirit Design System icons available as SVG sprites and React components."
        href={routes.icons}
        linkLabel="See all icons"
      />
      <FeatureCard
        icon="more"
        title="Helpers"
        description="CSS utility helper classes for spacing, text, accessibility, and more."
        href={routes.helpers}
        linkLabel="See all helpers"
      />
    </Grid>
  </Section>
);

export default Home;
