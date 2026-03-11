import { type ChildrenProps } from '@local/types';
import { AppProvider } from '@local/ui/AppProvider';
import { inter } from '@local/ui/fonts';
import '@local/ui/globals.scss';
import { Metadata } from 'next';

interface RootLayoutProps extends ChildrenProps {}

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: {
    template: '%s | Spirit Design System',
    default: 'Spirit Design System',
  },
  description: 'Documentation for the Spirit Design System',
  metadataBase: new URL('https://spiritdesignsystem.com'),
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body className={`${inter.className} antialiased`}>
      <AppProvider>{children}</AppProvider>
    </body>
  </html>
);

export default RootLayout;
