// url=<FIGMA_FILE_ID>?node-id=19110%3A1243
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/EmptyState/EmptyState.tsx
// component=EmptyState

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const artworkSlot = instance.getSlot('Artwork');
const headlineText = instance.getString('Headline Text');
const descriptionText = instance.getString('Description Text');
const showHeadline = instance.getBoolean('Headline');
const showDescription = instance.getBoolean('Description');
const showButtons = instance.getBoolean('Show Buttons');
const showLink = instance.getBoolean('Link');

export default {
  id: 'EmptyState',
  imports: ["import { Button, EmptyState, EmptyStateSection, Heading, Link, Text } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <EmptyState>
      ${artworkSlot}
      ${
        showHeadline || showDescription
          ? figma.code`
            <EmptyStateSection>
              ${showHeadline ? figma.code`<Heading elementType="h2">${headlineText}</Heading>` : ''}
              ${showDescription ? figma.code`<Text>${descriptionText}</Text>` : ''}
            </EmptyStateSection>`
          : ''
      }
      ${
        showButtons
          ? figma.code`
            <EmptyStateSection>
              <Button>Action</Button>
              <Button color="secondary">Action</Button>
            </EmptyStateSection>`
          : ''
      }
      ${
        showLink
          ? figma.code`
            <EmptyStateSection>
              <Link href="#">Link to something</Link>
            </EmptyStateSection>`
          : ''
      }
    </EmptyState>`,
};
