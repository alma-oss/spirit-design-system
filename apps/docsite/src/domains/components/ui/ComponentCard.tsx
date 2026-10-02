'use client';

import { Card, CardBody, CardLink, CardTitle, Tag } from '@alma-oss/spirit-web-react';
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
    <li className="d-grid">
      <Card UNSAFE_className={styles.card}>
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
        <CardBody UNSAFE_className={styles.body}>
          <CardTitle isHeading>
            <CardLink elementType={NextLink} href={routes.component(component)} UNSAFE_className="link-secondary">
              {component}
            </CardLink>
          </CardTitle>
        </CardBody>
      </Card>
    </li>
  );
};

export default ComponentCard;
