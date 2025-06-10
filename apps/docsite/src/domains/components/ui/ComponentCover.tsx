'use client';

import { Breadcrumbs, BreadcrumbsItem, Container, Flex, Section, Tag } from '@alma-oss/spirit-web-react';
import useBreadcrumbs from '@local/hooks/useBreadcrumbs';
import useIsComponentUnstable from '@local/hooks/useIsComponentUnstable';
import React from 'react';
import HeadLine from './HeadLine';

const ComponentCover = () => {
  const { breadcrumbs, currentPage } = useBreadcrumbs();
  const isComponentUnstable = useIsComponentUnstable(currentPage.slug);

  return (
    <Section
      marginBottom={{ mobile: 'space-900', tablet: 'space-1200' }}
      UNSAFE_className="bg-primary docs-border-bottom-basic py-1200 py-tablet-1700"
    >
      <Container>
        <Flex elementType={HeadLine} alignmentX="stretch" alignmentY="center" spacing="space-1000">
          {currentPage.name}
          {isComponentUnstable && (
            <Tag size="large" color="warning">
              Unstable
            </Tag>
          )}
        </Flex>
        <Breadcrumbs>
          <BreadcrumbsItem key="spirit" href="/">
            Spirit
          </BreadcrumbsItem>
          {breadcrumbs.map((breadcrumb) => (
            <BreadcrumbsItem key={breadcrumb.slug} href={breadcrumb.url} isCurrent={breadcrumb.isCurrent}>
              {breadcrumb.name}
            </BreadcrumbsItem>
          ))}
        </Breadcrumbs>
      </Container>
    </Section>
  );
};

export default ComponentCover;
