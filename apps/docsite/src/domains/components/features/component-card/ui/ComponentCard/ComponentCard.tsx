'use client';

import { EmotionColors, Link, Tag } from '@alma-oss/spirit-web-react';
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
  const { name: component, description, illustration } = entry;
  const isUnstable = useIsComponentUnstable(component.toLowerCase());

  return (
    <li className="ComponentCard">
      <PreviewFrame>
        {/* Static decorative SVG – next/image adds no optimization for it. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {illustration ? <img src={illustration} width={156} height={125} alt="" /> : undefined}
      </PreviewFrame>
      <span className="ComponentCard__badge">
        <Tag size="xsmall" color={isUnstable ? EmotionColors.WARNING : EmotionColors.SUCCESS} isSubtle>
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
