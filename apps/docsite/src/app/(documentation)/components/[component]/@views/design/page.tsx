import { isValidComponentSlug } from '@local/domains/components/utils/componentSlug';
import CanonicalMarkdown from '@local/domains/content/CanonicalMarkdown';
import { notFound } from 'next/navigation';

interface DesignTabPageProps {
  params: Promise<{ component: string }>;
}

const DesignTabPage = async ({ params }: DesignTabPageProps) => {
  const { component } = await params;

  if (!isValidComponentSlug(component)) {
    notFound();
  }

  return <CanonicalMarkdown missing="not-found" relativePath={`components/${component}/design.md`} />;
};

export default DesignTabPage;
