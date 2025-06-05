import { isValidComponentSlug, slugToComponentName } from '@local/domains/components/utils/componentSlug';
import { notFound } from 'next/navigation';
import React from 'react';

interface WebPreviewTabProps {
  params: Promise<{ component: string }>;
}

const { error: logError } = console;

const WebPreviewTabPage = async ({ params }: WebPreviewTabProps) => {
  const { component } = await params;

  if (!isValidComponentSlug(component)) {
    notFound();
  }

  try {
    const { default: Preview } = await import(
      `@workspace/web/scss/components/${slugToComponentName(component)}/preview.html`
    );
    const htmlDoc = { __html: Preview };

    return (
      <>
        {/* eslint-disable-next-line react/no-danger -- rendering HTML preview, static */}
        <div dangerouslySetInnerHTML={htmlDoc} />
      </>
    );
  } catch (error) {
    logError(`[ComponentView] Failed to load Web Preview for "${component}":`, error);

    return null;
  }
};

export default WebPreviewTabPage;
