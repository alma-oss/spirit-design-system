import { isValidComponentSlug } from '@local/domains/components/utils/componentSlug';
import CanonicalMarkdown from '@local/domains/content/CanonicalMarkdown';
import { resolveComponentTabFile } from '@local/domains/content/repository';
import { notFound } from 'next/navigation';

interface AccessibilityTabPageProps {
  params: Promise<{ component: string }>;
}

const AccessibilityTabPage = async ({ params }: AccessibilityTabPageProps) => {
  const { component } = await params;

  if (!isValidComponentSlug(component)) {
    notFound();
  }

  const filePath = resolveComponentTabFile(component, 'accessibility');

  if (!filePath) {
    notFound();
  }

  return <CanonicalMarkdown isCanonical filePath={filePath} missing="not-found" />;
};

export default AccessibilityTabPage;
