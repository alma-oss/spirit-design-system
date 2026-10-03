import { Flex, Section } from '@alma-oss/spirit-web-react';
import { fetchCardPreviews } from '@local/domains/components/repositories/cardPreviewsRepository';
import { fetchAllComponents } from '@local/domains/components/repositories/componentsRepository';
import ComponentList from '@local/domains/components/ui/ComponentList';
import ComponentListSkeleton from '@local/domains/components/ui/ComponentListSkeleton';
import ComponentSortToggle from '@local/domains/components/ui/ComponentSortToggle';
import React, { Suspense } from 'react';
import styles from './ComponentsPage.module.scss';

const ComponentsPage = () => {
  const components: string[] = fetchAllComponents();
  const previews = fetchCardPreviews(components);

  return (
    <Section size="xlarge" UNSAFE_className={styles.page}>
      <Flex alignmentX="center" marginBottom="space-1200">
        <ComponentSortToggle />
      </Flex>
      <Suspense fallback={<ComponentListSkeleton />}>
        <ComponentList components={components} previews={previews} />
      </Suspense>
    </Section>
  );
};

export default ComponentsPage;
