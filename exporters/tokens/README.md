# Spirit Tokens Exporter

The Spirit Tokens Exporter is a custom exporter for the Spirit Design System, developed by [Alma Career (formerly LMC)][alma-career],
to generate SCSS and JavaScript variables and maps for use in your projects.
Built for seamless integration with [Supernova][supernova-studio], the exporter processes design tokens extracted from Figma through Supernova,
transforming them into a structured set of reusable styles.

The exporter performs the following operations to ensure an efficient and organized token structure:

- generates a list of styles and structured styles objects from a list of tokens, supporting both CSS and JavaScript outputs,
  with tailored handling for specific token types,
- creates a hierarchical styles object by processing token name parts and categorizing tokens into typography or non-typography types,
- processes typography tokens, organizing them into style objects by breakpoints and name structure,
- processes non-typography tokens and organizes them into the styles object,
- processes theme tokens, generating SCSS maps with color values and CSS variables for each theme,
- generates a SCSS files with CSS values/variables and a JS files with values and styles objects.

## Exported Tokens

The exporter generates two main types of token outputs: Global Tokens and Theme Tokens.

### Global Tokens

Global tokens include all non-theme-related tokens from Supernova, grouped by type and exported as SCSS maps.

#### Outputs

- \_borders.scss - Contains border width values
- \_gradients.scss - Contains gradient values
- \_other.scss - Contains values which do not fit into other categories
- \_radii.scss - Contains border radius values
- \_shadows.scss - Contains shadow values
- \_spacing.scss - Contains spacing values
- \_typography.scss - Contains typography values
- index.scss

The index file contains SCSS forwards of all other outputs.

### Theme Tokens

Theme tokens include all theme-specific tokens (currently limited to color tokens), with the exception of device collections from Supernova.
The exporter creates a dedicated directory for each theme, containing SCSS maps and CSS variables grouped by color categories.

#### Outputs

- \_color-tokens.scss - Contains color CSS variables for each color and mapping to color groups
- index.scss

For each theme, the exporter generates the following files:

- \\{theme_name}\\\_colors.scss - Contains color values and mapping to CSS variables
- \\{theme_name}\\index.scss

The index files contains SCSS forwards of all other outputs.

### Device Tokens

Device tokens include all tokens from the Device collection in Supernova.
These tokens are exported as SCSS maps and CSS variables, grouped by dimension and string categories.
The exporter processes these tokens to ensure they are updated with the device theme.

- \_devices.scss - Contains dimension and string values and mapping to CSS variables
- index.scss

## Sorting

Tokens are sorted alphabetically by their origin name (Figma) or their Supernova name.
Exceptions include Borders, Radii, Spacing, Other tokens, and all tokens from the Device collection which are sorted numerically by their value.

## Development

To generate the original unformatted data from Supernova, enable the `generateOriginalDataFiles` option in the `config.local.json` file.
Once activated, the original data will be generated alongside other outputs and stored in the `original-data` folder.

- \_original-tokens.json
- \_original-groups.json

## Naming Rules for Themes

For the proper functionality of themes in the Spirit Tokens Exporter in Supernova, all theme names must adhere to specific conventions.
Themes names are imported to Supernova from Figma, and designers are responsible for following these naming rules to ensure the correct
export of design tokens.

- Spaces are not allowed in theme names, as they disrupt the structure of the generated CSS (SCSS), which relies on precise syntax.
- We recommend using a kebab-case naming format such as `theme-light-default` to ensure consistency and compatibility.

Adhering to these guidelines helps maintain the integrity of the exported files, ensuring they operate smoothly and without errors.

## Handling Invariant and Special Cases

The exporter handles specific exceptions to the general logic of token processing to ensure consistency and correctness:

### Special Cases

- Gradient tokens: CSS variables are added for gradients, allowing for theme-based color customization and gradient angle adjustments. The original gradient values serve as fallbacks for these CSS variables.
- Color tokens with multiple references – When processing color tokens containing multiple color references (e.g., gradients with multiple stops), the exporter automatically generates numbered CSS variables for each color.
  These variables follow the pattern `--{tokenPrefix}color-{groupName}-{name}-color-XX`, where `XX` is an incremented counter for each color reference in the token. This ensures that all color components of a token remain
  customizable while maintaining a clear and structured naming convention. Additionally, occurrences of `0px` are normalized to `0` for consistency.
- Typography tokens with Link – Typography tokens that include `Link` in their name are intentionally excluded from processing. This ensures that these tokens do not interfere with standard typography styling
  and are not mistakenly included in style mappings.
- Typography tokens with Italic – Typography tokens that include `Italic` in their name are intentionally excluded from processing. Italics are applied with the `.text-italic` helper instead of dedicated token variants.
- Tokens with `figma-` – Tokens that contain `figma-` in their name are intentionally excluded from processing. This ensures that internal Figma tokens are not included in the exported output.
- `breakpoint-mobile` token: This token is assigned a fixed value of `0`, deviating from standard processing rules. This ensures compatibility with predefined requirements and reflects its role in responsive design settings.

### Invariant Token Aliases

Tokens with a numeric part or specific predefined names are adjusted to follow a consistent naming convention. Currently, the exporter manages the following invariant aliases:

- `radius-full` is transformed into `full`. This logic ensures uniformity in token naming and usage across projects.

The configuration for these invariant aliases is defined in the `src/config/invariantTokensAliasConfig.ts` file. This allows easy customization and extension if needed.

These exceptions are carefully managed to prevent errors and provide a reliable token structure.

### Font Family Replacement

The `fontFamily` in Typography can be replaced using Supernova pipeline fields defined in `config.json` and their corresponding types in `config.ts`.
This allows replacement for up to **5** font families.

#### Replacement Logic

- `searchFont1` is replaced by `replaceFont1`. If `replaceFont1` is empty, the default value from Figma is used.

#### Examples

1. **Rename a font to include a dash**:

   | Original Value             | Search         | Replace        | Result                     |
   | -------------------------- | -------------- | -------------- | -------------------------- |
   | `'Comic Sans', sans-serif` | `'Comic Sans'` | `'Comic-Sans'` | `'Comic-Sans', sans-serif` |

2. **Add fallbacks**:

   | Original Value             | Search       | Replace            | Result                           |
   | -------------------------- | ------------ | ------------------ | -------------------------------- |
   | `'Comic Sans', sans-serif` | `sans-serif` | `Wingdings, serif` | `'Comic Sans', Wingdings, serif` |

3. **Change fallback for one font or replace the entire font stack**:

   | Original Value             | Search                     | Replace            | Result             |
   | -------------------------- | -------------------------- | ------------------ | ------------------ |
   | `'Comic Sans', sans-serif` | `'Comic Sans', sans-serif` | `Wingdings, Arial` | `Wingdings, Arial` |

#### Notes

- Multiword font names **must** be wrapped in **single quotes** to ensure proper parsing and handling of spaces.
- **Double quotes** will be removed.

[alma-career]: https://github.com/lmc-eu
[supernova-studio]: https://github.com/Supernova-Studio
