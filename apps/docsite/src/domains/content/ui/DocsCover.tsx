import { Breadcrumbs, BreadcrumbsItem, Heading, Section } from '@alma-oss/spirit-web-react';
import React from 'react';

interface DocsCoverProps {
  title: string;
  crumbs: { name: string; href: string }[];
}

const DocsCover = ({ title, crumbs }: DocsCoverProps) => (
  <Section size="xlarge">
    <Heading elementType="h1" size="xlarge" emphasis="bold">
      {title}
    </Heading>
    <Breadcrumbs>
      <BreadcrumbsItem href="/">Spirit</BreadcrumbsItem>
      {crumbs.map((crumb, index) => (
        <BreadcrumbsItem key={crumb.href} href={crumb.href} isCurrent={index === crumbs.length - 1}>
          {crumb.name}
        </BreadcrumbsItem>
      ))}
    </Breadcrumbs>
  </Section>
);

export default DocsCover;
