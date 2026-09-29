// url=<FIGMA_FILE_ID>?node-id=4611%3A4293
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Tabs/TabItem.tsx
// component=TabItem

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const labelText = instance.getString('Label Text');
// forTabPane must be a stable, HTML-ID-safe identifier — not the editable display label —
// so it stays valid (and in sync with the parent's TabPane) even when the label changes.
const slug = labelText
  ? labelText
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  : undefined;

export default {
  id: 'TabItem',
  imports: ["import { TabItem } from '@alma-oss/spirit-web-react';"],
  example: figma.code`<TabItem forTabPane="${slug}">${labelText}</TabItem>`,
  metadata: {
    nestable: true,
    props: { labelText, slug },
  },
};
