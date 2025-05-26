'use client';

import { Container, Footer } from '@alma-oss/spirit-web-react';
import useIsPage from '@local/hooks/useIsPage';
import { Cover } from '@local/ui/Cover';
import { Header } from '@local/ui/Header';
import React, { ReactNode } from 'react';

const DocumentationLayout = ({ children }: { children: ReactNode }) => {
  const isComponentsPage = useIsPage('components');

  return (
    <>
      <Header />
      <Cover />
      <main>{children}</main>
      <Footer
        backgroundColor="secondary"
        marginTop={{ mobile: 'space-1200', tablet: 'space-1200' }}
        textAlignment="center"
        {...(isComponentsPage && { UNSAFE_className: 'hide-from-visual-tests' })}
      >
        <Container>© Alma Career Oy and its subsidiaries</Container>
      </Footer>
    </>
  );
};

export default DocumentationLayout;
