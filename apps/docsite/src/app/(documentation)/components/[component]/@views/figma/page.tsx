import { isValidComponentSlug } from '@local/domains/components/utils/componentSlug';
import CanonicalMarkdown from '@local/domains/content/CanonicalMarkdown';
import { getComponentTabAvailability, resolveComponentTabFile } from '@local/domains/content/componentDocs';
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
  const { figma: isFigmaTabAvailable } = await getComponentTabAvailability(component);

  if (!filePath || !isFigmaTabAvailable) {
    notFound();
  }

  return <CanonicalMarkdown asBlocks isCanonical filePath={filePath} missing="not-found" />;
};

export default FigmaTabPage;
