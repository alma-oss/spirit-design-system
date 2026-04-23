'use client';

import { Container, Footer as SpiritFooter } from '@alma-oss/spirit-web-react';
import React from 'react';

const Footer = () => (
  <SpiritFooter marginTop={{ mobile: 'space-1200', tablet: 'space-1200' }} textAlignment="center">
    <Container>© Alma Career Oy and its subsidiaries</Container>
  </SpiritFooter>
);

export default Footer;
