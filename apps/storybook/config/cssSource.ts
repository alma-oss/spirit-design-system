import type { Decorator } from '@storybook/react';
import React, { useEffect } from 'react';
import {
  DEFAULT_CSS_SOURCE_ID,
  cssSourceEntries,
} from '../cssSourceEntries';
import { getCssSourceManifestUrl, getDefaultCssSourceHref, resolveCssSourceHref } from '../cssSourceUrls';
import type { PreviewGlobals } from './types';

const LINK_ID = 'storybook-css-source-link';

let manifestCache: Record<string, string> | null = null;
async function getManifest(): Promise<Record<string, string>> {
  if (manifestCache) return manifestCache;
  const res = await fetch(getCssSourceManifestUrl());
  if (!res.ok) return {};
  manifestCache = (await res.json()) as Record<string, string>;
  return manifestCache;
}

function getPreviewCssSource(globals: PreviewGlobals): string {
  const v = globals.previewCssSource;
  return typeof v === 'string' && cssSourceEntries.some(({ id }) => id === v) ? v : DEFAULT_CSS_SOURCE_ID;
}

function ensureLink(): HTMLLinkElement | null {
  if (typeof document === 'undefined') return null;
  let link = document.getElementById(LINK_ID) as HTMLLinkElement | null;
  if (link) return link;
  link = document.createElement('link');
  link.id = LINK_ID;
  link.rel = 'stylesheet';
  link.href = getDefaultCssSourceHref();
  document.head.append(link);
  return link;
}

function applyCssSource(sourceId: string) {
  const link = ensureLink();
  if (!link) return;
  const defaultUrl = getDefaultCssSourceHref();
  if (sourceId === DEFAULT_CSS_SOURCE_ID) {
    link.href = defaultUrl;
    return;
  }
  const apply = (manifest: Record<string, string>) => {
    const url = manifest[sourceId];
    if (url) link.href = resolveCssSourceHref(url);
  };
  if (manifestCache) {
    apply(manifestCache);
    return;
  }
  getManifest().then(apply);
}

const CSS_SOURCE_TOOLBAR_ITEMS = cssSourceEntries.map(({ id, label }) => ({ title: label, value: id }));

export const cssSourceGlobalTypes = {
  previewCssSource: {
    name: 'CSS source',
    description: `Token source for the preview stylesheet (${cssSourceEntries.map(({ label }) => label).join(', ')}).`,
    defaultValue: DEFAULT_CSS_SOURCE_ID,
    toolbar: {
      icon: 'document',
      items: CSS_SOURCE_TOOLBAR_ITEMS,
      dynamicTitle: true,
    },
  },
} as const;

const CssSourceSync: React.FC<React.PropsWithChildren<{ sourceId: string }>> = ({
  sourceId,
  children,
}) => {
  useEffect(() => {
    applyCssSource(sourceId);
  }, [sourceId]);
  return children as React.ReactElement;
};

const withCssSource: Decorator = (Story: any, context: any) => {
  const sourceId = getPreviewCssSource(context.globals);
  applyCssSource(sourceId);
  return React.createElement(CssSourceSync, { sourceId }, Story(context));
};

export const cssSourceDecorators = [withCssSource];
