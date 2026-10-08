'use client';

import {
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  Dropdown,
  DropdownPopover,
  DropdownTrigger,
  Heading,
  Icon,
  Item,
  Label,
  SplitButton,
  Text,
  Toast,
  ToastBar,
  ToastBarMessage,
  VisuallyHidden,
} from '@alma-oss/spirit-web-react';
import React, { useEffect, useId, useState } from 'react';
import ComponentSearch from './ComponentSearch';
import ComponentSortToggle from './ComponentSortToggle';
import styles from './ComponentsPageHeader.module.scss';

const TOAST_DURATION = 3000;

const PAGE_ACTIONS = ['Copy page as Markdown', 'Open in Storybook', 'Open on GitHub', 'Open in Figma'];

// The page actions are UI only for now; Copy page only shows the confirmation toast and does not copy anything yet.
// The same block lives in the component detail header and the two will be unified later.
const ComponentsPageHeader = () => {
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
    <div className={styles.header}>
      <div className={styles.top}>
        <div className={styles.text}>
          <Breadcrumbs>
            <BreadcrumbsItem key="homepage" href="/">
              Spirit
            </BreadcrumbsItem>
            <BreadcrumbsItem key="components" href="/components" isCurrent>
              Components
            </BreadcrumbsItem>
          </Breadcrumbs>

          <div className={styles.title}>
            <Heading elementType="h1" size="large" fontWeight="semibold" marginBottom="space-0">
              Components
            </Heading>
            <Text elementType="p" size="medium" marginBottom="space-0">
              Explore the Spirit components, see how they look, and find the one you need.
            </Text>
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

      <div className={styles.toolbar}>
        <ComponentSortToggle />
        <ComponentSearch />
      </div>

      <Toast alignmentX="center" alignmentY="bottom">
        <ToastBar id={`${id}-toast`} isOpen={isToastOpen}>
          <ToastBarMessage>Copied to clipboard</ToastBarMessage>
        </ToastBar>
      </Toast>
    </div>
  );
};

export default ComponentsPageHeader;
