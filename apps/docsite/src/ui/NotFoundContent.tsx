import { ButtonLink, EmptyState, EmptyStateSection, Flex, Heading, Section, Text } from '@alma-oss/spirit-web-react';
import { routes } from '@local/domains/routing/routes';

interface NotFoundContentProps {
  elementType?: 'div' | 'main';
}

export const NotFoundContent = ({ elementType = 'div' }: NotFoundContentProps) => (
  <Flex elementType={elementType} alignmentX="center" alignmentY="center">
    <Section size="medium">
      <EmptyState spacing="space-900">
        <EmptyStateSection>
          <Heading elementType="h1" size="xlarge">
            404
          </Heading>
        </EmptyStateSection>
        <EmptyStateSection spacing="space-600">
          <Heading elementType="h2" size="xsmall">
            Page Not Found
          </Heading>
          <Text>The page you are looking for might have been moved, deleted, or never existed.</Text>
        </EmptyStateSection>
        <EmptyStateSection>
          <ButtonLink href={routes.homepage}>Back to Homepage</ButtonLink>
        </EmptyStateSection>
      </EmptyState>
    </Section>
  </Flex>
);
