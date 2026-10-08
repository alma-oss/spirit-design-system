'use client';

import { Link, Tag } from '@alma-oss/spirit-web-react';
import { getComponentDescription } from '@local/domains/components/constants/componentDescriptions';
import { routes } from '@local/domains/routing/routes';
import useIsComponentUnstable from '@local/hooks/useIsComponentUnstable';
import NextLink from 'next/link';
import React from 'react';
import styles from './ComponentCard.module.scss';
import PreviewFrame from './PreviewFrame';

interface ComponentCardProps {
  component: string;
  previewHtml?: string;
}

const ComponentCard = ({ component, previewHtml = undefined }: ComponentCardProps) => {
  const isUnstable = useIsComponentUnstable(component.toLowerCase());

  return (
    <li className={styles.card}>
      <PreviewFrame
        html={previewHtml}
        contentClassName={styles.preview}
        badge={
          <span className={styles.badge}>
            <Tag size="xsmall" color={isUnstable ? 'warning' : 'success'} isSubtle>
              {isUnstable ? 'Unstable' : 'Stable'}
            </Tag>
          </span>
        }
      />
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
        <p className={`typography-body-small-regular text-secondary ${styles.description}`}>
          {getComponentDescription(component)}
        </p>
      </div>
    </li>
  );
};

export default ComponentCard;
