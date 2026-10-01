'use client';

import {
  Flex,
  Icon,
  InputAddon,
  Link,
  Section,
  Text,
  TextField,
  UNSTABLE_DisplayHeading,
} from '@alma-oss/spirit-web-react';
import NextLink from 'next/link';
import { routes } from '../routing/routes';
import styles from './Hero.module.scss';

const popularLinks = [
  { label: 'Button', href: routes.component('Button') },
  { label: 'Modal', href: routes.component('Modal') },
  { label: 'Theme tokens', href: `${routes.design}/theme-tokens` },
  { label: 'Migrations', href: routes.migrations },
  { label: 'Icons', href: routes.icons },
];

const Hero = () => (
  <Section
    size="medium"
    paddingBottom={{ mobile: 'space-0', tablet: 'space-0' }}
    containerProps={{ size: 'large' }}
    UNSAFE_className={styles.Hero}
  >
    <Flex direction="vertical" alignmentX="center" spacing="space-1100">
      <Flex direction="vertical" alignmentX="center" spacing="space-1000">
        <Flex alignmentX="center" alignmentY="center" spacing="space-700">
          <Text elementType="span" textColor="secondary">
            Meet
          </Text>
          <img src="/spirit-app-icon.svg" alt="" width={40} height={40} />
          <Text elementType="span" textColor="secondary">
            Spirit
          </Text>
        </Flex>

        <UNSTABLE_DisplayHeading elementType="h2" size="medium" textAlignment="center">
          One system
          <br />
          behind every <span className={styles.Highlight}>job portal.</span>
        </UNSTABLE_DisplayHeading>
      </Flex>

      <Flex direction="vertical" alignmentX="center" spacing="space-700" UNSAFE_className={styles.Search}>
        <form role="search" className={styles.SearchForm} onSubmit={(event) => event.preventDefault()}>
          <TextField
            id="docs-search"
            name="q"
            type="search"
            label="Search components, tokens and guides"
            isLabelHidden
            placeholder="Search components, tokens and guides"
            startAddon={
              <InputAddon elementType="label" htmlFor="docs-search">
                <Icon name="search" />
              </InputAddon>
            }
            endAddon={
              <InputAddon>
                <Icon name="placeholder" />
              </InputAddon>
            }
          />
        </form>

        <Flex isWrapping alignmentX="center" alignmentY="center" spacingX="space-700" spacingY="space-300">
          <Text elementType="span" textColor="secondary">
            Popular:
          </Text>
          <Flex isWrapping alignmentX="center" alignmentY="center" spacing="space-400">
            {popularLinks.map(({ label, href }, index) => (
              <Flex key={label} alignmentY="center" spacing="space-400">
                <Link elementType={NextLink} href={href} underlined="hover">
                  {label}
                </Link>
                {index < popularLinks.length - 1 && (
                  <Text elementType="span" textColor="secondary" aria-hidden="true">
                    ·
                  </Text>
                )}
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  </Section>
);

export default Hero;
