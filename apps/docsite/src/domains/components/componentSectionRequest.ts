import { componentSectionBySegment } from '@local/domains/routing/routes';
import sectionIndex from '@local/generated/component-sections.json';

export type ComponentSectionIndex = Readonly<Record<string, readonly string[]>>;

export type ComponentSectionRequest = 'ignore' | 'missing' | 'present' | { redirectTo: string };

// Section name to URL segment, the reverse of `componentSectionBySegment`.
const segmentBySection = Object.fromEntries(
  Object.entries(componentSectionBySegment).map(([segment, section]) => [section, segment]),
);

const decodePathSegment = (value: string): string | null => {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
};

const resolveSection = (segment: string | undefined): string | undefined => {
  if (segment === undefined) {
    return 'overview';
  }

  return Object.hasOwn(componentSectionBySegment, segment) ? componentSectionBySegment[segment] : undefined;
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

  // `Object.hasOwn` keeps names such as `constructor` or `__proto__` from resolving to the prototype.
  const section = resolveSection(decodedSegment);
  const sections = Object.hasOwn(index, decodedSlug) ? index[decodedSlug] : undefined;

  if (!section || !sections) {
    return 'missing';
  }

  if (sections.includes(section)) {
    return 'present';
  }

  // A component without Guidelines still has other sections. Send the bare URL to the first one.
  const [firstSection] = sections;
  const firstSegment = decodedSegment === undefined && firstSection ? segmentBySection[firstSection] : undefined;

  return firstSegment ? { redirectTo: `/components/${decodedSlug}/${firstSegment}` } : 'missing';
};
