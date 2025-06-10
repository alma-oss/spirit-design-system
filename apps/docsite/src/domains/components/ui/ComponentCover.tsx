'use client';

import { Breadcrumbs, BreadcrumbsItem, Container, Flex, Section, Tag } from '@alma-oss/spirit-web-react';
import useBreadcrumbs from '@local/hooks/useBreadcrumbs';
import React from 'react';
import HeadLine from './HeadLine';

const ComponentCover = ({ isUnstable }: { isUnstable: boolean }) => {
  const { breadcrumbs, currentPage } = useBreadcrumbs();

  return (
    <Section
      marginBottom={{ mobile: 'space-900', tablet: 'space-1200' }}
      UNSAFE_className="bg-primary docs-border-bottom-basic py-1200 py-tablet-1700"
    >
      <Container>
        <Flex elementType={HeadLine} alignmentX={'stretch'} alignmentY="center" spacing="space-1000">
          {currentPage.name}
          {isUnstable && (
            <Tag size="large">
              Component
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
