import { isValidComponentSlug, slugToComponentName } from '@local/domains/components/utils/componentSlug';
import MarkdownContent from '@local/domains/content/ui/MarkdownContent';
import { notFound } from 'next/navigation';
import React from 'react';

interface WebTabPageProps {
  params: Promise<{ component: string }>;
}

const { error: logError } = console;

const WebTabPage = async ({ params }: WebTabPageProps) => {
  const { component } = await params;

  if (!isValidComponentSlug(component)) {
    notFound();
  }

  try {
    const { default: ReadMe } = await import(
      `@alma-oss/spirit-web/scss/components/${slugToComponentName(component)}/README.md`
    );

    return (
      <MarkdownContent>
        <ReadMe />
      </MarkdownContent>
    );
  } catch (error) {
    logError(`[ComponentView] Failed to load Web README for "${component}":`, error);

    return null;
  }
};

export default WebTabPage;
