import { fetchHelper } from '@local/domains/helpers/repositories/helpersRepository';
import HelperPreview from '@local/domains/helpers/ui/HelperPreview';
import { notFound } from 'next/navigation';
import React from 'react';

interface HelperPageProps {
  params: Promise<{ helper: string }>;
}

const { error: logError } = console;

const HelperPage = async ({ params }: HelperPageProps) => {
  const { helper } = await params;
  let html: string | undefined;

  try {
    html = fetchHelper(helper);
  } catch (error) {
    logError(`[HelperPage] Failed to load preview for "${helper}":`, error);
    throw error;
  }

  if (html === undefined) {
    notFound();
  }

  return <HelperPreview html={html} />;
};

export default HelperPage;
