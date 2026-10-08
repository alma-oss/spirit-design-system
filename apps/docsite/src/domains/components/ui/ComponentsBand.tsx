import { Container } from '@alma-oss/spirit-web-react';
import classNames from 'classnames';
import React, { type ReactNode } from 'react';
import styles from './ComponentsBand.module.scss';

type ComponentsBandVariant = 'header' | 'heading' | 'grid';

interface ComponentsBandProps {
  variant?: ComponentsBandVariant;
  children: ReactNode;
}

// A full-width block of the components page. The container inside carries the vertical lines on the whole height of
// the block. The header block is closed with a full-width line.
const ComponentsBand = ({ variant = 'grid', children }: ComponentsBandProps) => (
  <div className={classNames(styles.band, { [styles['band--header']]: variant === 'header' })}>
    <Container
      size="xlarge"
      UNSAFE_className={classNames(styles.container, {
        [styles['container--header']]: variant === 'header',
        [styles['container--heading']]: variant === 'heading',
        [styles['container--grid']]: variant === 'grid',
      })}
    >
      {children}
    </Container>
  </div>
);

export default ComponentsBand;
