import { listDocumentedPages } from '@local/domains/content/documentedPages';
import { renderLlmsFull } from '@local/domains/content/llmsText';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const MARKDOWN_HEADERS = {
  'Content-Type': 'text/markdown; charset=utf-8',
};

export const GET = async () => {
  const pages = await listDocumentedPages();

  return new NextResponse(renderLlmsFull(pages), { headers: MARKDOWN_HEADERS });
};
