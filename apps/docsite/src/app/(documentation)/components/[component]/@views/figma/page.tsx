import { isValidComponentSlug } from '@local/domains/components/utils/componentSlug';
import CanonicalMarkdown from '@local/domains/content/CanonicalMarkdown';
import { resolveComponentTabFile } from '@local/domains/content/repository';
import { notFound } from 'next/navigation';

interface FigmaTabPageProps {
  params: Promise<{ component: string }>;
}

const FigmaTabPage = async ({ params }: FigmaTabPageProps) => {
  const { component } = await params;

  if (!isValidComponentSlug(component)) {
    notFound();
  }

  const filePath = resolveComponentTabFile(component, 'figma');

  if (!filePath) {
    notFound();
  }

  return <CanonicalMarkdown isCanonical filePath={filePath} missing="not-found" />;
};

export default FigmaTabPage;
