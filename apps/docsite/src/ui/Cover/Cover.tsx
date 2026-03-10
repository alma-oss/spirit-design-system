'use client';

import { Button, Flex, Heading, Section } from '@alma-oss/spirit-web-react';
import NextLink from 'next/link';
import React from 'react';

const Cover = () => (
  <Section size="xlarge" textAlignment="center" backgroundColor="primary" theme="theme-light-on-brand">
    <Heading elementType="h1" size="xlarge" emphasis="bold">
      Spirit Design System
    </Heading>
    <Heading elementType="h2" size="small" textColor="secondary" marginBottom="space-1000">
      Development Preview
    </Heading>

    <Flex direction="horizontal" alignmentX="center" alignmentY="center">
      <Button elementType={NextLink} size="large" href="https://spirit.supernova-docs.io/spirit/">
        Docs
      </Button>
      <Button
        elementType={NextLink}
        color="secondary"
        size="large"
        href="https://github.com/alma-oss/spirit-design-system/"
      >
        GitHub
      </Button>
    </Flex>
  </Section>
);

export default Cover;
