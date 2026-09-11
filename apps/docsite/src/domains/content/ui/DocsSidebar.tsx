'use client';

import { Collapse, Icon, Navigation, NavigationAction, NavigationItem } from '@alma-oss/spirit-web-react';
import NextLink from 'next/link';
import React from 'react';
import type { NavNode } from '../repository';

interface DocsSidebarProps {
  nodes: NavNode[];
  currentPath: string;
}

const isCurrent = (href: string, currentPath: string) => href === currentPath;

const isActiveBranch = (href: string, currentPath: string) =>
  currentPath === href || currentPath.startsWith(`${href}/`);

const DocsSidebarItem = ({ node, currentPath }: { node: NavNode; currentPath: string }) => {
  const selected = isCurrent(node.href, currentPath);
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
              <DocsSidebarItem key={child.href} node={child} currentPath={currentPath} />
            ))}
          </ul>
        </Collapse>
      )}
    </NavigationItem>
  );
};

const DocsSidebar = ({ nodes, currentPath }: DocsSidebarProps) => (
  <div className="docs-Sidebar">
    <Navigation aria-label="Section" direction="vertical">
      {nodes.map((node) => (
        <DocsSidebarItem key={node.href} node={node} currentPath={currentPath} />
      ))}
    </Navigation>
  </div>
);

export default DocsSidebar;
