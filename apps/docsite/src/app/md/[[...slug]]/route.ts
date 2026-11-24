import { composePageMarkdown, listDocumentedPages } from '@local/domains/content/documentedPages';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export const dynamicParams = false;

const MARKDOWN_HEADERS = {
  'Content-Type': 'text/markdown; charset=utf-8',
};

export const generateStaticParams = async () => {
  const pages = await listDocumentedPages();

  return pages.map((page) => ({
    slug: page.path.slice(1).split('/'),
  }));
};

export const GET = async (_request: Request, context: { params: Promise<{ slug?: string[] }> }) => {
  const { slug = [] } = await context.params;
  const body = await composePageMarkdown(slug);

  if (!body) {
    return new NextResponse('Not found', { status: 404 });
  }

  return new NextResponse(body, { headers: MARKDOWN_HEADERS });
};
