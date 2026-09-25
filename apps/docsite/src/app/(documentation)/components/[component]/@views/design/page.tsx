import { isValidComponentSlug } from '@local/domains/components/utils/componentSlug';
import CanonicalMarkdown from '@local/domains/content/CanonicalMarkdown';
import { resolveComponentTabFile } from '@local/domains/content/repository';
import { notFound } from 'next/navigation';

interface DesignTabPageProps {
  params: Promise<{ component: string }>;
}

const DesignTabPage = async ({ params }: DesignTabPageProps) => {
  const { component } = await params;

  if (!isValidComponentSlug(component)) {
    notFound();
  }

  const filePath = resolveComponentTabFile(component, 'design');

  if (!filePath) {
    notFound();
  }

  return <CanonicalMarkdown isCanonical filePath={filePath} missing="not-found" />;
};

export default DesignTabPage;
