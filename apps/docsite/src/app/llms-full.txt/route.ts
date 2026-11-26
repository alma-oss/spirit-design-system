import { fetchAllDocumentedPages, markdownResponse, renderLlmsFull } from '@local/domains/content/features/llms';

export const dynamic = 'force-static';

export const GET = async () => markdownResponse(renderLlmsFull(await fetchAllDocumentedPages()));
