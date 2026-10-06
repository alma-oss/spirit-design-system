'use client';

import {
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  Dropdown,
  DropdownPopover,
  DropdownTrigger,
  Flex,
  Heading,
  Icon,
  Item,
  Label,
  SplitButton,
  Tag,
  Text,
  Toast,
  ToastBar,
  ToastBarMessage,
  VisuallyHidden,
} from '@alma-oss/spirit-web-react';
import useBreadcrumbs from '@local/hooks/useBreadcrumbs';
import useIsComponentUnstable from '@local/hooks/useIsComponentUnstable';
import React, { type ReactNode, useEffect, useId, useState } from 'react';
import ComponentBand from './ComponentBand';
import styles from './ComponentHeader.module.scss';

interface ComponentHeaderProps {
  description?: string;
  /** Rendered below the header inside the same section, e.g. the component playground. */
  children?: ReactNode;
}

const TOAST_DURATION = 3000;

const PAGE_ACTIONS = ['Copy page as Markdown', 'Open in Storybook', 'Open on GitHub', 'Open in Figma'];

// The page actions are UI only for now; Copy page only shows the confirmation toast and does not copy anything yet.
const ComponentHeader = ({ description = '', children = null }: ComponentHeaderProps) => {
  const { breadcrumbs, currentPage } = useBreadcrumbs();
  const isComponentUnstable = useIsComponentUnstable(currentPage.slug);
  const id = useId();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);

  useEffect(() => {
    if (!isToastOpen) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setIsToastOpen(false), TOAST_DURATION);

    return () => window.clearTimeout(timeout);
  }, [isToastOpen]);

  const showToast = () => {
    setIsDropdownOpen(false);
    setIsToastOpen(true);
  };

  return (
    <ComponentBand variant="header">
      <div className={styles.ComponentHeader}>
        <div className={styles.ComponentHeader__text}>
          <Breadcrumbs>
            <BreadcrumbsItem key="homepage" href="/">
              Spirit
            </BreadcrumbsItem>
            {breadcrumbs.map((breadcrumb) => (
              <BreadcrumbsItem key={breadcrumb.slug} href={breadcrumb.url} isCurrent={breadcrumb.isCurrent}>
                {breadcrumb.name}
              </BreadcrumbsItem>
            ))}
          </Breadcrumbs>

          <div className={styles.ComponentHeader__title}>
            <Heading elementType="h1" size="large" fontWeight="semibold" marginBottom="space-0">
              <Flex elementType="span" alignmentX="stretch" alignmentY="center" spacing="space-1000">
                {currentPage.name}
                {isComponentUnstable && (
                  <Tag size="large" color="warning">
                    Unstable
                  </Tag>
                )}
              </Flex>
            </Heading>

            {description && (
              <Text elementType="p" size="medium" marginBottom="space-0">
                {description}
              </Text>
            )}
          </div>
        </div>

        <SplitButton color="tertiary" size="small">
          <Button onClick={showToast}>
            <Icon name="placeholder" />
            Copy page
          </Button>
          <Dropdown
            id={`${id}-page-actions`}
            isOpen={isDropdownOpen}
            onToggle={() => setIsDropdownOpen((isOpen) => !isOpen)}
            placement="bottom-end"
          >
            <DropdownTrigger elementType={Button}>
              <VisuallyHidden>More page actions</VisuallyHidden>
              <Icon name="chevron-down" />
            </DropdownTrigger>
            <DropdownPopover aria-label="Page actions">
              {PAGE_ACTIONS.map((action, index) => (
                <Item
                  key={action}
                  elementType="button"
                  startSlot={<Icon name="placeholder" />}
                  onClick={index === 0 ? showToast : () => setIsDropdownOpen(false)}
                >
                  <Label>{action}</Label>
                </Item>
              ))}
            </DropdownPopover>
          </Dropdown>
        </SplitButton>
      </div>
      <Toast alignmentX="center" alignmentY="bottom">
        <ToastBar id={`${id}-toast`} isOpen={isToastOpen}>
          <ToastBarMessage>Copied to clipboard</ToastBarMessage>
        </ToastBar>
      </Toast>
      {children && <div className={styles.ComponentHeader__content}>{children}</div>}
    </ComponentBand>
  );
};

export default ComponentHeader;
