'use client';

import { Collapse, Icon, Navigation, NavigationAction, NavigationItem } from '@alma-oss/spirit-web-react';
import { isActiveBranch, isCurrentPath } from '@local/domains/routing/navPath';
import NextLink from 'next/link';
import React from 'react';
import type { NavNode } from '../repository';
import styles from './Sidebar.module.scss';

interface DocsSidebarProps {
  nodes: NavNode[];
  currentPath: string;
}

const SidebarItem = ({ node, currentPath }: { node: NavNode; currentPath: string }) => {
  const selected = isCurrentPath(node.href, currentPath);
  const hasChildren = Boolean(node.children && node.children.length > 0);
  const isOpen = hasChildren && isActiveBranch(node.href, currentPath);

  return (
    <NavigationItem>
      <NavigationAction
        elementType={NextLink}
        href={node.href}
        isSelected={selected}
        {...(selected ? { 'aria-current': 'page' as const } : {})}
        endSlot={hasChildren ? <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} /> : undefined}
      >
        {node.title}
      </NavigationAction>
      {hasChildren && node.children && (
        <Collapse id={`docs-sidebar${node.href.replaceAll('/', '-')}`} isOpen={isOpen}>
          <ul>
            {node.children.map((child) => (
              <SidebarItem key={child.href} node={child} currentPath={currentPath} />
            ))}
          </ul>
        </Collapse>
      )}
    </NavigationItem>
  );
};

const Sidebar = ({ nodes, currentPath }: DocsSidebarProps) => (
  <div className={styles.Sidebar}>
    <Navigation aria-label="Section" direction="vertical">
      {nodes.map((node) => (
        <SidebarItem key={node.href} node={node} currentPath={currentPath} />
      ))}
    </Navigation>
  </div>
);

export default Sidebar;
