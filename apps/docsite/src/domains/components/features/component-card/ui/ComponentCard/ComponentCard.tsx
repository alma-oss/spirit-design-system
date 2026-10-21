'use client';

import { Link, Tag } from '@alma-oss/spirit-web-react';
import { routes } from '@local/domains/routing/routes';
import useIsComponentUnstable from '@local/hooks/useIsComponentUnstable';
import NextLink from 'next/link';
import React from 'react';
import type { ComponentCatalogEntry } from '../../../component-catalog';
import { PreviewFrame } from '../PreviewFrame';
import './ComponentCard.scss';

interface ComponentCardProps {
  entry: ComponentCatalogEntry;
}

const ComponentCard = ({ entry }: ComponentCardProps) => {
  const { name: component, description, guides, Preview } = entry;
  const isUnstable = useIsComponentUnstable(component.toLowerCase());

  return (
    <li className="ComponentCard">
      <PreviewFrame guides={guides} contentClassName="ComponentCard__preview">
        {Preview ? <Preview /> : undefined}
      </PreviewFrame>
      <span className="ComponentCard__badge">
        <Tag size="xsmall" color={isUnstable ? 'warning' : 'success'} isSubtle>
          {isUnstable ? 'Unstable' : 'Stable'}
        </Tag>
      </span>
      <div className="ComponentCard__text">
        <Link
          elementType={NextLink}
          href={routes.component(component)}
          color="primary"
          underlined="never"
          isStretched
          UNSAFE_className="typography-body-medium-semibold ComponentCard__name"
        >
          {component}
        </Link>
        <p className="typography-body-small-regular text-secondary ComponentCard__description">{description}</p>
      </div>
    </li>
  );
};

export default ComponentCard;
