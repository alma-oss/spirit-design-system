import figma from '@figma/code-connect';
import React from 'react';
import { ActionGroup } from '../../ActionGroup';
import { ButtonLink } from '../../Button';
import { Heading } from '../../Heading';
import { Link } from '../../Link';
import { Text } from '../../Text';
import EmptyState from '../EmptyState';
import EmptyStateSection from '../EmptyStateSection';

const EMPTY_STATE_NODE_URL = '<FIGMA_FILE_ID>?node-id=19110%3A1243';

figma.connect(EmptyState, EMPTY_STATE_NODE_URL, {
  props: {
    artwork: figma.boolean('Show Artwork', {
      true: <EmptyStateSection>Replace with your own illustration content</EmptyStateSection>,
      false: undefined,
    }),
    buttons: figma.boolean('Show Buttons', {
      true: (
        <EmptyStateSection>
          <ActionGroup alignmentX={{ mobile: 'stretch', tablet: 'center' }}>
            <ButtonLink href="#">Button</ButtonLink>
            <ButtonLink href="#" color="secondary">
              Button
            </ButtonLink>
          </ActionGroup>
        </EmptyStateSection>
      ),
      false: undefined,
    }),
    headline: figma.boolean('Headline', {
      true: <Heading elementType="h2">Headline</Heading>,
      false: undefined,
    }),
    link: figma.boolean('Show Link', {
      true: (
        <EmptyStateSection>
          <Link href="#link">Link to something</Link>
        </EmptyStateSection>
      ),
      false: undefined,
    }),
    paragraph: figma.boolean('Paragraph text', {
      true: (
        <Text>
          In publishing and graphic design, lorem ipsum is common placeholder text used to demonstrate the graphic
          elements
        </Text>
      ),
      false: undefined,
    }),
  },
  example: ({ artwork, buttons, headline, link, paragraph, ...props }) => (
    <EmptyState {...props}>
      {artwork}
      <EmptyStateSection>
        {headline}
        {paragraph}
      </EmptyStateSection>
      {buttons}
      {link}
    </EmptyState>
  ),
});
