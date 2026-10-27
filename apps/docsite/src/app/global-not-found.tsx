import { GoogleTagManager } from '@local/domains/analytics/ui/GoogleTagManager';
import { CookieConsent } from '@local/domains/consent/ui/CookieConsent';
import Footer from '@local/domains/footer/ui/Footer';
import { Header } from '@local/ui';
import { AppProvider } from '@local/ui/AppProvider';
import { fontshareApiUrl, generalSansStylesheet } from '@local/ui/fonts';
import { NotFoundContent } from '@local/ui/NotFoundContent';
import { Metadata } from 'next';
import '../ui/globals.scss';

export const metadata: Metadata = {
  title: 'Page Not Found | Spirit Design System',
  description: 'The page you are looking for does not exist.',
};

const GlobalNotFound = () => (
  <html lang="en">
    <head>
      <link rel="preconnect" href={fontshareApiUrl} />
      <link rel="stylesheet" href={generalSansStylesheet} />
    </head>
    <body>
      <GoogleTagManager />
      <CookieConsent />
      <AppProvider>
        <Header disableClientRouting />
        <NotFoundContent elementType="main" />
        <Footer />
      </AppProvider>
    </body>
  </html>
);

export default GlobalNotFound;
