import { fetchAllDocumentedPages, fetchDocumentedPage, markdownResponse } from '@local/domains/content/features/llms';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const pages = await fetchAllDocumentedPages();

  return pages.map((page) => ({
    slug: page.path.slice(1).split('/'),
  }));
};

export const GET = async (_request: Request, context: { params: Promise<{ slug?: string[] }> }) => {
  const { slug = [] } = await context.params;
  const body = await fetchDocumentedPage(slug);

  if (!body) {
    return markdownResponse('Not found', 404);
  }

  return markdownResponse(body);
};
