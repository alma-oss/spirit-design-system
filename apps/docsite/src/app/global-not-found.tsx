import { ButtonLink, EmptyState, EmptyStateSection, Flex, Heading, Section, Text } from '@alma-oss/spirit-web-react';
import { routes } from '@local/domains/routing/routes';
import { Header, Footer } from '@local/ui';
import { AppProvider } from '@local/ui/AppProvider';
import { inter } from '@local/ui/fonts';
import { Metadata } from 'next';
import '../ui/globals.scss';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Page Not Found | Spirit Design System',
  description: 'The page you are looking for does not exist.',
};

const GlobalNotFound = () => (
  <html lang="en">
    <body className={`${inter.className} antialiased`}>
      <AppProvider>
        <Header disableClientRouting />
        <Flex elementType="main" alignmentX="center" alignmentY="center">
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
        <Footer />
      </AppProvider>
    </body>
  </html>
);

export default GlobalNotFound;
