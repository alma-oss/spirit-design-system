import { readFileSync } from 'fs';
import { join } from 'path';
import { getContentRoot } from '@local/domains/content/paths';
import { parse as parseYaml } from 'yaml';
import type { ComponentCategories } from '../features/component-catalog';

export const COMPONENTS_SCHEMA_FILE = 'components.schema.yaml';

export interface ComponentsSchema {
  components: string[];
  categories: ComponentCategories;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.trim() !== '';

const isStringList = (value: unknown): value is string[] => Array.isArray(value) && value.every(isNonEmptyString);

// Fail the build on a malformed file instead of rendering a silently broken listing.
export const parseComponentsSchema = (raw: string): ComponentsSchema => {
  const parsed: unknown = parseYaml(raw);

  if (!isRecord(parsed) || !isStringList(parsed.components) || !isRecord(parsed.categories)) {
    throw new Error(`${COMPONENTS_SCHEMA_FILE} must have a \`components\` list and a \`categories\` map.`);
  }

  const components = new Set(parsed.components);

  const categories = Object.fromEntries(
    Object.entries(parsed.categories).map(([category, definition]) => {
      if (!isRecord(definition) || !isNonEmptyString(definition.description)) {
        throw new Error(`Category "${category}" in ${COMPONENTS_SCHEMA_FILE} must have a description.`);
      }

      if (!isStringList(definition.components)) {
        throw new Error(`Category "${category}" in ${COMPONENTS_SCHEMA_FILE} must list its components.`);
      }

      // A plain name instead of an alias is valid YAML, so check it against `components` here.
      const unlisted = definition.components.filter((component) => !components.has(component));

      if (unlisted.length > 0) {
        throw new Error(
          `Category "${category}" in ${COMPONENTS_SCHEMA_FILE} lists components missing from \`components\`: ${unlisted.join(', ')}.`,
        );
      }

      return [category, { description: definition.description, components: definition.components }];
    }),
  );

  return { components: parsed.components, categories };
};

export const fetchComponentsSchema = (): ComponentsSchema =>
  parseComponentsSchema(readFileSync(join(getContentRoot(), COMPONENTS_SCHEMA_FILE), 'utf8'));

export const fetchComponentCategories = (): ComponentCategories => fetchComponentsSchema().categories;
