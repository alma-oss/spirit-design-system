'use client';

import { Breadcrumbs, BreadcrumbsItem, Flex, Heading, Section, Tag } from '@alma-oss/spirit-web-react';
import useBreadcrumbs from '@local/hooks/useBreadcrumbs';
import useIsComponentUnstable from '@local/hooks/useIsComponentUnstable';
import React from 'react';

const ComponentCover = () => {
  const { breadcrumbs, currentPage } = useBreadcrumbs();
  const isComponentUnstable = useIsComponentUnstable(currentPage.slug);

  return (
    <Section size="xlarge">
      <Heading elementType="h1" size="xlarge" emphasis="bold">
        <Flex elementType="span" alignmentX="stretch" alignmentY="center" spacing="space-1000">
          {currentPage.name}
          {isComponentUnstable && (
            <Tag size="large" color="warning">
              Unstable
            </Tag>
          )}
        </Flex>
      </Heading>

      <Breadcrumbs>
        <BreadcrumbsItem key="homepage" href="/">
          Spirit
        </BreadcrumbsItem>
        {breadcrumbs.map((breadcrumb) => (
          <BreadcrumbsItem key={breadcrumb.slug} href={breadcrumb.url} isCurrent={breadcrumb.isCurrent}>
            {breadcrumb.name}
          </BreadcrumbsItem>
        ))}
      </Breadcrumbs>
    </Section>
  );
};

export default ComponentCover;
