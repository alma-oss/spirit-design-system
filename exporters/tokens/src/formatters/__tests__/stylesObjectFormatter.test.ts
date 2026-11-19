import { type StylesObjectType, typographyStyleLeaf } from '../../core/types';
import { convertToJs, convertToScss } from '../stylesObjectFormatter';

const mergedObject = {
  $grids: {
    spacing: {
      desktop: '$grid-spacing-desktop',
      mobile: '$grid-spacing-mobile',
      tablet: '$grid-spacing-tablet',
    },
    columns: '$grid-columns',
  },
};

const mergedTypographyObject = {
  $heading1: {
    'font-family': '$font-family-example',
    'font-size': '$font-size-example',
  },
  $body1: {
    'font-family': '$font-family-example',
    'font-size': '$font-size-example',
  },
  $styles: {
    'heading-1': '$heading-1-example',
    'body-1': '$body-1-example',
  },
};

const mergedJsObject = {
  grids: {
    spacing: {
      desktop: 'gridSpacingDesktop',
      mobile: 'gridSpacingMobile',
      tablet: 'gridSpacingTablet',
    },
    _01: {
      background: 'backgroundSubtle',
    },
    columns: 'gridColumns',
    focus: 'focus',
  },
};

const mergedTypographyJsObject = {
  heading: {
    fontFamily: 'fontFamilyExample',
    fontSize: 'fontSizeExample',
  },
  body1: {
    fontFamily: 'fontFamilyExample',
    fontSize: 'fontSizeExample',
  },
  styles: {
    heading1: 'heading1Example',
    body1: 'body1Example',
  },
  focus: 'focus',
};

describe('stylesObjectFormatter', () => {
  describe('convertToScss', () => {
    it('should convert object to SCSS', () => {
      const expectedScssObject = `$grids: (
spacing: (
desktop: $grid-spacing-desktop,
mobile: $grid-spacing-mobile,
tablet: $grid-spacing-tablet,
),
columns: $grid-columns,
),`;

      const result = convertToScss(mergedObject);

      expect(result).toBe(expectedScssObject);
    });

    it('should convert typography object to SCSS', () => {
      const expectedScssTypographyObject = `$heading1: (
font-family: $font-family-example,
font-size: $font-size-example,
),
$body1: (
font-family: $font-family-example,
font-size: $font-size-example,
),
$styles: (
heading-1: $heading-1-example,
body-1: $body-1-example,
),`;

      const result = convertToScss(mergedTypographyObject);

      expect(result).toBe(expectedScssTypographyObject);
    });
  });

  describe('convertToJs', () => {
    it('should convert object to JS', () => {
      const expectedJsObject = `grids: {
spacing: {
desktop: gridSpacingDesktop,
mobile: gridSpacingMobile,
tablet: gridSpacingTablet,
},
'01': {
background: backgroundSubtle,
},
columns: gridColumns,
focus,
},`;
      const result = convertToJs(mergedJsObject);

      expect(result).toBe(expectedJsObject);
    });

    it('should convert typography object to JS', () => {
      const expectedJsTypographyObject = `heading: {
fontFamily: fontFamilyExample,
fontSize: fontSizeExample,
},
body1: {
fontFamily: fontFamilyExample,
fontSize: fontSizeExample,
},
styles: {
heading1: heading1Example,
body1: body1Example,
},
focus,`;

      const result = convertToJs(mergedTypographyJsObject);

      expect(result).toBe(expectedJsTypographyObject);
    });
  });

  describe('typography style leaves', () => {
    const leaf = typographyStyleLeaf({
      fontFamily: "'Inter', sans-serif",
      fontSize: "'1rem'",
      fontStyle: "'normal'",
      fontWeight: 400,
      lineHeight: '1.5',
    });

    it('should render a typography leaf as an SCSS map', () => {
      expect(convertToScss({ $body: { mobile: leaf } } as StylesObjectType)).toBe(
        '$body: (\nmobile: (\nfont-family: "\'Inter\', sans-serif",\nfont-size: 1rem,\nfont-style: normal,\nfont-weight: 400,\nline-height: 1.5,\n),\n),',
      );
    });

    it('should render a typography leaf as a JS object', () => {
      expect(convertToJs({ body: { mobile: leaf } } as StylesObjectType)).toBe(
        "body: {\nmobile: {\nfontFamily: \"'Inter', sans-serif\",\nfontSize: '1rem',\nfontStyle: 'normal',\nfontWeight: 400,\nlineHeight: 1.5,\n},\n},",
      );
    });
  });
});
