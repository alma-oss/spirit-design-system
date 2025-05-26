import { Container, Grid, Section } from '@alma-oss/spirit-web-react';
import ComponentsCard from '@local/domains/homepage/ComponentsCard';
import { NextPage } from 'next';

const Home: NextPage = () => (
  <Container>
    <Section>
      <Grid cols={{ mobile: 1, tablet: 2 }}>
        <ComponentsCard />
      </Grid>
    </Section>
  </Container>
);

export default Home;
