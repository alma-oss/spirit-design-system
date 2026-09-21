import { API, ASTPath, FileInfo, JSXAttribute, JSXOpeningElement, ObjectExpression, ObjectProperty } from 'jscodeshift';
import { createImportSourceMatcher, finishTransform, getImportSources } from '../../../helpers';

type PropertyMigration = { from: string; to: string };
type ObjectFoldMigration = { from: string; keys: PropertyMigration[] };
type ComponentMigration = {
  fold?: PropertyMigration[];
  foldObject?: ObjectFoldMigration;
  rename?: PropertyMigration[];
};

const MIGRATIONS: Record<string, ComponentMigration> = {
  Breadcrumbs: { rename: [{ from: 'goBackTitle', to: 'labelBack' }] },
  CloseButton: { fold: [{ from: 'label', to: 'ariaLabel' }] },
  File: {
    fold: [
      { from: 'editText', to: 'ariaLabelEdit' },
      { from: 'removeText', to: 'ariaLabelRemove' },
    ],
  },
  FileUpload: {
    fold: [
      { from: 'buttonText', to: 'labelButton' },
      { from: 'inputUploadText', to: 'labelUpload' },
      { from: 'inputDragAndDropText', to: 'labelDragAndDrop' },
    ],
  },
  ModalHeader: { fold: [{ from: 'closeLabel', to: 'ariaLabelClose' }] },
  PaginationLink: { fold: [{ from: 'accessibilityLabel', to: 'ariaLabel' }] },
  PaginationLinkNext: { fold: [{ from: 'accessibilityLabel', to: 'ariaLabelNext' }] },
  PaginationLinkPrevious: { fold: [{ from: 'accessibilityLabel', to: 'ariaLabelPrevious' }] },
  ToastBar: { fold: [{ from: 'closeLabel', to: 'ariaLabelClose' }] },
  Tooltip: { fold: [{ from: 'closeLabel', to: 'ariaLabelClose' }] },
  UncontrolledPagination: {
    fold: [
      { from: 'accessibilityLabel', to: 'ariaLabel' },
      { from: 'accessibilityLabelPrevious', to: 'ariaLabelPrevious' },
      { from: 'accessibilityLabelNext', to: 'ariaLabelNext' },
    ],
  },
  UncontrolledSplitButton: {
    rename: [{ from: 'buttonLabel', to: 'labelButton' }],
    fold: [{ from: 'dropdownTriggerLabel', to: 'ariaLabelDropdown' }],
  },
  UncontrolledToast: { fold: [{ from: 'closeLabel', to: 'ariaLabelClose' }] },
  ScrollView: {
    foldObject: {
      from: 'ariaLabelControls',
      keys: [
        { from: 'start', to: 'ariaStart' },
        { from: 'end', to: 'ariaEnd' },
        { from: 'top', to: 'ariaTop' },
        { from: 'bottom', to: 'ariaBottom' },
      ],
    },
  },
  ScrollViewControls: {
    foldObject: {
      from: 'ariaLabelControls',
      keys: [
        { from: 'start', to: 'ariaStart' },
        { from: 'end', to: 'ariaEnd' },
        { from: 'top', to: 'ariaTop' },
        { from: 'bottom', to: 'ariaBottom' },
      ],
    },
  },
  UNSTABLE_Picker: {
    fold: [
      { from: 'addButtonLabel', to: 'ariaAdd' },
      { from: 'closeButtonLabel', to: 'ariaClose' },
      { from: 'emptySelectionLabel', to: 'labelEmptySelection' },
      { from: 'removeAllLabel', to: 'ariaRemoveAll' },
      { from: 'removeItemLabel', to: 'ariaRemoveItem' },
      { from: 'selectionAriaLabel', to: 'ariaSelection' },
      { from: 'tagDescriptionText', to: 'ariaTagDescription' },
    ],
  },
  UNSTABLE_UncontrolledPicker: {
    fold: [
      { from: 'addButtonLabel', to: 'ariaAdd' },
      { from: 'closeButtonLabel', to: 'ariaClose' },
      { from: 'emptySelectionLabel', to: 'labelEmptySelection' },
      { from: 'removeAllLabel', to: 'ariaRemoveAll' },
      { from: 'removeItemLabel', to: 'ariaRemoveItem' },
      { from: 'selectionAriaLabel', to: 'ariaSelection' },
      { from: 'tagDescriptionText', to: 'ariaTagDescription' },
    ],
  },
  UNSTABLE_Combobox: {
    fold: [
      { from: 'addMoreLabel', to: 'labelAddMore' },
      { from: 'addMoreDescriptionText', to: 'ariaAddMoreDescription' },
      { from: 'emptySelectionLabel', to: 'labelEmptySelection' },
      { from: 'removeAllLabel', to: 'ariaRemoveAll' },
      { from: 'removeItemLabel', to: 'ariaRemoveItem' },
      { from: 'selectionAriaLabel', to: 'ariaSelection' },
      { from: 'selectionCountLabel', to: 'ariaSelectionCount' },
      { from: 'selectionCountLabelSingular', to: 'ariaSelectionCountSingular' },
      { from: 'tagDescriptionText', to: 'ariaTagDescription' },
    ],
  },
  UNSTABLE_UncontrolledCombobox: {
    fold: [
      { from: 'addMoreLabel', to: 'labelAddMore' },
      { from: 'addMoreDescriptionText', to: 'ariaAddMoreDescription' },
      { from: 'emptySelectionLabel', to: 'labelEmptySelection' },
      { from: 'removeAllLabel', to: 'ariaRemoveAll' },
      { from: 'removeItemLabel', to: 'ariaRemoveItem' },
      { from: 'selectionAriaLabel', to: 'ariaSelection' },
      { from: 'selectionCountLabel', to: 'ariaSelectionCount' },
      { from: 'selectionCountLabelSingular', to: 'ariaSelectionCountSingular' },
      { from: 'tagDescriptionText', to: 'ariaTagDescription' },
    ],
  },
};

const findAttribute = (element: JSXOpeningElement, name: string): JSXAttribute | undefined =>
  element.attributes?.find(
    (attribute): attribute is JSXAttribute =>
      attribute.type === 'JSXAttribute' && attribute.name.type === 'JSXIdentifier' && attribute.name.name === name,
  );

const getAttributeExpression = (
  j: API['jscodeshift'],
  attribute: JSXAttribute,
): ObjectProperty['value'] | undefined => {
  if (attribute.value?.type === 'StringLiteral' || attribute.value?.type === 'Literal') {
    return j.stringLiteral(String(attribute.value.value));
  }

  if (attribute.value?.type === 'JSXExpressionContainer' && attribute.value.expression.type !== 'JSXEmptyExpression') {
    return attribute.value.expression as ObjectProperty['value'];
  }

  return undefined;
};

const hasObjectProperty = (object: ObjectExpression, name: string): boolean =>
  object.properties.some(
    (property) =>
      'key' in property &&
      ((property.key.type === 'Identifier' && property.key.name === name) ||
        ((property.key.type === 'StringLiteral' || property.key.type === 'Literal') && property.key.value === name)),
  );

/**
 * Returns a mutable object only when `strings` can be merged without guessing
 * runtime values or spread precedence.
 *
 * @param element - JSX element whose `strings` attribute is inspected.
 * @returns {object | undefined} The object literal when it is safe to mutate.
 */
const getStringsObject = (element: JSXOpeningElement): ObjectExpression | undefined => {
  const stringsAttribute = findAttribute(element, 'strings');

  if (!stringsAttribute) {
    return undefined;
  }

  if (
    stringsAttribute.value?.type !== 'JSXExpressionContainer' ||
    stringsAttribute.value.expression.type !== 'ObjectExpression' ||
    stringsAttribute.value.expression.properties.some((property) => property.type === 'SpreadElement')
  ) {
    return undefined;
  }

  return stringsAttribute.value.expression;
};

const migrateRenames = (element: JSXOpeningElement, migrations: PropertyMigration[]): boolean => {
  let hasChanges = false;

  migrations.forEach(({ from, to }) => {
    const oldAttribute = findAttribute(element, from);

    if (!oldAttribute) {
      return;
    }

    if (findAttribute(element, to)) {
      element.attributes = element.attributes?.filter((attribute) => attribute !== oldAttribute);
    } else if (oldAttribute.name.type === 'JSXIdentifier') {
      oldAttribute.name.name = to;
    }
    hasChanges = true;
  });

  return hasChanges;
};

/**
 * Folds deprecated attributes into an object-literal `strings` prop. Dynamic
 * values and spread objects are left unchanged because their keys are unknown.
 *
 * @param j - JSCodeshift factory used to create new AST nodes.
 * @param element - JSX element to migrate.
 * @param migrations - Deprecated-to-current key mappings for the component.
 * @returns {boolean} Whether at least one deprecated attribute was eligible for migration.
 */
const migrateFoldedProperties = (
  j: API['jscodeshift'],
  element: JSXOpeningElement,
  migrations: PropertyMigration[],
): boolean => {
  if (element.attributes?.some((attribute) => attribute.type === 'JSXSpreadAttribute')) {
    return false;
  }

  const oldAttributes = migrations
    .map((migration) => ({ migration, attribute: findAttribute(element, migration.from) }))
    .filter((entry): entry is { migration: PropertyMigration; attribute: JSXAttribute } => Boolean(entry.attribute));

  if (oldAttributes.length === 0) {
    return false;
  }

  const existingStringsAttribute = findAttribute(element, 'strings');
  let stringsObject = getStringsObject(element);

  if (existingStringsAttribute && !stringsObject) {
    return false;
  }

  if (!stringsObject) {
    stringsObject = j.objectExpression([]);
    element.attributes?.push(j.jsxAttribute(j.jsxIdentifier('strings'), j.jsxExpressionContainer(stringsObject)));
  }

  oldAttributes.forEach(({ migration, attribute }) => {
    const expression = getAttributeExpression(j, attribute);

    if (hasObjectProperty(stringsObject, migration.to)) {
      element.attributes = element.attributes?.filter((item) => item !== attribute);
    } else if (expression) {
      stringsObject.properties.push(j.objectProperty(j.identifier(migration.to), expression));
      element.attributes = element.attributes?.filter((item) => item !== attribute);
    }
  });

  return true;
};

const getObjectProperty = (object: ObjectExpression, name: string): ObjectProperty | undefined =>
  object.properties.find(
    (property): property is ObjectProperty =>
      property.type === 'ObjectProperty' &&
      ((property.key.type === 'Identifier' && property.key.name === name) ||
        ((property.key.type === 'StringLiteral' || property.key.type === 'Literal') && property.key.value === name)),
  );

/**
 * Folds a nested object-literal prop (e.g. `ariaLabelControls`) into `strings`.
 *
 * @param j - JSCodeshift factory used to create new AST nodes.
 * @param element - JSX element to migrate.
 * @param migration - Source attribute and nested key mappings.
 * @returns {boolean} Whether the nested object was eligible for migration.
 */
const migrateFoldedObject = (
  j: API['jscodeshift'],
  element: JSXOpeningElement,
  migration?: ObjectFoldMigration,
): boolean => {
  if (!migration) {
    return false;
  }

  const oldAttribute = findAttribute(element, migration.from);

  if (!oldAttribute) {
    return false;
  }

  if (
    oldAttribute.value?.type !== 'JSXExpressionContainer' ||
    oldAttribute.value.expression.type !== 'ObjectExpression' ||
    oldAttribute.value.expression.properties.some((property) => property.type === 'SpreadElement')
  ) {
    return false;
  }

  const existingStringsAttribute = findAttribute(element, 'strings');
  let stringsObject = getStringsObject(element);

  if (existingStringsAttribute && !stringsObject) {
    return false;
  }

  if (!stringsObject) {
    stringsObject = j.objectExpression([]);
    element.attributes?.push(j.jsxAttribute(j.jsxIdentifier('strings'), j.jsxExpressionContainer(stringsObject)));
  }

  const nestedObject = oldAttribute.value.expression;

  migration.keys.forEach(({ from, to }) => {
    const nestedProperty = getObjectProperty(nestedObject, from);

    if (!nestedProperty || hasObjectProperty(stringsObject, to)) {
      return;
    }

    stringsObject.properties.push(j.objectProperty(j.identifier(to), nestedProperty.value));
  });

  element.attributes = element.attributes?.filter((item) => item !== oldAttribute);

  return true;
};

const transform = (fileInfo: FileInfo, api: API, options: Record<string, unknown> = {}) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const isSpiritImport = createImportSourceMatcher(getImportSources(options));
  const localComponents = new Map<string, ComponentMigration>();
  let hasChanges = false;

  root
    .find(j.ImportDeclaration, { source: { value: (value: string) => isSpiritImport(value) } })
    .forEach((importPath) => {
      importPath.node.specifiers?.forEach((specifier) => {
        if (specifier.type === 'ImportDefaultSpecifier') {
          const migration = MIGRATIONS[specifier.local?.name ?? ''];

          if (migration && specifier.local) {
            localComponents.set(specifier.local.name, migration);
          }

          return;
        }

        if (specifier.type !== 'ImportSpecifier' || specifier.imported.type !== 'Identifier') {
          return;
        }

        const migration = MIGRATIONS[specifier.imported.name];

        if (migration) {
          localComponents.set(specifier.local?.name ?? specifier.imported.name, migration);
        }
      });
    });

  root.find(j.JSXOpeningElement).forEach((elementPath: ASTPath<JSXOpeningElement>) => {
    if (elementPath.node.name.type !== 'JSXIdentifier') {
      return;
    }

    const migration = localComponents.get(elementPath.node.name.name);

    if (!migration) {
      return;
    }

    if (elementPath.node.attributes?.some((attribute) => attribute.type === 'JSXSpreadAttribute')) {
      return;
    }

    const hasRenamedProps = migrateRenames(elementPath.node, migration.rename ?? []);
    const hasFoldedProps = migrateFoldedProperties(j, elementPath.node, migration.fold ?? []);
    const hasFoldedObject = migrateFoldedObject(j, elementPath.node, migration.foldObject);
    hasChanges = hasRenamedProps || hasFoldedProps || hasFoldedObject || hasChanges;
  });

  return finishTransform(fileInfo, root, hasChanges, { quote: 'double' });
};

export default transform;
