import { inter } from '@local/ui/fonts';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import '../ui/globals.scss';

export const metadata: Metadata = {
  title: {
    template: '%s | Spirit Design System',
    default: 'Spirit Design System',
  },
  description: 'Documentation for the Spirit Design System',
  metadataBase: new URL('https://spiritdesignsystem.com'),
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
