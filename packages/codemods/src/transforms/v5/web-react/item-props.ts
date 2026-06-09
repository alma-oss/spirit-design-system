import {
  API,
  Collection,
  FileInfo,
  ImportDeclaration,
  JSXAttribute,
  JSXElement,
  JSXExpressionContainer,
  JSXMemberExpression,
  JSXOpeningElement,
  JSXSpreadAttribute,
} from 'jscodeshift';
import { removeParentheses } from '../../../helpers';

const SPIRIT_WEB_REACT_MODULE = /^@alma-oss\/spirit-web-react(\/.*)?$/;
const ITEM_COMPONENT = 'Item';
const CHECK_ICON_NAME = 'check-plain';

type JSXAttributeValue = JSXAttribute['value'];
type SpiritImports = {
  namedImports: Set<string>;
  namespaceImports: Set<string>;
};
type BooleanAttributeState =
  | {
      type: 'static';
      value: boolean;
    }
  | {
      type: 'dynamic';
      expression: Exclude<JSXExpressionContainer['expression'], { type: 'JSXEmptyExpression' }>;
    };

const getAttribute = (element: JSXOpeningElement, name: string): JSXAttribute | undefined =>
  element.attributes?.find(
    (attribute): attribute is JSXAttribute =>
      attribute.type === 'JSXAttribute' && attribute.name.type === 'JSXIdentifier' && attribute.name.name === name,
  );

const hasAttribute = (element: JSXOpeningElement, name: string): boolean => Boolean(getAttribute(element, name));

const removeAttributes = (element: JSXOpeningElement, names: string[]) => {
  element.attributes =
    element.attributes?.filter(
      (attribute) =>
        attribute.type !== 'JSXAttribute' ||
        attribute.name.type !== 'JSXIdentifier' ||
        !names.includes(attribute.name.name),
    ) ?? [];
};

const isTargetElement = (element: JSXOpeningElement, { namedImports, namespaceImports }: SpiritImports): boolean => {
  if (element.name.type === 'JSXIdentifier') {
    return namedImports.has(element.name.name);
  }

  if (element.name.type !== 'JSXMemberExpression') {
    return false;
  }

  const memberExpression = element.name as JSXMemberExpression;
  const objectName = memberExpression.object.type === 'JSXIdentifier' ? memberExpression.object.name : undefined;
  const propertyName = memberExpression.property.type === 'JSXIdentifier' ? memberExpression.property.name : undefined;

  return Boolean(objectName && propertyName === ITEM_COMPONENT && namespaceImports.has(objectName));
};

const getItemImports = (j: API['jscodeshift'], root: Collection): SpiritImports => {
  const namedImports = new Set<string>();
  const namespaceImports = new Set<string>();

  root
    .find(j.ImportDeclaration, {
      source: {
        value: (value: string) => SPIRIT_WEB_REACT_MODULE.test(value),
      },
    })
    .forEach((path) => {
      const sourceValue = path.node.source.value;
      const importsItemByDefault = typeof sourceValue === 'string' && /\/Item$/.test(sourceValue);

      path.node.specifiers?.forEach((specifier) => {
        if (
          specifier.type === 'ImportSpecifier' &&
          specifier.imported.type === 'Identifier' &&
          specifier.imported.name === ITEM_COMPONENT
        ) {
          namedImports.add(specifier.local?.name ?? specifier.imported.name);
        }

        if (specifier.type === 'ImportDefaultSpecifier' && importsItemByDefault && specifier.local?.name) {
          namedImports.add(specifier.local.name);
        }

        if (specifier.type === 'ImportNamespaceSpecifier' && specifier.local?.name) {
          namespaceImports.add(specifier.local.name);
        }
      });
    });

  return { namedImports, namespaceImports };
};

const addNamedImport = (j: API['jscodeshift'], root: Collection, importedName: string): string => {
  const importDeclarations = root.find(j.ImportDeclaration, {
    source: { value: (value: string) => SPIRIT_WEB_REACT_MODULE.test(value) },
  });
  let localName = importedName;
  let sourceValue = '@alma-oss/spirit-web-react';
  let importDeclarationForSpecifier: Collection<ImportDeclaration> | undefined;

  importDeclarations.forEach((path) => {
    if (typeof path.node.source.value === 'string' && !path.node.source.value.endsWith(`/${ITEM_COMPONENT}`)) {
      sourceValue = path.node.source.value;
    }

    const hasNamespaceSpecifier = path.node.specifiers?.some(
      (specifier) => specifier.type === 'ImportNamespaceSpecifier',
    );

    path.node.specifiers?.forEach((specifier) => {
      if (
        specifier.type === 'ImportSpecifier' &&
        specifier.imported.type === 'Identifier' &&
        specifier.imported.name === importedName
      ) {
        localName = specifier.local?.name ?? importedName;
      }
    });

    if (!hasNamespaceSpecifier && !importDeclarationForSpecifier) {
      importDeclarationForSpecifier = j(path);
    }
  });

  if (localName !== importedName) {
    return localName;
  }

  const hasImport =
    importDeclarations.find(j.ImportSpecifier, { imported: { type: 'Identifier', name: importedName } }).length > 0;

  if (hasImport) {
    return localName;
  }

  if (importDeclarationForSpecifier) {
    importDeclarationForSpecifier.forEach((path) => {
      path.node.specifiers = [...(path.node.specifiers ?? []), j.importSpecifier(j.identifier(importedName))];
    });

    return localName;
  }

  importDeclarations
    .at(0)
    .insertAfter(j.importDeclaration([j.importSpecifier(j.identifier(importedName))], j.stringLiteral(sourceValue)));

  return localName;
};

const resolveBooleanAttributeState = (attribute: JSXAttribute | undefined): BooleanAttributeState => {
  if (!attribute) {
    return { type: 'static', value: false };
  }

  const { value } = attribute;

  if (!value) {
    return { type: 'static', value: true };
  }

  if (value.type === 'StringLiteral') {
    return { type: 'static', value: true };
  }

  if (value.type === 'JSXExpressionContainer') {
    if (value.expression.type === 'BooleanLiteral') {
      return { type: 'static', value: value.expression.value };
    }

    if (value.expression.type === 'JSXEmptyExpression') {
      return { type: 'static', value: true };
    }

    return { type: 'dynamic', expression: value.expression };
  }

  return { type: 'static', value: true };
};

// Build a spread attribute that only applies the selected color when the condition is truthy,
// e.g. `{...(condition ? { color: "selected" } : {})}`. Spreading an object on both branches keeps
// the output type-safe (avoiding `Spread types may only be created from object types`) while still
// omitting the prop entirely when the condition is falsy.
const createSelectedColorSpread = (j: API['jscodeshift'], condition: never): JSXSpreadAttribute =>
  j.jsxSpreadAttribute(
    j.conditionalExpression(
      condition,
      j.objectExpression([j.property('init', j.identifier('color'), j.stringLiteral('selected'))]),
      j.objectExpression([]),
    ),
  );

// Color for the selection check icon rendered in the end slot. Apply `color="selected"` only when
// the item is selected and not disabled; disabled styling defines the icon color otherwise.
const createCheckIconColorAttribute = (
  j: API['jscodeshift'],
  isSelectedAttribute: JSXAttribute | undefined,
  isDisabledAttribute: JSXAttribute | undefined,
): JSXAttribute | JSXSpreadAttribute | undefined => {
  const disabledState = resolveBooleanAttributeState(isDisabledAttribute);
  const selectedState = isSelectedAttribute
    ? resolveBooleanAttributeState(isSelectedAttribute)
    : ({ type: 'static', value: true } as const);

  if (disabledState.type === 'static' && disabledState.value) {
    return undefined;
  }

  if (selectedState.type === 'static' && !selectedState.value) {
    return undefined;
  }

  const needsSelectedCondition = selectedState.type === 'dynamic';
  const needsDisabledCondition = disabledState.type === 'dynamic';

  if (!needsSelectedCondition && !needsDisabledCondition) {
    return j.jsxAttribute(j.jsxIdentifier('color'), j.stringLiteral('selected'));
  }

  let condition: never = j.booleanLiteral(true) as never;

  if (needsSelectedCondition) {
    condition = selectedState.expression as never;
  }

  if (needsDisabledCondition) {
    const notDisabled = j.unaryExpression('!', disabledState.expression);
    let selectedCondition: never;

    if (needsSelectedCondition) {
      selectedCondition = selectedState.expression as never;
    } else if (isSelectedAttribute) {
      selectedCondition = j.identifier('isSelected') as never;
    } else {
      selectedCondition = j.booleanLiteral(true) as never;
    }

    if (needsSelectedCondition || isSelectedAttribute) {
      condition = j.logicalExpression('&&', selectedCondition, notDisabled) as never;
    } else {
      condition = notDisabled as never;
    }
  }

  return createSelectedColorSpread(j, condition);
};

const createIconElement = (
  j: API['jscodeshift'],
  iconNameValue: JSXAttributeValue,
  iconLocalName: string,
  colorAttribute?: JSXAttribute | JSXSpreadAttribute,
): JSXExpressionContainer => {
  const iconAttribute =
    iconNameValue?.type === 'StringLiteral'
      ? j.jsxAttribute(j.jsxIdentifier('name'), j.stringLiteral(iconNameValue.value))
      : j.jsxAttribute(
          j.jsxIdentifier('name'),
          j.jsxExpressionContainer(
            iconNameValue?.type === 'JSXExpressionContainer' ? iconNameValue.expression : j.stringLiteral(''),
          ),
        );

  return j.jsxExpressionContainer(
    j.jsxElement(
      j.jsxOpeningElement(
        j.jsxIdentifier(iconLocalName),
        [iconAttribute, colorAttribute].filter(Boolean) as (JSXAttribute | JSXSpreadAttribute)[],
        true,
      ),
      null,
      [],
    ),
  );
};

const createCheckIconElement = (
  j: API['jscodeshift'],
  iconLocalName: string,
  colorAttribute?: JSXAttribute | JSXSpreadAttribute,
): JSXExpressionContainer => createIconElement(j, j.stringLiteral(CHECK_ICON_NAME), iconLocalName, colorAttribute);

const createConditionalCheckIconElement = (
  j: API['jscodeshift'],
  isSelectedAttribute: JSXAttribute,
  iconLocalName: string,
  colorAttribute?: JSXAttribute | JSXSpreadAttribute,
): JSXExpressionContainer => {
  const { value } = isSelectedAttribute;

  if (!value) {
    return createCheckIconElement(j, iconLocalName, colorAttribute);
  }

  if (value.type === 'JSXExpressionContainer' && value.expression.type === 'BooleanLiteral') {
    return value.expression.value
      ? createCheckIconElement(j, iconLocalName, colorAttribute)
      : j.jsxExpressionContainer(j.identifier('undefined'));
  }

  if (value.type === 'JSXExpressionContainer') {
    const { expression } = value;

    if (expression.type === 'JSXEmptyExpression') {
      return createCheckIconElement(j, iconLocalName, colorAttribute);
    }

    return j.jsxExpressionContainer(
      j.logicalExpression(
        '&&',
        expression as never,
        createCheckIconElement(j, iconLocalName, colorAttribute).expression as never,
      ),
    );
  }

  return createCheckIconElement(j, iconLocalName, colorAttribute);
};

const createLabelElement = (
  j: API['jscodeshift'],
  labelValue: JSXAttributeValue,
  labelLocalName: string,
): JSXElement => {
  let children: JSXElement['children'] = [];

  if (labelValue?.type === 'StringLiteral') {
    children = [j.jsxText(labelValue.value)];
  }

  if (labelValue?.type === 'JSXExpressionContainer' && labelValue.expression.type !== 'JSXEmptyExpression') {
    children = [j.jsxExpressionContainer(labelValue.expression)];
  }

  return j.jsxElement(
    j.jsxOpeningElement(
      j.jsxIdentifier(labelLocalName),
      [j.jsxAttribute(j.jsxIdentifier('elementType'), j.stringLiteral('span'))],
      false,
    ),
    j.jsxClosingElement(j.jsxIdentifier(labelLocalName)),
    children,
  );
};

const createHelperTextElement = (
  j: API['jscodeshift'],
  helperTextValue: JSXAttributeValue,
  helperTextLocalName: string,
): JSXElement =>
  j.jsxElement(
    j.jsxOpeningElement(
      j.jsxIdentifier(helperTextLocalName),
      [
        j.jsxAttribute(j.jsxIdentifier('elementType'), j.stringLiteral('span')),
        j.jsxAttribute(j.jsxIdentifier('helperText'), helperTextValue),
      ],
      true,
    ),
    null,
    [],
  );

const shouldAddEndSlot = (selectionDecoratorAttribute: JSXAttribute | undefined, hasIsSelected: boolean): boolean => {
  if (!hasIsSelected) {
    return false;
  }

  if (!selectionDecoratorAttribute) {
    return true;
  }

  if (selectionDecoratorAttribute.value?.type === 'StringLiteral') {
    return ['icon', 'both'].includes(selectionDecoratorAttribute.value.value);
  }

  return false;
};

const transform = (fileInfo: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const itemImports = getItemImports(j, root);

  if (itemImports.namedImports.size === 0 && itemImports.namespaceImports.size === 0) {
    return fileInfo.source;
  }

  let shouldImportIcon = false;
  let shouldImportLabel = false;
  let shouldImportHelperText = false;

  root.find(j.JSXElement).forEach((path) => {
    const { openingElement } = path.node;

    if (!isTargetElement(openingElement, itemImports)) {
      return;
    }

    const iconNameAttribute = getAttribute(openingElement, 'iconName');
    const labelAttribute = getAttribute(openingElement, 'label');
    const helperTextAttribute = getAttribute(openingElement, 'helperText');
    const selectionDecoratorAttribute = getAttribute(openingElement, 'selectionDecorator');
    const isSelectedAttribute = getAttribute(openingElement, 'isSelected');

    shouldImportIcon ||=
      Boolean(iconNameAttribute && !hasAttribute(openingElement, 'startSlot')) ||
      Boolean(
        !hasAttribute(openingElement, 'endSlot') &&
        shouldAddEndSlot(selectionDecoratorAttribute, Boolean(isSelectedAttribute)),
      );
    shouldImportLabel ||= Boolean(labelAttribute);
    shouldImportHelperText ||= Boolean(helperTextAttribute);
  });

  const iconLocalName = shouldImportIcon ? addNamedImport(j, root, 'Icon') : 'Icon';
  const labelLocalName = shouldImportLabel ? addNamedImport(j, root, 'Label') : 'Label';
  const helperTextLocalName = shouldImportHelperText ? addNamedImport(j, root, 'HelperText') : 'HelperText';

  root.find(j.JSXElement).forEach((path) => {
    const { openingElement } = path.node;

    if (!isTargetElement(openingElement, itemImports)) {
      return;
    }

    const iconNameAttribute = getAttribute(openingElement, 'iconName');
    const labelAttribute = getAttribute(openingElement, 'label');
    const helperTextAttribute = getAttribute(openingElement, 'helperText');
    const selectionDecoratorAttribute = getAttribute(openingElement, 'selectionDecorator');
    const isSelectedAttribute = getAttribute(openingElement, 'isSelected');
    const isDisabledAttribute = getAttribute(openingElement, 'isDisabled');
    const children: JSXElement[] = [];

    if (!hasAttribute(openingElement, 'elementType')) {
      openingElement.attributes = [
        j.jsxAttribute(j.jsxIdentifier('elementType'), j.stringLiteral('button')),
        ...(openingElement.attributes ?? []),
      ];
    }

    if (
      isSelectedAttribute &&
      !hasAttribute(openingElement, 'endSlot') &&
      shouldAddEndSlot(selectionDecoratorAttribute, true)
    ) {
      openingElement.attributes?.unshift(
        j.jsxAttribute(
          j.jsxIdentifier('endSlot'),
          createConditionalCheckIconElement(
            j,
            isSelectedAttribute,
            iconLocalName,
            createCheckIconColorAttribute(j, isSelectedAttribute, isDisabledAttribute),
          ),
        ),
      );
    }

    if (iconNameAttribute && !hasAttribute(openingElement, 'startSlot')) {
      openingElement.attributes?.unshift(
        j.jsxAttribute(j.jsxIdentifier('startSlot'), createIconElement(j, iconNameAttribute.value, iconLocalName)),
      );
    }

    if (labelAttribute) {
      children.push(createLabelElement(j, labelAttribute.value, labelLocalName));
    }

    if (helperTextAttribute) {
      children.push(createHelperTextElement(j, helperTextAttribute.value, helperTextLocalName));
    }

    removeAttributes(openingElement, ['iconName', 'label', 'helperText', 'selectionDecorator']);

    if (children.length > 0) {
      openingElement.selfClosing = false;
      path.node.closingElement = j.jsxClosingElement(openingElement.name);
      path.node.children = [...children, ...(path.node.children ?? [])];
    }
  });

  return removeParentheses(root.toSource());
};

export default transform;
