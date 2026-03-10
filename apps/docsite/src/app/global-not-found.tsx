import { ButtonLink, Container, EmptyState, EmptyStateSection, Heading, Text } from '@alma-oss/spirit-web-react';
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
        <main className="py-1100 pt-tablet-1600">
          <Container>
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
                <ButtonLink href={routes.home} color="primary">
                  Back to Homepage
                </ButtonLink>
              </EmptyStateSection>
            </EmptyState>
          </Container>
        </main>
        <Footer />
      </AppProvider>
    </body>
  </html>
);

export default GlobalNotFound;
