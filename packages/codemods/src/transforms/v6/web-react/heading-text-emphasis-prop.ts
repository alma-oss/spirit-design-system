import { API, ASTPath, FileInfo, JSXAttribute, JSXOpeningElement } from 'jscodeshift';
import { createImportSourceMatcher, finishTransform, getImportSources } from '../../../helpers';

const COMPONENTS = ['Heading', 'Text'] as const;
const FONT_WEIGHTS = new Set(['regular', 'semibold', 'bold']);

type ComponentName = (typeof COMPONENTS)[number];

const getStringValue = (attribute: JSXAttribute): string | undefined => {
  if (attribute.value?.type === 'StringLiteral' || attribute.value?.type === 'Literal') {
    return typeof attribute.value.value === 'string' ? attribute.value.value : undefined;
  }

  if (
    attribute.value?.type === 'JSXExpressionContainer' &&
    (attribute.value.expression.type === 'StringLiteral' || attribute.value.expression.type === 'Literal')
  ) {
    return typeof attribute.value.expression.value === 'string' ? attribute.value.expression.value : undefined;
  }

  return undefined;
};

const findAttribute = (element: JSXOpeningElement, name: string): JSXAttribute | undefined =>
  element.attributes?.find(
    (attribute): attribute is JSXAttribute =>
      attribute.type === 'JSXAttribute' && attribute.name.type === 'JSXIdentifier' && attribute.name.name === name,
  );

const migrateEmphasis = (
  j: API['jscodeshift'],
  elementPath: ASTPath<JSXOpeningElement>,
  componentName: ComponentName,
): boolean => {
  const emphasisAttribute = findAttribute(elementPath.node, 'emphasis');

  if (!emphasisAttribute) {
    return false;
  }

  const emphasis = getStringValue(emphasisAttribute);

  if (!emphasis || (!FONT_WEIGHTS.has(emphasis) && emphasis !== 'italic')) {
    return false;
  }

  const attributes = elementPath.node.attributes ?? [];
  const hasFontWeight = Boolean(findAttribute(elementPath.node, 'fontWeight'));
  const hasIsItalic = Boolean(findAttribute(elementPath.node, 'isItalic'));

  elementPath.node.attributes = attributes.filter((attribute) => attribute !== emphasisAttribute);

  if (FONT_WEIGHTS.has(emphasis)) {
    if (!hasFontWeight) {
      emphasisAttribute.name = j.jsxIdentifier('fontWeight');
      elementPath.node.attributes.push(emphasisAttribute);
    }

    return true;
  }

  if (componentName === 'Heading' && !hasFontWeight) {
    elementPath.node.attributes.push(j.jsxAttribute(j.jsxIdentifier('fontWeight'), j.stringLiteral('regular')));
  }

  if (!hasIsItalic) {
    elementPath.node.attributes.push(j.jsxAttribute(j.jsxIdentifier('isItalic')));
  }

  return true;
};

const transform = (fileInfo: FileInfo, api: API, options: Record<string, unknown> = {}) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const isSpiritImport = createImportSourceMatcher(getImportSources(options));
  const localComponents = new Map<string, ComponentName>();
  let hasChanges = false;

  root
    .find(j.ImportDeclaration, {
      source: {
        value: (value: string) => isSpiritImport(value),
      },
    })
    .forEach((importPath) => {
      importPath.node.specifiers?.forEach((specifier) => {
        if (
          specifier.type === 'ImportSpecifier' &&
          specifier.imported.type === 'Identifier' &&
          COMPONENTS.includes(specifier.imported.name as ComponentName)
        ) {
          localComponents.set(
            specifier.local?.name ?? specifier.imported.name,
            specifier.imported.name as ComponentName,
          );
        }
      });
    });

  if (localComponents.size === 0) {
    return fileInfo.source;
  }

  root.find(j.JSXOpeningElement).forEach((elementPath: ASTPath<JSXOpeningElement>) => {
    if (elementPath.node.name.type !== 'JSXIdentifier') {
      return;
    }

    const componentName = localComponents.get(elementPath.node.name.name);

    if (componentName && migrateEmphasis(j, elementPath, componentName)) {
      hasChanges = true;
    }
  });

  return finishTransform(fileInfo, root, hasChanges, { quote: 'double' });
};

export default transform;
