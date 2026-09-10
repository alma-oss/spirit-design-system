import { isValidComponentSlug } from '@local/domains/components/utils/componentSlug';
import CanonicalMarkdown from '@local/domains/content/CanonicalMarkdown';
import { resolveComponentTabFile } from '@local/domains/content/repository';
import { notFound } from 'next/navigation';

interface GuidelinesPageProps {
  params: Promise<{ component: string }>;
}

const GuidelinesPage = async ({ params }: GuidelinesPageProps) => {
  const { component } = await params;

  if (!isValidComponentSlug(component)) {
    notFound();
  }

  const filePath = resolveComponentTabFile(component, 'overview');

  if (!filePath) {
    notFound();
  }

  return <CanonicalMarkdown isCanonical filePath={filePath} />;
};

export default GuidelinesPage;
