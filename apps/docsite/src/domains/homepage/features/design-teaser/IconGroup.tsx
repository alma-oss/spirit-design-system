import { Box, Flex } from '@alma-oss/spirit-web-react';
import { type CSSProperties } from 'react';
import AssetCaption from './AssetCaption';
import AssetLabel from './AssetLabel';
import { ASSETS_PATH } from './constants';

export interface Glyph {
  src: string;
  size: number;
  /** Position of the artwork inside the glyph box, as exported from the design. */
  inset?: string;
  /** Extra bleed of the artwork (strokes overflowing its frame), as exported from the design. */
  bleed?: string;
}

interface IconGroupProps {
  name: string;
  glyphs: Glyph[];
}

const asStyle = (inset?: string) => (inset ? ({ inset } as CSSProperties) : undefined);

const IconGroup = ({ name, glyphs }: IconGroupProps) => (
  <Flex direction="vertical" alignmentX="left" spacing="space-700">
    <AssetLabel>{name}</AssetLabel>
    <Box
      backgroundColor="primary"
      borderStyle="dashed"
      borderWidth="200"
      borderColor="accent-02-basic"
      borderRadius="300"
      padding="space-900"
    >
      <Flex direction="vertical" spacing="space-500">
        {glyphs.map(({ src, size, inset, bleed }, index) => (
          <Box
            key={src}
            borderRadius="400"
            paddingX="space-600"
            paddingY="space-500"
            UNSAFE_className="AssetGroups__tile"
          >
            <Flex alignmentY="center" spacing="space-600">
              <span className="AssetGroups__glyph" style={{ width: size, height: size }}>
                <span className="AssetGroups__inset" style={asStyle(inset)}>
                  <span className="AssetGroups__bleed" style={asStyle(bleed)}>
                    <img className="AssetGroups__image" src={`${ASSETS_PATH}/icons/${src}`} alt="" />
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

export default IconGroup;
