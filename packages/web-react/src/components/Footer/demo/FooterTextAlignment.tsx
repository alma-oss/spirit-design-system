import React, { type ChangeEvent, useState } from 'react';
import { TextAlignments } from '../../../constants';
import { type TextAlignmentDictionaryType } from '../../../types';
import { Box } from '../../Box';
import { Container } from '../../Container';
import { Grid } from '../../Grid';
import { Heading } from '../../Heading';
import { Radio } from '../../Radio';
import { Stack } from '../../Stack';
import Footer from '../Footer';
import FooterLinkFactory from './FooterLinkFactory';

const FooterTextAlignment = () => {
  const [textAlignment, setTextAlignment] = useState<TextAlignmentDictionaryType>(TextAlignments.LEFT);

  const handleTextAlignChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextAlignment(event.target.value as TextAlignmentDictionaryType);
  };

  return (
    <>
      <Container>
        <Box elementType="form" marginBottom="space-600">
          <Box elementType="fieldset" borderWidth="0">
            <legend>Please choose text alignment:</legend>
            <div className="my-500">
              <Radio
                id="footer-alignment-left"
                marginRight="space-600"
                label="Left"
                value="left"
                name="text-alignment"
                autoComplete="off"
                isChecked={textAlignment === TextAlignments.LEFT}
                onChange={handleTextAlignChange}
              />{' '}
              <Radio
                id="footer-alignment-center"
                marginRight="space-600"
                label="Center"
                value="center"
                name="text-alignment"
                autoComplete="off"
                isChecked={textAlignment === TextAlignments.CENTER}
                onChange={handleTextAlignChange}
              />{' '}
              <Radio
                id="footer-alignment-right"
                label="Right"
                value="right"
                name="text-alignment"
                autoComplete="off"
                isChecked={textAlignment === TextAlignments.RIGHT}
                onChange={handleTextAlignChange}
              />
            </div>
          </Box>
        </Box>
      </Container>

      <Footer textAlignment={textAlignment}>
        <Container>
          {/* Grid with navigation links */}
          <Grid cols={{ mobile: 1, tablet: 2, desktop: 6 }} spacing="space-1000">
            {/* Navigation links 1 */}
            <nav aria-labelledby="footer-navigation-text-alignment-section-1">
              <Heading
                id="footer-navigation-text-alignment-section-1"
                elementType="h3"
                size="xsmall"
                emphasis="semibold"
                marginBottom="space-700"
              >
                Section headline
              </Heading>
              <Stack elementType="ul" spacing="space-600" hasSpacing>
                <FooterLinkFactory items={3} label="Link" />
              </Stack>
            </nav>

            {/* Navigation links 2 */}
            <nav aria-labelledby="footer-navigation-text-alignment-section-2">
              <Heading
                id="footer-navigation-text-alignment-section-2"
                elementType="h3"
                size="xsmall"
                emphasis="semibold"
                marginBottom="space-700"
              >
                Section headline
              </Heading>
              <Stack elementType="ul" spacing="space-600" hasSpacing>
                <FooterLinkFactory items={4} label="Link" />
              </Stack>
            </nav>

            {/* Navigation links 3 */}
            <nav aria-labelledby="footer-navigation-text-alignment-section-3">
              <Heading
                id="footer-navigation-text-alignment-section-3"
                elementType="h3"
                size="xsmall"
                emphasis="semibold"
                marginBottom="space-700"
              >
                Section headline
              </Heading>
              <Stack elementType="ul" spacing="space-600" hasSpacing>
                <FooterLinkFactory items={6} label="Link" />
              </Stack>
            </nav>

            {/* Navigation links 4 */}
            <nav aria-labelledby="footer-navigation-text-alignment-section-4">
              <Heading
                id="footer-navigation-text-alignment-section-4"
                elementType="h3"
                size="xsmall"
                emphasis="semibold"
                marginBottom="space-700"
              >
                Section headline
              </Heading>
              <Stack elementType="ul" spacing="space-600" hasSpacing>
                <FooterLinkFactory items={3} label="Link" />
              </Stack>
            </nav>

            {/* Navigation links 5 */}
            <nav aria-labelledby="footer-navigation-text-alignment-section-5">
              <Heading
                id="footer-navigation-text-alignment-section-5"
                elementType="h3"
                size="xsmall"
                emphasis="semibold"
                marginBottom="space-700"
              >
                Section headline
              </Heading>
              <Stack elementType="ul" spacing="space-600" hasSpacing>
                <FooterLinkFactory items={3} label="Link" />
              </Stack>
            </nav>

            {/* Navigation links 6 */}
            <nav aria-labelledby="footer-navigation-text-alignment-section-6">
              <Heading
                id="footer-navigation-text-alignment-section-6"
                elementType="h3"
                size="xsmall"
                emphasis="semibold"
                marginBottom="space-700"
              >
                Section headline
              </Heading>
              <Stack elementType="ul" spacing="space-600" hasSpacing>
                <FooterLinkFactory items={4} label="Link" />
              </Stack>
            </nav>
          </Grid>
        </Container>
      </Footer>
    </>
  );
};

export default FooterTextAlignment;
