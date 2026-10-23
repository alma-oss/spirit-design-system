'use client';

import {
  Button,
  Dropdown,
  DropdownPopover,
  DropdownTrigger,
  Icon,
  Item,
  Label,
  SplitButton,
  Toast,
  ToastBar,
  ToastBarMessage,
  VisuallyHidden,
} from '@alma-oss/spirit-web-react';
import React, { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { type PageLink } from './pageLinks';

const TOAST_DURATION = 3000;

interface PageActionsProps {
  title: string;
  description?: string;
  links: readonly PageLink[];
}

const copyMarkdown = (title: string, description: string) =>
  [`# ${title}`, description, window.location.href].filter(Boolean).join('\n\n');

const PageActions = ({ title, description = '', links }: PageActionsProps) => {
  const id = useId();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [canPortal, setCanPortal] = useState(false);

  useEffect(() => setCanPortal(true), []);

  useEffect(() => {
    if (!isToastOpen) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setIsToastOpen(false), TOAST_DURATION);

    return () => window.clearTimeout(timeout);
  }, [isToastOpen]);

  const copyPage = async () => {
    try {
      await navigator.clipboard.writeText(copyMarkdown(title, description));
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
    <>
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
            <Item elementType="button" startSlot={<Icon name="placeholder" />} onClick={copyPage}>
              <Label>Copy page as Markdown</Label>
            </Item>
            {links.map((link) => (
              <Item
                key={link.label}
                elementType="button"
                startSlot={<Icon name="placeholder" />}
                onClick={() => openAction(link.href)}
              >
                <Label>{link.label}</Label>
              </Item>
            ))}
          </DropdownPopover>
        </Dropdown>
      </SplitButton>
      {canPortal
        ? createPortal(
            <Toast alignmentX="center" alignmentY="bottom">
              <ToastBar id={`${id}-toast`} isOpen={isToastOpen}>
                <ToastBarMessage>Copied to clipboard</ToastBarMessage>
              </ToastBar>
            </Toast>,
            document.body,
          )
        : null}
    </>
  );
};

export default PageActions;
