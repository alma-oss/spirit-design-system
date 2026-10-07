'use client';

import { Avatar, Divider, Flex, Grid, Heading, Stack, Text } from '@alma-oss/spirit-web-react';
import { Fragment } from 'react';
import styles from './FaqSection.module.scss';
import PageSection from './PageSection';
import SectionHeader from './SectionHeader';

interface Question {
  question: string;
  answer: string;
  author: string;
  /** The avatar of the author, the images are placeholders until there are photos of the authors. */
  avatar: string;
}

// The questions are laid out in rows of two, the last row has the question and the button for the community channel.
const rows: Question[][] = [
  [
    {
      question: 'Who can use Spirit?',
      answer:
        'Any team building an Alma Career product. The code is open source on GitHub, so anyone can explore how it’s built.',
      author: 'Tomáš',
      avatar: '/component-showcase/avatar-1.png',
    },
    {
      question: 'Does Spirit replace our product’s own design system?',
      answer:
        'No, it’s the layer underneath. Spirit is the shared core. Product systems like Jobs.cz or Seduo build on top of it with their own brand and product-specific components.',
      author: 'František, Product manager',
      avatar: '/component-showcase/avatar-2.png',
    },
  ],
  [
    {
      question: 'Can I detach a component and tweak it just for my product?',
      answer:
        'You can, but please don’t. A detached component stops getting updates and fixes. Tell us what you need instead. If it’s useful for you, it’s probably useful for others too.',
      author: 'Jiri, Lead UI designer',
      avatar: '/component-showcase/avatar-3.png',
    },
    {
      question: 'Is Spirit accessible?',
      answer:
        'Accessibility is built into the components: keyboard navigation, focus states and screen reader support. Color contrast depends on your theme, so check it whenever you change tokens.',
      author: 'Adam, Developer',
      avatar: '/component-showcase/avatar-1.png',
    },
  ],
  [
    {
      question: 'Something’s missing or broken. What now?',
      answer:
        'Open an issue on GitHub or ping us on Slack. Already fixed it yourself? Send a pull request, and every team gets the fix.',
      author: 'Katka, Developer',
      avatar: '/component-showcase/avatar-2.png',
    },
  ],
];

const QuestionBlock = ({ question, answer, author, avatar }: Question) => (
  <Stack spacing="space-700" UNSAFE_className={styles.Question}>
    <Heading elementType="h3" size="xsmall" marginBottom="space-0">
      {question}
    </Heading>
    <Stack spacing="space-1000">
      <Text textColor="secondary" marginBottom="space-0">
        {answer}
      </Text>
      <Flex alignmentY="center" spacing="space-600">
        <Avatar elementType="span" size="small" aria-label={author}>
          <img src={avatar} alt="" aria-hidden="true" />
        </Avatar>
        <Text textColor="secondary" marginBottom="space-0">
          {author}
        </Text>
      </Flex>
    </Stack>
  </Stack>
);

const FaqSection = () => (
  <PageSection size="xlarge" paddingBottom="small" hasTopLine backgroundColor="primary">
    <Stack spacing="space-1300">
      <SectionHeader
        eyebrow="SUPPORT"
        title="You are asking the right questions."
        description="Real questions we hear every week, answered by the people who build Spirit."
        descriptionSize="large"
        // The link to the community channel is not known yet.
        actionLabel="Join #spirit-design-system"
        actionHref="#"
        actionColor="tertiary"
      />

      <Stack spacing="space-1100">
        {rows.map((row, rowIndex) => (
          <Fragment key={row[0].question}>
            {rowIndex > 0 && <Divider />}
            <Grid cols={{ mobile: 1, tablet: 2 }} spacing="space-1000">
              {row.map((item) => (
                <QuestionBlock key={item.question} {...item} />
              ))}
            </Grid>
          </Fragment>
        ))}
      </Stack>
    </Stack>
  </PageSection>
);

export default FaqSection;
