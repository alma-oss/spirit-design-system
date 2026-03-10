'use client';

import { Container, Footer as SpiritFooter } from '@alma-oss/spirit-web-react';
import React from 'react';
import useIsPage from '@local/hooks/useIsPage';

const Footer = () => {
  const isComponentsPage = useIsPage('components');

  return (
    <SpiritFooter
        marginTop={{ mobile: 'space-1200', tablet: 'space-1200' }}
        textAlignment="center"
        {...(isComponentsPage && { UNSAFE_className: 'hide-from-visual-tests' })}
      >
        <Container>© Alma Career Oy and its subsidiaries</Container>
      </SpiritFooter>
  );
};

export default Footer;
