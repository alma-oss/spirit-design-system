import { isValidComponentSlug } from '@local/domains/components/utils/componentSlug';
import CanonicalMarkdown from '@local/domains/content/CanonicalMarkdown';
import { notFound } from 'next/navigation';

interface FigmaTabPageProps {
  params: Promise<{ component: string }>;
}

const FigmaTabPage = async ({ params }: FigmaTabPageProps) => {
  const { component } = await params;

  if (!isValidComponentSlug(component)) {
    notFound();
  }

  return <CanonicalMarkdown missing="not-found" relativePath={`components/${component}/figma.md`} />;
};

export default FigmaTabPage;
