import { type ReactNode } from 'react';
import styles from './MarkdownContent.module.scss';

interface MarkdownContentProps {
  children: ReactNode;
}

const MarkdownContent = ({ children }: MarkdownContentProps) => (
  <div className={styles.MarkdownContent}>{children}</div>
);

export default MarkdownContent;
