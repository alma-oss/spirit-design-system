'use client';

import { Footer, Grid, Heading, Link, Stack } from '@alma-oss/spirit-web-react';
import React from 'react';

const FooterPreview = () => (
  <Footer
    backgroundColor="secondary"
    paddingBottom="space-800"
    paddingTop="space-800"
    UNSAFE_className="px-800"
    UNSAFE_style={{ width: 420 }}
  >
    <Grid cols={3}>
      <nav aria-labelledby="card-footer-nav-1">
        <Heading elementType="h3" fontWeight="semibold" id="card-footer-nav-1" marginBottom="space-500" size="xsmall">
          Company
        </Heading>
        <Stack elementType="ul" spacing="space-400">
          <li>
            <Link href="/components">About us</Link>
          </li>
          <li>
            <Link href="/components">Careers</Link>
          </li>
        </Stack>
      </nav>
      <nav aria-labelledby="card-footer-nav-2">
        <Heading elementType="h3" fontWeight="semibold" id="card-footer-nav-2" marginBottom="space-500" size="xsmall">
          Support
        </Heading>
        <Stack elementType="ul" spacing="space-400">
          <li>
            <Link href="/components">Help</Link>
          </li>
          <li>
            <Link href="/components">Contact</Link>
          </li>
        </Stack>
      </nav>
      <nav aria-labelledby="card-footer-nav-3">
        <Heading elementType="h3" fontWeight="semibold" id="card-footer-nav-3" marginBottom="space-500" size="xsmall">
          Legal
        </Heading>
        <Stack elementType="ul" spacing="space-400">
          <li>
            <Link href="/components">Privacy</Link>
          </li>
          <li>
            <Link href="/components">Terms</Link>
          </li>
        </Stack>
      </nav>
    </Grid>
  </Footer>
);

export default FooterPreview;
