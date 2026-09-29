// url=<FIGMA_FILE_ID>?node-id=4611%3A4332
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Tabs/Tabs.tsx
// component=Tabs

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

// Content Slot holds the tab bar's own items (each a "Subcomponent Tab Item"), not pane content —
// Figma's Tabs component only models the tab bar, so the pane below is an illustrative placeholder.
const items = instance.getSlot('Content Slot');

// Resolve the first item's own template independently to read the same stable slug it renders
// with, so the initially-selected tab and its illustrative pane always stay in sync.
const firstItem = instance.findInstance('Subcomponent Tab Item', { traverseInstances: true });
let firstItemSlug;

if (firstItem && firstItem.type === 'INSTANCE') {
  firstItemSlug = firstItem.executeTemplate().metadata?.props?.slug;
}
const selectedTab = firstItemSlug ?? 'item-1';

export default {
  id: 'Tabs',
  imports: ["import { TabContent, TabList, TabPane, Tabs } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <Tabs selectedTab="${selectedTab}" toggle={() => {}}>
      <TabList>
        ${items}
      </TabList>
      <TabContent>
        <TabPane id="${selectedTab}">Pane content</TabPane>
      </TabContent>
    </Tabs>`,
};
