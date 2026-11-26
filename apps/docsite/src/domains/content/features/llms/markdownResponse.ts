import { NextResponse } from 'next/server';

const MARKDOWN_HEADERS = {
  'Content-Type': 'text/markdown; charset=utf-8',
};

export const markdownResponse = (body: string, status = 200): NextResponse =>
  new NextResponse(body, { status, headers: MARKDOWN_HEADERS });
