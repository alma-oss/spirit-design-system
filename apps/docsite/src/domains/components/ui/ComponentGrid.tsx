import { type ChildrenProps } from '@alma-oss/spirit-web-react';
import React from 'react';
import styles from './ComponentGrid.module.scss';

interface ComponentGridProps extends ChildrenProps {}

const ComponentGrid = ({ children }: ComponentGridProps) => <ul className={styles.grid}>{children}</ul>;

export default ComponentGrid;
