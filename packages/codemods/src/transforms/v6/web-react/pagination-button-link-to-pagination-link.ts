import {
  API,
  Collection,
  FileInfo,
  Identifier,
  ImportDeclaration,
  JSXAttribute,
  JSXIdentifier,
  JSXSpreadAttribute,
  ObjectProperty,
} from 'jscodeshift';
import { createImportSourceMatcher, finishTransform, getImportSources, getOwnRecordValue } from '../../../helpers';

const TYPE_RENAMES: Record<string, string> = {
  PaginationButtonLinkProps: 'PaginationLinkPreviousNextProps',
  SpiritPaginationButtonLinkProps: 'SpiritPaginationLinkPreviousNextProps',
};

const BUTTON_ONLY_ATTRIBUTE_NAMES = new Set(['color', 'size', 'isSymmetrical', 'isLoading', 'spacing']);

const DIRECTION_COMPONENT_NAMES = {
  previous: 'PaginationLinkPrevious',
  next: 'PaginationLinkNext',
} as const;

type PaginationDirection = keyof typeof DIRECTION_COMPONENT_NAMES;

const isButtonOnlyAttribute = (attribute: JSXAttribute | JSXSpreadAttribute): boolean =>
  attribute.type === 'JSXAttribute' &&
  attribute.name.type === 'JSXIdentifier' &&
  BUTTON_ONLY_ATTRIBUTE_NAMES.has(attribute.name.name);

const getLiteralDirection = (
  value: JSXAttribute['value'] | ObjectProperty['value'] | undefined,
): PaginationDirection | undefined => {
  if (!value) {
    return undefined;
  }

  if (value.type === 'StringLiteral' && (value.value === 'previous' || value.value === 'next')) {
    return value.value;
  }

  if (
    value.type === 'JSXExpressionContainer' &&
    value.expression.type === 'StringLiteral' &&
    (value.expression.value === 'previous' || value.expression.value === 'next')
  ) {
    return value.expression.value;
  }

  return undefined;
};

const getDirectionFromAttributes = (
  attributes: (JSXAttribute | JSXSpreadAttribute)[] | undefined,
): PaginationDirection | undefined => {
  const directionAttribute = attributes?.find(
    (attribute): attribute is JSXAttribute =>
      attribute.type === 'JSXAttribute' &&
      attribute.name.type === 'JSXIdentifier' &&
      attribute.name.name === 'direction',
  );

  return getLiteralDirection(directionAttribute?.value);
};

const getDirectionFromObjectExpression = (properties: ObjectProperty[]): PaginationDirection | undefined => {
  const directionProperty = properties.find(
    (property) =>
      property.type === 'ObjectProperty' &&
      !property.computed &&
      property.key.type === 'Identifier' &&
      property.key.name === 'direction',
  );

  return getLiteralDirection(directionProperty?.value);
};

const getDirectionFromSpreads = (
  j: API['jscodeshift'],
  root: Collection,
  attributes: (JSXAttribute | JSXSpreadAttribute)[] | undefined,
): PaginationDirection | undefined => {
  if (!attributes) {
    return undefined;
  }

  for (const attribute of attributes) {
    if (attribute.type === 'JSXSpreadAttribute' && attribute.argument.type === 'Identifier') {
      const spreadName = attribute.argument.name;
      let direction: PaginationDirection | undefined;

      root.find(j.VariableDeclarator, { id: { type: 'Identifier', name: spreadName } }).forEach((path) => {
        if (direction || path.node.init?.type !== 'ObjectExpression') {
          return;
        }

        direction = getDirectionFromObjectExpression(path.node.init.properties as ObjectProperty[]);
      });

      if (direction) {
        return direction;
      }
    }
  }

  return undefined;
};

const renameJsxTag = (openingName: JSXIdentifier, closingName: JSXIdentifier | undefined, nextName: string) => {
  openingName.name = nextName;

  if (closingName) {
    closingName.name = nextName;
  }
};

const ensureImportSpecifier = (
  j: API['jscodeshift'],
  importStatements: Collection<ImportDeclaration>,
  importedName: string,
): boolean => {
  const alreadyImported =
    importStatements.find(j.ImportSpecifier, {
      imported: { type: 'Identifier', name: importedName },
    }).length > 0;

  if (alreadyImported) {
    return false;
  }

  const firstImport = importStatements.at(0);
  const specifiers = firstImport.get().node.specifiers ?? [];

  specifiers.push(j.importSpecifier(j.identifier(importedName)));
  firstImport.get().node.specifiers = specifiers;

  return true;
};

const removeImportSpecifier = (
  j: API['jscodeshift'],
  importStatements: Collection<ImportDeclaration>,
  importedName: string,
): boolean => {
  let hasChanges = false;

  importStatements.forEach((path) => {
    const nextSpecifiers = path.node.specifiers?.filter((specifier) => {
      if (specifier.type !== 'ImportSpecifier' || specifier.imported.type !== 'Identifier') {
        return true;
      }

      if (specifier.imported.name !== importedName) {
        return true;
      }

      hasChanges = true;

      return false;
    });

    path.node.specifiers = nextSpecifiers;
  });

  return hasChanges;
};

const removeDirectionProperty = (properties: ObjectProperty[]): ObjectProperty[] =>
  properties.filter((property) => {
    if (property.type !== 'ObjectProperty' || property.computed || property.key.type !== 'Identifier') {
      return true;
    }

    return property.key.name !== 'direction';
  });

const transform = (fileInfo: FileInfo, api: API, options: Record<string, unknown> = {}) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const importSources = getImportSources(options);
  const isSpiritImport = createImportSourceMatcher(importSources);
  let hasChanges = false;
  const neededComponents = new Set<string>();

  const importStatements = root.find(j.ImportDeclaration, {
    source: {
      value: (value: string) => isSpiritImport(value),
    },
  });

  if (importStatements.length === 0) {
    return fileInfo.source;
  }

  const hasPaginationButtonLinkImport =
    importStatements.find(j.ImportSpecifier, {
      imported: {
        type: 'Identifier',
        name: 'PaginationButtonLink',
      },
    }).length > 0;

  const hasPaginationLinkImport =
    importStatements.find(j.ImportSpecifier, {
      imported: {
        type: 'Identifier',
        name: 'PaginationLink',
      },
    }).length > 0;

  const rewriteArrowComponent = (componentName: string, fallbackDirection?: PaginationDirection) => {
    root
      .find(j.JSXElement, {
        openingElement: {
          name: {
            type: 'JSXIdentifier',
            name: componentName,
          },
        },
      })
      .forEach((path) => {
        const { openingElement, closingElement } = path.node;
        const attributes = openingElement.attributes ?? [];
        const direction =
          getDirectionFromAttributes(attributes) ?? getDirectionFromSpreads(j, root, attributes) ?? fallbackDirection;

        if (!direction || openingElement.name.type !== 'JSXIdentifier') {
          return;
        }

        const nextName = DIRECTION_COMPONENT_NAMES[direction];
        const nextAttributes = attributes.filter(
          (attribute) =>
            !isButtonOnlyAttribute(attribute) &&
            !(
              attribute.type === 'JSXAttribute' &&
              attribute.name.type === 'JSXIdentifier' &&
              attribute.name.name === 'direction'
            ),
        );

        renameJsxTag(
          openingElement.name,
          closingElement?.name.type === 'JSXIdentifier' ? closingElement.name : undefined,
          nextName,
        );
        openingElement.attributes = nextAttributes;
        neededComponents.add(nextName);
        hasChanges = true;
      });
  };

  if (hasPaginationButtonLinkImport) {
    rewriteArrowComponent('PaginationButtonLink', 'next');
  }

  if (hasPaginationLinkImport) {
    rewriteArrowComponent('PaginationLink');
  }

  neededComponents.forEach((componentName) => {
    if (ensureImportSpecifier(j, importStatements, componentName)) {
      hasChanges = true;
    }
  });

  if (hasPaginationButtonLinkImport && removeImportSpecifier(j, importStatements, 'PaginationButtonLink')) {
    hasChanges = true;
  }

  const paginationLinkStillUsed =
    root.find(j.JSXIdentifier, { name: 'PaginationLink' }).length > 0 ||
    root.find(j.Identifier, { name: 'PaginationLink' }).filter((path) => {
      const parent = path.parent.node;

      return parent.type !== 'ImportSpecifier';
    }).length > 0;

  if (
    hasPaginationLinkImport &&
    !paginationLinkStillUsed &&
    removeImportSpecifier(j, importStatements, 'PaginationLink')
  ) {
    hasChanges = true;
  }

  root.find(j.VariableDeclarator).forEach((path) => {
    if (path.node.id.type !== 'Identifier' || path.node.init?.type !== 'ObjectExpression') {
      return;
    }

    const typeAnnotation = path.node.id.typeAnnotation?.typeAnnotation;
    const typeName =
      typeAnnotation?.type === 'TSTypeReference' && typeAnnotation.typeName.type === 'Identifier'
        ? typeAnnotation.typeName.name
        : undefined;

    if (typeName !== 'PaginationButtonLinkProps' && typeName !== 'SpiritPaginationButtonLinkProps') {
      return;
    }

    const nextProperties = removeDirectionProperty(path.node.init.properties as ObjectProperty[]);

    if (nextProperties.length !== path.node.init.properties.length) {
      path.node.init.properties = nextProperties;
      hasChanges = true;
    }
  });

  root.find(j.Identifier).forEach((path) => {
    const newName = getOwnRecordValue(TYPE_RENAMES, path.node.name);

    if (!newName) {
      return;
    }

    const importDeclaration = j(path).closest(j.ImportDeclaration);

    if (
      importDeclaration.length > 0 &&
      typeof importDeclaration.get().node.source.value === 'string' &&
      !isSpiritImport(importDeclaration.get().node.source.value)
    ) {
      return;
    }

    (path.node as Identifier).name = newName;
    hasChanges = true;
  });

  importStatements.forEach((path) => {
    const seen = new Set<string>();

    path.node.specifiers = path.node.specifiers?.filter((specifier) => {
      if (specifier.type !== 'ImportSpecifier' || specifier.imported.type !== 'Identifier') {
        return true;
      }

      const importedName = specifier.imported.name;
      const localName = specifier.local?.name ?? importedName;
      const key = `${importedName}#${localName}`;

      if (seen.has(key)) {
        hasChanges = true;

        return false;
      }

      seen.add(key);

      return true;
    });
  });

  return finishTransform(fileInfo, root, hasChanges, { quote: 'single' });
};

export default transform;
