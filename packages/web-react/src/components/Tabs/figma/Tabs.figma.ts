// url=<FIGMA_FILE_ID>?node-id=4611%3A4332
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Tabs/Tabs.tsx
// component=Tabs

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

// Content Slot holds the tab bar's own items (each a "Subcomponent Tab Item"), not pane content —
// Figma's Tabs component only models the tab bar, so the pane below is an illustrative placeholder.
const items = instance.getSlot('Content Slot');

export default {
  id: 'Tabs',
  imports: ["import { TabContent, TabList, TabPane, Tabs } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <Tabs selectedTab="Item 1" toggle={() => {}}>
      <TabList>
        ${items}
      </TabList>
      <TabContent>
        <TabPane id="Item 1">Pane content</TabPane>
      </TabContent>
    </Tabs>`,
};
