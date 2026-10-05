'use client';

import { Box, Flex, Heading, Text } from '@alma-oss/spirit-web-react';
import { type CSSProperties } from 'react';
import styles from './CustomAssets.module.scss';
import PageSection from './PageSection';

const ASSETS_PATH = '/custom-assets';
const CODE_TEXT_CLASS = 'typography-code-small-regular';

interface Glyph {
  src: string;
  size: number;
  /** Position of the artwork inside the glyph box, as exported from the design. */
  inset?: string;
  /** Extra bleed of the artwork (strokes overflowing its frame), as exported from the design. */
  bleed?: string;
}

const homeIcons: Glyph[] = [
  { src: 'home-1.svg', size: 25, inset: '6.63%' },
  { src: 'home-2.svg', size: 24 },
  { src: 'home-3.svg', size: 25 },
  { src: 'home-4.svg', size: 25, inset: '13.45% 6.8%', bleed: '-4.76% -4.07%' },
];

const starIcons: Glyph[] = [
  { src: 'star-1.svg', size: 25, inset: '7.44%', bleed: '-3.36% -3.36% -3.37% -3.36%' },
  { src: 'star-2.svg', size: 25, inset: '8.73% 7.08% 8.78% 6.9%', bleed: '-3.47% -3.32%' },
  { src: 'star-3.svg', size: 25, inset: '1.98% 0.01% 2.04% 0.01%' },
  { src: 'star-4.svg', size: 25, inset: '9.38% 7.33% 8.9% 7.34%', bleed: '-3.5% -3.35%' },
];

interface IllustrationLayer {
  src: string;
  inset: string;
}

// The first illustration is exported from the design as separately positioned layers.
const layeredIllustration: IllustrationLayer[] = [
  { src: 'password-1-screen.svg', inset: '19.27% 2.24% 5.77% 16.15%' },
  { src: 'password-1-locker.svg', inset: '39.15% 8.32% 31.68% 65.56%' },
  { src: 'password-1-password.svg', inset: '25.8% 8.49% 66.37% 55.43%' },
  { src: 'password-1-character.svg', inset: '9.67% 32.3% 9.2% 14.28%' },
  { src: 'password-1-elements.svg', inset: '6.15% 5.59% 10.51% 2.69%' },
];

const singleIllustrations = ['password-2.svg', 'password-3.svg', 'password-4.svg'];

const asStyle = (inset?: string) => (inset ? ({ inset } as CSSProperties) : undefined);

const AssetLabel = ({ children }: { children: string }) => (
  <Box backgroundColor="accent-02-basic" textColor="accent-02-subtle" padding="space-300">
    <span className={CODE_TEXT_CLASS}>{children}</span>
  </Box>
);

const AssetCaption = ({ children }: { children: string }) => (
  <Text elementType="span" textColor="secondary" UNSAFE_className={CODE_TEXT_CLASS}>
    {children}
  </Text>
);

const IconGroup = ({ name, glyphs }: { name: string; glyphs: Glyph[] }) => (
  <Flex direction="vertical" alignmentX="left" spacing="space-700">
    <AssetLabel>{name}</AssetLabel>
    <Box
      backgroundColor="tertiary"
      borderStyle="dashed"
      borderWidth="200"
      borderColor="accent-02-basic"
      borderRadius="300"
      paddingX="space-700"
      paddingY="space-800"
    >
      <Flex direction="vertical" spacing="space-500">
        {glyphs.map(({ src, size, inset, bleed }, index) => (
          <Box key={src} borderRadius="400" paddingX="space-600" paddingY="space-500" UNSAFE_className={styles.Tile}>
            <Flex alignmentY="center" spacing="space-600">
              <span className={styles.Glyph} style={{ width: size, height: size }}>
                <span className={styles.GlyphInset} style={asStyle(inset)}>
                  <span className={styles.GlyphBleed} style={asStyle(bleed)}>
                    <img src={`${ASSETS_PATH}/icons/${src}`} alt="" />
                  </span>
                </span>
              </span>
              <AssetCaption>{`brand 0${index + 1}`}</AssetCaption>
            </Flex>
          </Box>
        ))}
      </Flex>
    </Box>
  </Flex>
);

const IllustrationTile = ({ caption, children }: { caption: string; children: React.ReactNode }) => (
  <Box borderRadius="400" padding="space-600" UNSAFE_className={styles.Tile}>
    <Flex direction="vertical" alignmentX="center" spacing="space-700">
      <div className={styles.Illustration}>{children}</div>
      <AssetCaption>{caption}</AssetCaption>
    </Flex>
  </Box>
);

const CustomAssets = () => (
  <PageSection size="xlarge" hasTopLine backgroundColor="primary">
    <Box borderRadius="400" paddingX="space-800" paddingY="space-1200" UNSAFE_className={styles.CustomAssets}>
      <Flex direction="vertical" alignmentX="center" spacing="space-1200">
        <Flex direction="vertical" spacing="space-600" UNSAFE_className={styles.Intro}>
          <Heading elementType="h2" size="medium" textAlignment="center">
            Your own icons and illustrations
          </Heading>
          <Text textColor="secondary" textAlignment="center">
            Got your own set of icons or illustrations? Use it. We keep one consistent naming structure for
            illustrations and icons across all products, and ship everything as one bundle.
          </Text>
        </Flex>

        <Flex isWrapping alignmentX="center" alignmentY="stretch" spacing="space-800">
          <IconGroup name="icon-home" glyphs={homeIcons} />

          <Flex direction="vertical" alignmentX="left" spacing="space-700" UNSAFE_className={styles.IllustrationsGroup}>
            <AssetLabel>illustration-password</AssetLabel>
            <Box
              backgroundColor="tertiary"
              borderStyle="dashed"
              borderWidth="200"
              borderColor="accent-02-basic"
              borderRadius="300"
              paddingX="space-800"
              UNSAFE_className={styles.IllustrationsBox}
            >
              <Flex isWrapping alignmentX="center" alignmentY="center" spacing="space-0">
                <IllustrationTile caption="brand 01">
                  {layeredIllustration.map(({ src, inset }) => (
                    <span key={src} className={styles.IllustrationLayer} style={asStyle(inset)}>
                      <img className={styles.IllustrationImage} src={`${ASSETS_PATH}/illustrations/${src}`} alt="" />
                    </span>
                  ))}
                </IllustrationTile>
                {singleIllustrations.map((src, index) => (
                  <IllustrationTile key={src} caption={`brand 0${index + 2}`}>
                    <img className={styles.IllustrationImage} src={`${ASSETS_PATH}/illustrations/${src}`} alt="" />
                  </IllustrationTile>
                ))}
              </Flex>
            </Box>
          </Flex>

          <IconGroup name="icon-star-dualtone" glyphs={starIcons} />
        </Flex>
      </Flex>
    </Box>
  </PageSection>
);

export default CustomAssets;
