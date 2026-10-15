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
import './ComponentsPageHeader.scss';

const TOAST_DURATION = 3000;

const PAGE_TITLE = 'Components';
const PAGE_DESCRIPTION = 'Explore the Spirit components, see how they look, and find the one you need.';

const PAGE_ACTIONS = [
  { label: 'Copy page as Markdown', href: undefined },
  { label: 'Open in Storybook', href: 'https://spirit-design-system-storybook.netlify.app/' },
  { label: 'Open on GitHub', href: 'https://github.com/alma-oss/spirit-design-system/' },
  {
    label: 'Open in Figma',
    href: 'https://www.figma.com/design/w9Ca4hvkuYLshsrHu1bYwT/Spirit-UI-KIT',
  },
] as const;

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

  const copyPage = async () => {
    const markdown = `# ${PAGE_TITLE}\n\n${PAGE_DESCRIPTION}\n\n${window.location.href}`;

    try {
      await navigator.clipboard.writeText(markdown);
      setIsDropdownOpen(false);
      setIsToastOpen(true);
    } catch {
      // A denied clipboard write must not report success.
      setIsDropdownOpen(false);
    }
  };

  const openAction = (href: string) => {
    setIsDropdownOpen(false);
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="ComponentsPageHeader">
      <div className="ComponentsPageHeader__top">
        <div className="ComponentsPageHeader__text">
          <Breadcrumbs>
            <BreadcrumbsItem key="homepage" href="/">
              Spirit
            </BreadcrumbsItem>
            <BreadcrumbsItem key="components" href="/components" isCurrent>
              Components
            </BreadcrumbsItem>
          </Breadcrumbs>

          <div className="ComponentsPageHeader__title">
            <Heading elementType="h1" size="large" fontWeight="semibold" marginBottom="space-0">
              {PAGE_TITLE}
            </Heading>
            <Text elementType="p" size="medium" marginBottom="space-0">
              {PAGE_DESCRIPTION}
            </Text>
          </div>
        </div>

        <SplitButton color="tertiary" size="small">
          <Button onClick={copyPage}>
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
              {PAGE_ACTIONS.map((action) => (
                <Item
                  key={action.label}
                  elementType="button"
                  startSlot={<Icon name="placeholder" />}
                  onClick={action.href === undefined ? copyPage : () => openAction(action.href)}
                >
                  <Label>{action.label}</Label>
                </Item>
              ))}
            </DropdownPopover>
          </Dropdown>
        </SplitButton>
      </div>

      <div className="ComponentsPageHeader__toolbar">
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
