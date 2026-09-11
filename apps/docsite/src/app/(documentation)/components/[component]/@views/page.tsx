import { isValidComponentSlug } from '@local/domains/components/utils/componentSlug';
import CanonicalMarkdown from '@local/domains/content/CanonicalMarkdown';
import { notFound } from 'next/navigation';

interface GuidelinesPageProps {
  params: Promise<{ component: string }>;
}

const GuidelinesPage = async ({ params }: GuidelinesPageProps) => {
  const { component } = await params;

  if (!isValidComponentSlug(component)) {
    notFound();
  }

  return <CanonicalMarkdown relativePath={`components/${component}/overview.md`} />;
};

export default GuidelinesPage;
