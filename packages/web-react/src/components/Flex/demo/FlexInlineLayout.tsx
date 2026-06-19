import React from 'react';
import DocsBox from '../../../../docs/DocsBox';
import Flex from '../Flex';

const FlexInlineLayout = () => (
  <>
    <Flex isInline>
      <DocsBox size="small">Item 1</DocsBox>
      <DocsBox size="small">Item 2</DocsBox>
      <DocsBox size="small">Item 3</DocsBox>
    </Flex>
    <Flex isInline direction="vertical" elementType="ul">
      <li className="docs-Box docs-Box--small">Item 1</li>
      <li className="docs-Box docs-Box--small">Item 2</li>
      <li className="docs-Box docs-Box--small">Item 3</li>
    </Flex>
  </>
);

export default FlexInlineLayout;
