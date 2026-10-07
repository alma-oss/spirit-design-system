import { type ReactNode } from 'react';
import styles from './Eyebrow.module.scss';

interface EyebrowProps {
  children: ReactNode;
  /** Whether the text is centered, it is aligned to the start by default. */
  isCentered?: boolean;
}

// A short uppercase label above a heading.
const Eyebrow = ({ children, isCentered = false }: EyebrowProps) => (
  <p className={isCentered ? `${styles.Eyebrow} ${styles['Eyebrow--centered']}` : styles.Eyebrow}>{children}</p>
);

export default Eyebrow;
