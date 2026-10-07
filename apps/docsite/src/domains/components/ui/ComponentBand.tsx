import { Container } from '@alma-oss/spirit-web-react';
import classNames from 'classnames';
import { type ReactNode } from 'react';
import styles from './ComponentBand.module.scss';

export type ComponentBandVariant = 'header' | 'tabs' | 'content';

interface ComponentBandProps {
  variant?: ComponentBandVariant;
  children: ReactNode;
}

/**
 * A full-width block of a component page. The container inside carries the vertical guides on the whole height of the
 * block, the horizontal divider closes the block (except for the header, which flows into the tabs).
 *
 * @param root0
 * @param root0.variant
 * @param root0.children
 */
const ComponentBand = ({ variant = 'content', children }: ComponentBandProps) => (
  <div className={classNames(styles.ComponentBand, styles[`ComponentBand--${variant}`])}>
    <Container size="xlarge" UNSAFE_className={styles.ComponentBand__container}>
      {children}
    </Container>
  </div>
);

export default ComponentBand;
