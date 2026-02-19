import React from 'react';
import { ActionGroup } from '../../ActionGroup';
import { ButtonLink } from '../../Button';
import { Heading } from '../../Heading';
import { Link } from '../../Link';
import { Text } from '../../Text';
import EmptyState from '../EmptyState';
import EmptyStateSection from '../EmptyStateSection';

const EmptyStateDefault = () => (
  <EmptyState spacing="space-900">
    <EmptyStateSection>
      <div className="docs-Placeholder" style={{ maxWidth: '400px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="82" height="40" viewBox="0 0 82 40" fill="none">
          <rect x="1.5" y="0.5" width="79" height="39" stroke="#b9b9b9" strokeDasharray="4 4" />
          <path
            d="M1 29L24.1884 15.814L35.7826 24.1163L64.7681 8L81 24.1163"
            stroke="#b9b9b9"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />
        </svg>
        <div className="docs-Placeholder__text">
          <Text emphasis="bold" marginBottom="space-0">
            Placeholder
          </Text>
          <Text size="small" textColor="secondary">
            Replace me with your own component
          </Text>
        </div>
      </div>
    </EmptyStateSection>
    <EmptyStateSection spacing="space-600">
      <Heading elementType="h2" size="xsmall">
        Headline
      </Heading>
      <Text>
        In publishing and graphic design, lorem ipsum is common placeholder text used to demonstrate the graphic
        elements
      </Text>
    </EmptyStateSection>
    <EmptyStateSection>
      <ActionGroup
        alignmentX={{ mobile: 'stretch', tablet: 'center' }}
        direction={{ mobile: 'vertical', tablet: 'horizontal-reversed' }}
      >
        <ButtonLink color="primary" href="#">
          Action
        </ButtonLink>
        <ButtonLink color="secondary" href="#">
          Action
        </ButtonLink>
      </ActionGroup>
    </EmptyStateSection>
    <EmptyStateSection>
      <Link href="#">Link to something</Link>
    </EmptyStateSection>
  </EmptyState>
);

export default EmptyStateDefault;
