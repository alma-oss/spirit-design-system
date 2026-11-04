import {
  ButtonLink,
  EmptyState,
  EmptyStateSection,
  Flex,
  Heading,
  Section,
  Stack,
  Text,
} from '@alma-oss/spirit-web-react';
import { routes } from '@local/domains/routing/routes';
import FallingTokens from './FallingTokens';

interface NotFoundProps {
  elementType?: 'div' | 'main';
}

export const NotFound = ({ elementType = 'div' }: NotFoundProps) => (
  <Section
    elementType={elementType}
    size="large"
    paddingBottom={{ mobile: 'space-0', tablet: 'space-0' }}
    backgroundColor="primary"
  >
    <Stack spacing="space-1300">
      <EmptyState spacing="space-900">
        <EmptyStateSection spacing="space-600">
          <Heading elementType="h1" size="small">
            Page Not Found
          </Heading>
          <Text>Looks like this page is missing. The building blocks are still right here.</Text>
        </EmptyStateSection>
        <EmptyStateSection>
          <Flex alignmentX="center">
            <ButtonLink href={routes.homepage}>Back to Homepage</ButtonLink>
          </Flex>
        </EmptyStateSection>
      </EmptyState>
      <FallingTokens />
    </Stack>
  </Section>
);
