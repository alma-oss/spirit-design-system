import React from 'react';
import { Heading, Section, SkipLink, Text } from '../../..';
import DocsBox from '../../../../docs/DocsBox';

const SkipLinkDefault = () => (
  <>
    <SkipLink href="#skiplink-demo-main-content">Skip to demo main content</SkipLink>

    <Text>
      To show the skip links, you can use the keyboard shortcut <kbd>Tab</kbd> to focus on the links. To select a link,
      press the key <kbd>Enter</kbd>.
    </Text>

    <Section id="skiplink-demo-main-content" size="xsmall" hasContainer={false}>
      <Heading elementType="h3" size="xsmall" fontWeight="semibold" marginBottom="space-700">
        This is the main content area for the demonstration purpose.
      </Heading>
      <DocsBox isMultiline UNSAFE_className="py-1400 py-tablet-1600">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure quisquam, saepe. A accusamus aliquid
          distinctio, ducimus earum exercitationem fuga id in iste natus nesciunt officiis pariatur possimus quam
          recusandae velit.
        </Text>
      </DocsBox>
    </Section>
  </>
);

export default SkipLinkDefault;
