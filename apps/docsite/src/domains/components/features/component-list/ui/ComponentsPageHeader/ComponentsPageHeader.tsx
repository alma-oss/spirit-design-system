'use client';

import { Breadcrumbs, BreadcrumbsItem, Heading, Text } from '@alma-oss/spirit-web-react';
import { listingPageLinks, PageActions } from '@local/domains/components/ui/PageActions';
import { routes } from '@local/domains/routing/routes';
import { ComponentSearch } from '../../../component-list-search';
import { ComponentSortToggle } from '../../../component-list-sort';
import './ComponentsPageHeader.scss';

const PAGE_TITLE = 'Components';
const PAGE_DESCRIPTION = 'Explore the Spirit components, see how they look, and find the one you need.';

const ComponentsPageHeader = () => (
  <div className="ComponentsPageHeader">
    <div className="ComponentsPageHeader__top">
      <div className="ComponentsPageHeader__text">
        <Breadcrumbs>
          <BreadcrumbsItem key="homepage" href={routes.homepage}>
            Spirit
          </BreadcrumbsItem>
          <BreadcrumbsItem key="components" href={routes.components} isCurrent>
            Components
          </BreadcrumbsItem>
        </Breadcrumbs>

        <div className="ComponentsPageHeader__title">
          <Heading elementType="h1" size="large" fontWeight="semibold" marginBottom="space-0">
            {PAGE_TITLE}
          </Heading>
          <Text elementType="p" size="medium" marginBottom="space-0">
            {PAGE_DESCRIPTION}
          </Text>
        </div>
      </div>

      <PageActions title={PAGE_TITLE} description={PAGE_DESCRIPTION} links={listingPageLinks} />
    </div>

    <div className="ComponentsPageHeader__toolbar">
      <ComponentSortToggle />
      <ComponentSearch />
    </div>
  </div>
);

export default ComponentsPageHeader;
