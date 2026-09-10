import { Breadcrumbs, BreadcrumbsItem, Heading, Section } from '@alma-oss/spirit-web-react';
import React from 'react';

interface DocsCoverProps {
  title: string;
  breadcrumbs: { name: string; href: string }[];
}

const Cover = ({ title, breadcrumbs }: DocsCoverProps) => (
  <Section size="xlarge">
    <Heading elementType="h1" size="xlarge" emphasis="bold">
      {title}
    </Heading>
    <Breadcrumbs>
      <BreadcrumbsItem href="/">Spirit</BreadcrumbsItem>
      {breadcrumbs.map((breadcrumb, index) => (
        <BreadcrumbsItem key={breadcrumb.href} href={breadcrumb.href} isCurrent={index === breadcrumbs.length - 1}>
          {breadcrumb.name}
        </BreadcrumbsItem>
      ))}
    </Breadcrumbs>
  </Section>
);

export default Cover;
