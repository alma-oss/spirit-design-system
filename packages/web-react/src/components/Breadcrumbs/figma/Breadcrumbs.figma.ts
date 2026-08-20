// url=<FIGMA_FILE_ID>?node-id=3160%3A4551
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Breadcrumbs/Breadcrumbs.tsx
// component=Breadcrumbs

import figma from 'figma';

export default {
  id: 'Breadcrumbs',
  imports: ["import { Breadcrumbs } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <Breadcrumbs
      items={[
        {
          title: 'Root',
          url: '#rootUrl',
        },
        {
          title: 'Category',
          url: '#categoryUrl',
        },
        {
          title: 'Subcategory',
          url: '#subcategoryUrl',
        },
        {
          title: 'Current page',
          url: '#currentUrl',
        },
      ]}
      goBackTitle="Back"
    />`,
};
