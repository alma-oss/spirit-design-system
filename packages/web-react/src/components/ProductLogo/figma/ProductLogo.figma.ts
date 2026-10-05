// url=<FIGMA_FILE_ID>?node-id=20923%3A6477
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/ProductLogo/ProductLogo.tsx
// component=ProductLogo

import figma from 'figma';

const example = figma.code`
  <ProductLogo>
    <img src="path-to-logo" alt="Product Logo" height="60" width="120" />
  </ProductLogo>`;

export default {
  id: 'ProductLogo',
  imports: ["import { ProductLogo } from '@alma-oss/spirit-web-react';"],
  example,
};
