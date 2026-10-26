import { ButtonLink, EmptyState, EmptyStateSection, Flex, Heading, Section, Text } from '@alma-oss/spirit-web-react';
import { routes } from '../routes';
import FallingTokens from './FallingTokens';
import styles from './NotFound.module.scss';

const NotFound = () => (
  <Section
    size="large"
    paddingBottom={{ mobile: 'space-0', tablet: 'space-0' }}
    backgroundColor="primary"
    UNSAFE_className={styles.notFound}
  >
    <div className={styles.content}>
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
    </div>
  </Section>
);

export default NotFound;
