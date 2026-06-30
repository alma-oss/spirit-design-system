import {
  API,
  FileInfo,
  Identifier,
  JSXAttribute,
  JSXMemberExpression,
  JSXOpeningElement,
  JSXSpreadAttribute,
} from 'jscodeshift';
import { finishTransform, createImportSourceMatcher, getImportSources, getOwnRecordValue } from '../../../helpers';
import { renameComponent } from '../../../helpers/renameComponent';

const IDENTIFIER_RENAMES: Record<string, string> = {
  useScrollViewArrows: 'useScrollViewControls',
  ScrollViewArrowsAriaLabelType: 'ScrollViewControlsAriaLabelType',
  ScrollViewArrowsScrollStepType: 'ScrollViewControlsScrollStepType',
  SpiritScrollViewArrowsProps: 'SpiritScrollViewControlsProps',
  UseScrollViewArrowsReturn: 'UseScrollViewControlsReturn',
  SCROLL_VIEW_ARROWS_LABEL_HORIZONTAL_END: 'SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_END',
  SCROLL_VIEW_ARROWS_LABEL_HORIZONTAL_START: 'SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_START',
  SCROLL_VIEW_ARROWS_LABEL_VERTICAL_END: 'SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_END',
  SCROLL_VIEW_ARROWS_LABEL_VERTICAL_START: 'SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_START',
};

const SCROLL_VIEW_PROP_RENAMES: Record<string, string> = {
  hasArrows: 'hasControls',
  arrowsScrollStep: 'controlsScrollStep',
  ariaLabelArrows: 'ariaLabelControls',
};

const SCROLL_VIEW_COMPONENTS = new Set(['ScrollView', 'ScrollViewArrows', 'ScrollViewControls']);

const isScrollViewElement = (
  element: JSXOpeningElement,
  namedImports: Set<string>,
  namespaceImports: Set<string>,
): boolean => {
  if (element.name.type === 'JSXIdentifier') {
    return namedImports.has(element.name.name);
  }

  if (element.name.type !== 'JSXMemberExpression') {
    return false;
  }

  const memberExpression = element.name as JSXMemberExpression;
  const objectName = memberExpression.object.type === 'JSXIdentifier' ? memberExpression.object.name : undefined;
  const propertyName = memberExpression.property.type === 'JSXIdentifier' ? memberExpression.property.name : undefined;

  return Boolean(
    objectName && propertyName && namespaceImports.has(objectName) && SCROLL_VIEW_COMPONENTS.has(propertyName),
  );
};

const renameJsxAttributes = (attributes: (JSXAttribute | JSXSpreadAttribute)[] | undefined): boolean => {
  let changed = false;

  attributes?.forEach((attribute) => {
    if (attribute.type !== 'JSXAttribute' || attribute.name.type !== 'JSXIdentifier') {
      return;
    }

    const newName = getOwnRecordValue(SCROLL_VIEW_PROP_RENAMES, attribute.name.name);

    if (newName) {
      attribute.name.name = newName;
      changed = true;
    }
  });

  return changed;
};

const transform = (fileInfo: FileInfo, api: API, options: Record<string, unknown> = {}) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const importSources = getImportSources(options);
  const isSpiritImport = createImportSourceMatcher(importSources);
  const namedImports = new Set<string>();
  const namespaceImports = new Set<string>();

  const hasSpiritWebReactImport = root.find(j.ImportDeclaration, {
    source: {
      value: (value: string) => isSpiritImport(value),
    },
  });

  if (hasSpiritWebReactImport.length === 0) {
    return fileInfo.source;
  }

  let hasChanges = false;

  hasSpiritWebReactImport.forEach((path) => {
    path.node.specifiers?.forEach((specifier) => {
      if (specifier.type === 'ImportSpecifier' && specifier.imported.type === 'Identifier') {
        const importedName = specifier.imported.name;
        const localName = specifier.local?.name ?? importedName;
        const renamedImportedName = getOwnRecordValue(IDENTIFIER_RENAMES, importedName);

        if (renamedImportedName) {
          specifier.imported.name = renamedImportedName;

          if (!specifier.local) {
            specifier.local = j.identifier(renamedImportedName);
          } else if (specifier.local.name === importedName) {
            specifier.local.name = renamedImportedName;
          }

          hasChanges = true;
        }

        if (SCROLL_VIEW_COMPONENTS.has(importedName) || SCROLL_VIEW_COMPONENTS.has(renamedImportedName ?? '')) {
          namedImports.add(localName === importedName && renamedImportedName ? renamedImportedName : localName);
        }
      }

      if (specifier.type === 'ImportNamespaceSpecifier' && specifier.local?.name) {
        namespaceImports.add(specifier.local.name);
      }
    });
  });

  root.find(j.Identifier).forEach((path) => {
    const newName = getOwnRecordValue(IDENTIFIER_RENAMES, path.node.name);

    if (newName) {
      (path.node as Identifier).name = newName;
      hasChanges = true;
    }
  });

  root.find(j.JSXOpeningElement).forEach((path) => {
    if (!isScrollViewElement(path.node, namedImports, namespaceImports)) {
      return;
    }

    if (renameJsxAttributes(path.node.attributes)) {
      hasChanges = true;
    }
  });

  root
    .find(j.MemberExpression, {
      property: {
        type: 'Identifier',
        name: 'arrows',
      },
    })
    .forEach((path) => {
      const { object } = path.node;

      if (object.type === 'Identifier' && object.name === 'classProps') {
        (path.node.property as Identifier).name = 'controls';
        hasChanges = true;
      }
    });

  root.find(j.VariableDeclarator).forEach((path) => {
    if (
      path.node.id.type === 'ObjectPattern' &&
      path.node.init?.type === 'CallExpression' &&
      path.node.init.callee.type === 'Identifier' &&
      path.node.init.callee.name === 'useScrollViewControls'
    ) {
      path.node.id.properties.forEach((property) => {
        if (
          property.type === 'ObjectProperty' &&
          property.key.type === 'Identifier' &&
          property.key.name === 'arrows'
        ) {
          property.key.name = 'controls';

          if (property.value.type === 'Identifier' && property.value.name === 'arrows') {
            property.value.name = 'controls';
          }

          hasChanges = true;
        }
      });
    }
  });

  if (root.find(j.Identifier, { name: 'useScrollViewControls' }).length > 0) {
    root.find(j.Identifier, { name: 'arrows' }).forEach((path) => {
      (path.node as Identifier).name = 'controls';
      hasChanges = true;
    });
  }

  if (renameComponent(j, root, 'ScrollViewArrows', 'ScrollViewControls', importSources)) {
    hasChanges = true;
  }

  if (namedImports.has('ScrollViewArrows')) {
    namedImports.delete('ScrollViewArrows');
    namedImports.add('ScrollViewControls');
  }

  return finishTransform(fileInfo, root, hasChanges, { quote: 'double' });
};

export default transform;
