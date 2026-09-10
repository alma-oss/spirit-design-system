import { type IframeHTMLAttributes } from 'react';
import styles from './Embed.module.scss';

const Embed = ({ title, ...props }: IframeHTMLAttributes<HTMLIFrameElement>) => (
  <iframe className={styles.Embed} title={title || 'Embedded content'} {...props} />
);

export default Embed;
