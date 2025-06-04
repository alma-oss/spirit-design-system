import { Container, Grid } from '@alma-oss/spirit-web-react';
import { fetchAllComponents } from '@local/domains/components/repositories/componentsRepository';
import ComponentCard from '@local/domains/components/ui/ComponentCard';
import React from 'react';

const ComponentsPage = () => {
  const components: string[] = fetchAllComponents();

  return (
    <Container>
      <Grid elementType="ul" cols={{ mobile: 2, tablet: 3 }}>
        {components.map((component) => (
          <ComponentCard key={component} component={component} />
        ))}
      </Grid>
    </Container>
  );
};

export default ComponentsPage;
