import { Grid, Section } from '@alma-oss/spirit-web-react';
import ComponentsCard from '@local/domains/homepage/ComponentsCard';
import { NextPage } from 'next';

const Home: NextPage = () => (
  <Section size="xlarge">
    <Grid cols={{ mobile: 1, tablet: 2 }}>
      <ComponentsCard />
    </Grid>
  </Section>
);

export default Home;
