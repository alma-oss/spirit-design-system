'use client';

import { Breadcrumbs, BreadcrumbsItem, Flex, Heading, Tag, Text } from '@alma-oss/spirit-web-react';
import { COMPONENTS_BAND_VARIANTS, ComponentsBand } from '@local/domains/components/ui/ComponentsBand';
import { PageActions, type PageLink } from '@local/domains/components/ui/PageActions';
import { routes } from '@local/domains/routing/routes';
import useBreadcrumbs from '@local/hooks/useBreadcrumbs';
import useIsComponentUnstable from '@local/hooks/useIsComponentUnstable';
import { type ReactNode } from 'react';
import './ComponentHeader.scss';

interface ComponentHeaderProps {
  description?: string;
  links: readonly PageLink[];
  /** Rendered below the header inside the same band, e.g. the component playground. */
  children?: ReactNode;
}

const ComponentHeader = ({ description = '', links, children = null }: ComponentHeaderProps) => {
  const { breadcrumbs, currentPage } = useBreadcrumbs();
  const isComponentUnstable = useIsComponentUnstable(currentPage.slug);

  return (
    <ComponentsBand variant={COMPONENTS_BAND_VARIANTS.DETAIL_HEADER}>
      <div className="ComponentHeader">
        <div className="ComponentHeader__text">
          <Breadcrumbs>
            <BreadcrumbsItem key="homepage" href={routes.homepage}>
              Spirit
            </BreadcrumbsItem>
            {breadcrumbs.map((breadcrumb) => (
              <BreadcrumbsItem key={breadcrumb.slug} href={breadcrumb.url} isCurrent={breadcrumb.isCurrent}>
                {breadcrumb.name}
              </BreadcrumbsItem>
            ))}
          </Breadcrumbs>

          <div className="ComponentHeader__title">
            <Heading elementType="h1" size="large" fontWeight="semibold" marginBottom="space-0">
              <Flex elementType="span" alignmentX="stretch" alignmentY="center" spacing="space-1000">
                {currentPage.name}
                {isComponentUnstable && (
                  <Tag size="large" color="warning">
                    Unstable
                  </Tag>
                )}
              </Flex>
            </Heading>

            {description && (
              <Text elementType="p" size="medium" marginBottom="space-0">
                {description}
              </Text>
            )}
          </div>
        </div>

        <div className="ComponentHeader__actions">
          <PageActions title={currentPage.name} description={description} links={links} />
        </div>
      </div>
      {children && <div className="ComponentHeader__content">{children}</div>}
    </ComponentsBand>
  );
};

export default ComponentHeader;
