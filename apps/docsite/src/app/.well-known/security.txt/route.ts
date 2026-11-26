import { getSiteOrigin } from '@local/config/siteOrigin';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const SECURITY_TXT = [
  'Contact: mailto:team-design-system@almacareer.com',
  'Preferred-Languages: cs, en',
  `Canonical: ${getSiteOrigin()}/.well-known/security.txt`,
  'Expires: 2027-01-01T00:00:00.000Z',
  '',
].join('\n');

export const GET = () =>
  new NextResponse(SECURITY_TXT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
