'use client';

import { componentSegments } from '@local/domains/routing/routes';
import { usePathname } from 'next/navigation';

type Breadcrumb = {
  slug: string;
  name: string;
  url: string;
  isCurrent?: boolean;
};

const COMPONENT_SEGMENTS = Object.values(componentSegments);

const slugToDisplayName = (slug: string) =>
  slug
    .split('-')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');

const assembleBreadcrumbUrl = (pathNames: string[], index: number) => `/${pathNames.slice(0, index + 1).join('/')}`;

const createBreadcrumb = (slugs: string[], slug: string, index: number): Breadcrumb => ({
  slug,
  name: slugToDisplayName(slug),
  url: assembleBreadcrumbUrl(slugs, index),
});

const useBreadcrumbs = () => {
  const pathNames = usePathname().split('/').filter(Boolean);
  const lastBreadcrumbIndex = pathNames.length - 1;

  const breadcrumbs = pathNames.map((pathName, index) => {
    const breadcrumb = createBreadcrumb(pathNames, pathName, index);
    breadcrumb.isCurrent = index === lastBreadcrumbIndex;

    return breadcrumb;
  });

  const breadcrumbsWithoutSegments = breadcrumbs.filter((breadcrumb) => !COMPONENT_SEGMENTS.includes(breadcrumb.slug));
  const currentPage = breadcrumbsWithoutSegments[breadcrumbsWithoutSegments.length - 1];

  return {
    breadcrumbs,
    currentPage,
  };
};

export default useBreadcrumbs;
