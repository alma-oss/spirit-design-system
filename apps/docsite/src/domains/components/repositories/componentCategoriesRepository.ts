import { readFileSync } from 'fs';
import { join } from 'path';
import { getContentRoot } from '@local/domains/content/paths';
import { parse as parseYaml } from 'yaml';
import type { ComponentCategories } from '../features/component-catalog';

export const COMPONENT_CATEGORIES_FILE = 'component-categories.yaml';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.trim() !== '';

const isNonEmptyStringList = (value: unknown): value is string[] =>
  Array.isArray(value) && value.length > 0 && value.every(isNonEmptyString);

function guardCategories(parsed: unknown): asserts parsed is Record<string, unknown> {
  if (!isRecord(parsed)) {
    throw new Error(`${COMPONENT_CATEGORIES_FILE} must be a map of categories.`);
  }
}

function guardCategory(
  category: string,
  definition: unknown,
): asserts definition is { description: string; components: string[] } {
  if (!isRecord(definition)) {
    throw new Error(
      `Category "${category}" in ${COMPONENT_CATEGORIES_FILE} must be a map with a description and components.`,
    );
  }

  if (!isNonEmptyString(definition.description)) {
    throw new Error(`Category "${category}" in ${COMPONENT_CATEGORIES_FILE} must have a description.`);
  }

  if (!isNonEmptyStringList(definition.components)) {
    throw new Error(`Category "${category}" in ${COMPONENT_CATEGORIES_FILE} must list its components.`);
  }
}

function guardPlacement(categories: ComponentCategories, components: string[]) {
  const existing = new Set(components);
  const categorized = Object.values(categories).flatMap((definition) => definition.components);
  const unknown = categorized.filter((component) => !existing.has(component));
  const duplicated = [...new Set(categorized.filter((component, index) => categorized.indexOf(component) !== index))];
  const categorizedSet = new Set(categorized);
  const uncategorized = components.filter((component) => !categorizedSet.has(component));
  const problems = [
    unknown.length > 0 && `unknown components: ${unknown.join(', ')}`,
    duplicated.length > 0 && `components in more than one category: ${duplicated.join(', ')}`,
    uncategorized.length > 0 && `components without a category: ${uncategorized.join(', ')}`,
  ].filter(Boolean);

  if (problems.length > 0) {
    throw new Error(`${COMPONENT_CATEGORIES_FILE} has ${problems.join('; ')}.`);
  }
}

// Fail the build on a malformed file instead of rendering a silently broken listing.
export const parseComponentCategories = (raw: string, components: string[]): ComponentCategories => {
  const parsed: unknown = parseYaml(raw);

  guardCategories(parsed);

  const categories = Object.fromEntries(
    Object.entries(parsed).map(([category, definition]) => {
      guardCategory(category, definition);

      return [category, { description: definition.description, components: definition.components }];
    }),
  );

  guardPlacement(categories, components);

  return categories;
};

// Take the components the caller renders, so the validated list is the rendered list.
export const fetchComponentCategories = (components: string[]): ComponentCategories =>
  parseComponentCategories(readFileSync(join(getContentRoot(), COMPONENT_CATEGORIES_FILE), 'utf8'), components);
