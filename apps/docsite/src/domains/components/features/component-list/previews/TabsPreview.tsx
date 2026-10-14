'use client';

import { TabItem, TabList, UncontrolledTabs } from '@alma-oss/spirit-web-react';
import React from 'react';

const TabsPreview = () => (
  <UncontrolledTabs defaultSelectedTab="item-1">
    <TabList>
      <TabItem forTabPane="item-1">Item 1</TabItem>
      <TabItem forTabPane="item-2">Item 2</TabItem>
      <TabItem forTabPane="item-3">Item 3</TabItem>
    </TabList>
  </UncontrolledTabs>
);

export default TabsPreview;
