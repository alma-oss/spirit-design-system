export interface ComponentCategoryDefinition {
  description: string;
  components: string[];
}

export type ComponentCategories = Record<string, ComponentCategoryDefinition>;

export interface ComponentCatalogEntry {
  name: string;
  description: string;
  illustration?: string;
}
