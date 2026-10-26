import {
  componentSectionIndex,
  resolveComponentSectionRequest,
} from '@local/domains/components/componentSectionRequest';
import { type NextRequest, NextResponse } from 'next/server';

const rewriteNotFound = (request: NextRequest) => {
  const url = request.nextUrl.clone();

  url.pathname = '/_not-found';

  return NextResponse.rewrite(url, { status: 404 });
};

export const proxy = (request: NextRequest) => {
  const resolution = resolveComponentSectionRequest(request.nextUrl.pathname, componentSectionIndex);

  if (resolution === 'missing') {
    return rewriteNotFound(request);
  }

  return NextResponse.next();
};

export const config = {
  matcher: '/components/:path*',
};
