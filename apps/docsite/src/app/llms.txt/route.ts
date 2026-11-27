import { fetchAllDocumentedPages, markdownResponse, renderLlmsTxt } from '@local/domains/content/features/llms';

export const dynamic = 'force-static';

export const GET = async () => markdownResponse(renderLlmsTxt(await fetchAllDocumentedPages()));
