'use client';

import { Link, Tag } from '@alma-oss/spirit-web-react';
import { routes } from '@local/domains/routing/routes';
import useIsComponentUnstable from '@local/hooks/useIsComponentUnstable';
import NextLink from 'next/link';
import React from 'react';
import { getComponentCatalogEntry } from '../../model/componentCatalog';
import { PreviewFrame } from '../PreviewFrame';
import styles from './ComponentCard.module.scss';

interface ComponentCardProps {
  component: string;
}

const ComponentCard = ({ component }: ComponentCardProps) => {
  const isUnstable = useIsComponentUnstable(component.toLowerCase());
  const { description, guides, Preview } = getComponentCatalogEntry(component);

  return (
    <li className={styles.card}>
      <PreviewFrame guides={guides} contentClassName={styles.preview}>
        {Preview ? <Preview /> : undefined}
      </PreviewFrame>
      <span className={styles.badge}>
        <Tag size="xsmall" color={isUnstable ? 'warning' : 'success'} isSubtle>
          {isUnstable ? 'Unstable' : 'Stable'}
        </Tag>
      </span>
      <div className={styles.text}>
        <Link
          elementType={NextLink}
          href={routes.component(component)}
          color="primary"
          underlined="never"
          isStretched
          UNSAFE_className={`typography-body-medium-semibold ${styles.name}`}
        >
          {component}
        </Link>
        <p className={`typography-body-small-regular text-secondary ${styles.description}`}>{description}</p>
      </div>
    </li>
  );
};

export default ComponentCard;
