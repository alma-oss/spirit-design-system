import Footer from '@local/domains/footer/ui/Footer';
import NotFound from '@local/domains/routing/ui/NotFound';
import { Header } from '@local/ui';
import { AppProvider } from '@local/ui/AppProvider';
import { fontshareApiUrl, generalSansStylesheet } from '@local/ui/fonts';
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
      <AppProvider>
        <Header disableClientRouting />
        <main>
          <NotFound />
        </main>
        <Footer />
      </AppProvider>
    </body>
  </html>
);

export default GlobalNotFound;
