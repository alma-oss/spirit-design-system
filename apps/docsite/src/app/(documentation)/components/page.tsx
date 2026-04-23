import { Flex, Section } from '@alma-oss/spirit-web-react';
import { fetchAllComponents } from '@local/domains/components/repositories/componentsRepository';
import ComponentList from '@local/domains/components/ui/ComponentList';
import ComponentListSkeleton from '@local/domains/components/ui/ComponentListSkeleton';
import ComponentSortToggle from '@local/domains/components/ui/ComponentSortToggle';
import React, { Suspense } from 'react';

const ComponentsPage = () => {
  const components: string[] = fetchAllComponents();

  return (
    <Section size="xlarge">
      <Flex alignmentX="center" marginBottom="space-1200">
        <ComponentSortToggle />
      </Flex>
      <Suspense fallback={<ComponentListSkeleton />}>
        <ComponentList components={components} />
      </Suspense>
    </Section>
  );
};

export default ComponentsPage;
