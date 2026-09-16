'use client';

import { Button, Heading, Section } from '@alma-oss/spirit-web-react';
import React, { useEffect } from 'react';

interface HelpersErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const { error: logError } = console;

const HelpersError = ({ error, reset }: HelpersErrorProps) => {
  useEffect(() => {
    logError('[HelpersError]', error);
  }, [error]);

  return (
    <Section size="xlarge">
      <Heading elementType="h1" size="large">
        Something went wrong
      </Heading>
      <p>We couldn&apos;t load this page. Please try again.</p>
      <Button onClick={reset}>Try again</Button>
    </Section>
  );
};

export default HelpersError;
