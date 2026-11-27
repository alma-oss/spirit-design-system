'use client';

import {
  type breakpoints,
  breakpointNames,
  type componentColors,
  componentButtonColorNames,
  cssVariablePrefix,
} from '@alma-oss/spirit-design-tokens';
import { Box, Button, Flex, Grid, Heading, Tag, Text } from '@alma-oss/spirit-web-react';
import { useEffect, useState } from 'react';

// Spirit's TS tokens give the names and types, the product's CSS gives the values
type BreakpointName = keyof typeof breakpoints;
type ButtonColorName = keyof typeof componentColors.button;

const readRootVariable = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(`--${cssVariablePrefix}${name}`).trim();

const useRootValues = <T extends string>(names: readonly T[], toVariableName: (name: T) => string) => {
  const [values, setValues] = useState<Partial<Record<T, string>>>({});

  useEffect(() => {
    setValues(
      Object.fromEntries(names.map((name) => [name, readRootVariable(toVariableName(name))])) as Record<T, string>,
    );
  }, [names, toVariableName]);

  return values;
};

const breakpointVariable = (name: BreakpointName) => `breakpoint-${name}`;
const buttonColorVariable = (name: ButtonColorName) => `color-component-button-${name}-state-default`;

const useCurrentBreakpoint = (values: Partial<Record<BreakpointName, string>>) => {
  const [current, setCurrent] = useState<BreakpointName>();

  useEffect(() => {
    const queries = breakpointNames
      .filter((name) => values[name])
      .map((name) => ({
        name,
        query: window.matchMedia(`(min-width: ${values[name] === '0' ? '0px' : values[name]})`),
      }));
    const update = () => setCurrent(queries.filter(({ query }) => query.matches).at(-1)?.name);

    update();
    queries.forEach(({ query }) => query.addEventListener('change', update));

    return () => queries.forEach(({ query }) => query.removeEventListener('change', update));
  }, [values]);

  return current;
};

const TokensFromCss = () => {
  const breakpointValues = useRootValues(breakpointNames, breakpointVariable);
  const buttonColorValues = useRootValues(componentButtonColorNames, buttonColorVariable);
  const currentBreakpoint = useCurrentBreakpoint(breakpointValues);

  return (
    <Box backgroundColor="secondary" padding="space-800" borderRadius="300" marginBottom="space-1000">
      <Flex direction="vertical" spacing="space-700">
        <Heading elementType="h2" size="small">
          Types from Spirit TS tokens, values from the product CSS
        </Heading>
        <Text>
          No alias of <code>@alma-oss/spirit-design-tokens</code>. Names and types come from Spirit, values are read
          from <code>:root</code>, where the product&apos;s SCSS overrides put them.
        </Text>
        <Flex alignmentY="center" spacing="space-500">
          <Text>Current breakpoint:</Text>
          <Tag color="success">{currentBreakpoint ?? '…'}</Tag>
        </Flex>
        <Grid cols={{ mobile: 1, tablet: 2 }}>
          <Flex direction="vertical" spacing="space-400">
            <Heading elementType="h3" size="xsmall">
              Breakpoints
            </Heading>
            {breakpointNames.map((name) => (
              <Text key={name}>
                <code>
                  --{cssVariablePrefix}
                  {breakpointVariable(name)}
                </code>
                : {breakpointValues[name] ?? '…'}
              </Text>
            ))}
          </Flex>
          <Flex direction="vertical" spacing="space-400">
            <Heading elementType="h3" size="xsmall">
              Button colors
            </Heading>
            {componentButtonColorNames.map((name) => (
              <Flex key={name} alignmentY="center" spacing="space-500">
                <Button color={name} size="small">
                  {name}
                </Button>
                <Text>{buttonColorValues[name] ?? '…'}</Text>
              </Flex>
            ))}
          </Flex>
        </Grid>
      </Flex>
    </Box>
  );
};

export default TokensFromCss;
