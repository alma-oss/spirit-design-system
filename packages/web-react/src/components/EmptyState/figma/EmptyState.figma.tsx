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
  props: {},
  variant: {
    'Show Buttons': false,
    'Show Illustration': false,
    'Show Link': false,
  },
  example: (props) => (
    <EmptyState {...props}>
      <EmptyStateSection>
        <Heading elementType="h2">Headline</Heading>
        <Text>
          In publishing and graphic design, lorem ipsum is common placeholder text used to demonstrate the graphic
          elements
        </Text>
      </EmptyStateSection>
    </EmptyState>
  ),
});

figma.connect(EmptyState, EMPTY_STATE_NODE_URL, {
  props: {},
  variant: {
    'Show Buttons': true,
    'Show Illustration': false,
    'Show Link': false,
  },
  example: (props) => (
    <EmptyState {...props}>
      <EmptyStateSection>
        <Heading elementType="h2">Headline</Heading>
        <Text>
          In publishing and graphic design, lorem ipsum is common placeholder text used to demonstrate the graphic
          elements
        </Text>
      </EmptyStateSection>
      <EmptyStateSection>
        <ActionGroup alignmentX={{ mobile: 'stretch', tablet: 'center' }}>
          <ButtonLink href="#">Button</ButtonLink>
          <ButtonLink href="#" color="secondary">
            Button
          </ButtonLink>
        </ActionGroup>
      </EmptyStateSection>
    </EmptyState>
  ),
});

figma.connect(EmptyState, EMPTY_STATE_NODE_URL, {
  props: {},
  variant: {
    'Show Buttons': false,
    'Show Illustration': true,
    'Show Link': false,
  },
  example: (props) => (
    <EmptyState {...props}>
      <EmptyStateSection>Replace with your own illustration content</EmptyStateSection>
      <EmptyStateSection>
        <Heading elementType="h2">Headline</Heading>
        <Text>
          In publishing and graphic design, lorem ipsum is common placeholder text used to demonstrate the graphic
          elements
        </Text>
      </EmptyStateSection>
    </EmptyState>
  ),
});

figma.connect(EmptyState, EMPTY_STATE_NODE_URL, {
  props: {},
  variant: {
    'Show Buttons': false,
    'Show Illustration': false,
    'Show Link': true,
  },
  example: (props) => (
    <EmptyState {...props}>
      <EmptyStateSection>
        <Heading elementType="h2">Headline</Heading>
        <Text>
          In publishing and graphic design, lorem ipsum is common placeholder text used to demonstrate the graphic
          elements
        </Text>
      </EmptyStateSection>
      <EmptyStateSection>
        <Link href="#link">Link to something</Link>
      </EmptyStateSection>
    </EmptyState>
  ),
});

figma.connect(EmptyState, EMPTY_STATE_NODE_URL, {
  props: {},
  variant: {
    'Show Buttons': true,
    'Show Illustration': true,
    'Show Link': false,
  },
  example: (props) => (
    <EmptyState {...props}>
      <EmptyStateSection>Replace with your own illustration content</EmptyStateSection>
      <EmptyStateSection>
        <Heading elementType="h2">Headline</Heading>
        <Text>
          In publishing and graphic design, lorem ipsum is common placeholder text used to demonstrate the graphic
          elements
        </Text>
      </EmptyStateSection>
      <EmptyStateSection>
        <ActionGroup alignmentX={{ mobile: 'stretch', tablet: 'center' }}>
          <ButtonLink href="#">Button</ButtonLink>
          <ButtonLink href="#" color="secondary">
            Button
          </ButtonLink>
        </ActionGroup>
      </EmptyStateSection>
    </EmptyState>
  ),
});

figma.connect(EmptyState, EMPTY_STATE_NODE_URL, {
  props: {},
  variant: {
    'Show Buttons': true,
    'Show Illustration': false,
    'Show Link': true,
  },
  example: (props) => (
    <EmptyState {...props}>
      <EmptyStateSection>
        <Heading elementType="h2">Headline</Heading>
        <Text>
          In publishing and graphic design, lorem ipsum is common placeholder text used to demonstrate the graphic
          elements
        </Text>
      </EmptyStateSection>
      <EmptyStateSection>
        <ActionGroup alignmentX={{ mobile: 'stretch', tablet: 'center' }}>
          <ButtonLink href="#">Button</ButtonLink>
          <ButtonLink href="#" color="secondary">
            Button
          </ButtonLink>
        </ActionGroup>
      </EmptyStateSection>
      <EmptyStateSection>
        <Link href="#link">Link to something</Link>
      </EmptyStateSection>
    </EmptyState>
  ),
});

figma.connect(EmptyState, EMPTY_STATE_NODE_URL, {
  props: {},
  variant: {
    'Show Buttons': false,
    'Show Illustration': true,
    'Show Link': true,
  },
  example: (props) => (
    <EmptyState {...props}>
      <EmptyStateSection>Replace with your own illustration content</EmptyStateSection>
      <EmptyStateSection>
        <Heading elementType="h2">Headline</Heading>
        <Text>
          In publishing and graphic design, lorem ipsum is common placeholder text used to demonstrate the graphic
          elements
        </Text>
      </EmptyStateSection>
      <EmptyStateSection>
        <Link href="#link">Link to something</Link>
      </EmptyStateSection>
    </EmptyState>
  ),
});

figma.connect(EmptyState, EMPTY_STATE_NODE_URL, {
  props: {},
  variant: {
    'Show Buttons': true,
    'Show Illustration': true,
    'Show Link': true,
  },
  example: (props) => (
    <EmptyState {...props}>
      <EmptyStateSection>Replace with your own illustration content</EmptyStateSection>
      <EmptyStateSection>
        <Heading elementType="h2">Headline</Heading>
        <Text>
          In publishing and graphic design, lorem ipsum is common placeholder text used to demonstrate the graphic
          elements
        </Text>
      </EmptyStateSection>
      <EmptyStateSection>
        <ActionGroup alignmentX={{ mobile: 'stretch', tablet: 'center' }}>
          <ButtonLink href="#">Button</ButtonLink>
          <ButtonLink href="#" color="secondary">
            Button
          </ButtonLink>
        </ActionGroup>
      </EmptyStateSection>
      <EmptyStateSection>
        <Link href="#link">Link to something</Link>
      </EmptyStateSection>
    </EmptyState>
  ),
});
