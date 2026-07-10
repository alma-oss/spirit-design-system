/**
 * Main configuration of the exporter - type interface.
 * Default values for it can be set through `config.json`
 * Users can override the behavior when creating the pipelines
 * or by creating `config.local.json` file specifying actual values.
 */
export type ExporterConfiguration = {
  /**
   * When enabled, generate a disclaimer showing the fact
   * that the file was generated automatically
   * and should not be changed manually will appear in all files
   */
  generateOriginalDataFiles: boolean;

  /* Search font 1 */
  searchFont1: string;

  /* Replace font 1 */
  replaceFont1: string;

  /* Search font weight 1 */
  searchFontWeight1: string;

  /* Replace font weight 1 */
  replaceFontWeight1: string;

  /* Search font 2 */
  searchFont2: string;

  /* Replace font 2 */
  replaceFont2: string;

  /* Search font weight 2 */
  searchFontWeight2: string;

  /* Replace font weight 2 */
  replaceFontWeight2: string;

  /* Search font 3 */
  searchFont3: string;

  /* Replace font 3 */
  replaceFont3: string;

  /* Search font weight 3 */
  searchFontWeight3: string;

  /* Replace font weight 3 */
  replaceFontWeight3: string;

  /* Search font 4 */
  searchFont4: string;

  /* Replace font 4 */
  replaceFont4: string;

  /* Search font weight 4 */
  searchFontWeight4: string;

  /* Replace font weight 4 */
  replaceFontWeight4: string;

  /* Search font 5 */
  searchFont5: string;

  /* Replace font 5 */
  replaceFont5: string;

  /* Search font weight 5 */
  searchFontWeight5: string;

  /* Replace font weight 5 */
  replaceFontWeight5: string;

  /* For dynamic generation of replacement arrays in tokenHelper */
  [key: `searchFont${number}` | `replaceFont${number}` | `searchFontWeight${number}` | `replaceFontWeight${number}`]: string;
};

/** Exporter configuration from the resolved default configuration and user overrides */
export const exportConfiguration: ExporterConfiguration = Pulsar.exportConfig<ExporterConfiguration>();
