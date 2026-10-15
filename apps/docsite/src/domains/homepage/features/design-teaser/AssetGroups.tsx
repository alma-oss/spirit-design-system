import { Box, Flex, Grid } from '@alma-oss/spirit-web-react';
import './AssetGroups.scss';
import AssetLabel from './AssetLabel';
import IconGroup, { type Glyph } from './IconGroup';
import IllustrationTile, { type Illustration } from './IllustrationTile';

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

const illustrations: Illustration[] = [
  { animation: '/lottie/secure-password.json' },
  { src: 'password-2.svg' },
  { animation: '/lottie/safety-access.json' },
  { src: 'password-4.svg' },
];

// The three groups of the custom assets: home icons, password illustrations and star icons.
const AssetGroups = () => (
  <Flex isWrapping alignmentX="space-between" alignmentY="stretch" spacing="space-1000">
    <IconGroup name="icon-home" glyphs={homeIcons} />

    <Flex direction="vertical" alignmentX="left" spacing="space-700" UNSAFE_className="AssetGroups__illustrations">
      <AssetLabel>illustration-password</AssetLabel>
      <Box
        elementType={Grid}
        cols={1}
        alignmentX="center"
        alignmentY="center"
        backgroundColor="primary"
        borderStyle="dashed"
        borderWidth="200"
        borderColor="accent-02-basic"
        borderRadius="300"
        paddingX="space-800"
      >
        <Flex isWrapping alignmentX="center" alignmentY="center" spacing="space-700">
          {illustrations.map((illustration, index) => (
            <IllustrationTile
              key={illustration.src ?? illustration.animation}
              caption={`brand 0${index + 1}`}
              {...illustration}
            />
          ))}
        </Flex>
      </Box>
    </Flex>

    <IconGroup name="icon-star-dualtone" glyphs={starIcons} />
  </Flex>
);

export default AssetGroups;
