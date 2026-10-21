import { type ChildrenProps } from '@alma-oss/spirit-web-react';
import React from 'react';
import './ComponentGrid.scss';

interface ComponentGridProps extends ChildrenProps {}

const ComponentGrid = ({ children }: ComponentGridProps) => <ul className="ComponentGrid">{children}</ul>;

export default ComponentGrid;
