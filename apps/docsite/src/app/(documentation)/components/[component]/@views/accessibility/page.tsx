import { isValidComponentSlug } from '@local/domains/components/utils/componentSlug';
import CanonicalMarkdown from '@local/domains/content/CanonicalMarkdown';
import { notFound } from 'next/navigation';

interface AccessibilityTabPageProps {
  params: Promise<{ component: string }>;
}

const AccessibilityTabPage = async ({ params }: AccessibilityTabPageProps) => {
  const { component } = await params;

  if (!isValidComponentSlug(component)) {
    notFound();
  }

  return <CanonicalMarkdown missing="not-found" relativePath={`components/${component}/accessibility.md`} />;
};

export default AccessibilityTabPage;
