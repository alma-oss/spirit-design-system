import { componentSegments } from '@local/domains/routing/routes';
import sectionIndex from '@local/generated/component-sections.json';

export type ComponentSectionIndex = Readonly<Record<string, readonly string[]>>;

export type ComponentSectionRequest = 'ignore' | 'missing' | 'present';

const sectionBySegment: Record<string, string> = {
  [componentSegments.design]: 'design',
  [componentSegments.accessibility]: 'accessibility',
  [componentSegments.figma]: 'figma',
  [componentSegments.web]: 'web',
  [componentSegments.react]: 'react',
  [componentSegments.webPreview]: 'webPreview',
  [componentSegments.reactPreview]: 'reactPreview',
};

const decodePathSegment = (value: string): string | null => {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
};

export const componentSectionIndex: ComponentSectionIndex = sectionIndex;

export const resolveComponentSectionRequest = (
  pathname: string,
  index: ComponentSectionIndex,
): ComponentSectionRequest => {
  const [root, slug, segment, extra] = pathname.split('/').filter(Boolean);

  if (root !== 'components' || !slug) {
    return 'ignore';
  }

  if (extra !== undefined) {
    return 'missing';
  }

  const decodedSlug = decodePathSegment(slug);
  const decodedSegment = segment === undefined ? undefined : decodePathSegment(segment);

  if (!decodedSlug || decodedSegment === null) {
    return 'missing';
  }

  const section = decodedSegment === undefined ? 'overview' : sectionBySegment[decodedSegment];
  const sections = index[decodedSlug];

  if (!section || !sections?.includes(section)) {
    return 'missing';
  }

  return 'present';
};
