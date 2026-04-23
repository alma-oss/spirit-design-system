import { isValidComponentSlug, slugToComponentName } from '@local/domains/components/utils/componentSlug';
import { notFound } from 'next/navigation';
import React from 'react';

interface ReactTabProps {
  params: Promise<{ component: string }>;
}

const { error: logError } = console;

const ReactTabPage = async ({ params }: ReactTabProps) => {
  const { component } = await params;

  if (!isValidComponentSlug(component)) {
    notFound();
  }

  try {
    const { default: ReadMe } = await import(
      `@workspace/web-react/components/${slugToComponentName(component)}/README.md`
    );

    return (
      <div className="docs-Markdown">
        <ReadMe />
      </div>
    );
  } catch (error) {
    logError(`[ComponentView] Failed to load React README for "${component}":`, error);

    return null;
  }
};

export default ReactTabPage;
