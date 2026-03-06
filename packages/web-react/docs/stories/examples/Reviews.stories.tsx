import { ActionGroup, Box, Button, Flex, Heading, Icon, Section, Tag, Text } from '../../../src/components';
import React from 'react';

export default {
  title: 'Examples/Layout Templates/Reviews',
  tags: ['!autodocs'],
  parameters: {
    controls: { disable: true },
  },
};

interface ReviewData {
  id: string;
  positive: string;
  negative: string;
  employerResponse?: string;
  quoteDepartment: string;
  quoteReviewDate: string;
}

const reviews: ReviewData[] = [
  {
    id: '1',
    positive:
      'The employer strives to make the most of modern tools and adapt working conditions. To automate work and improve processes. The employee has the opportunity to express their opinion.',
    negative:
      'This is a typical corporate environment with longer approval processes. The mutual collaboration between departments is much better than in the past, but there is still room for improvement.',
    employerResponse:
      "We're sorry to hear about your experience. We strongly support open communication and constructive feedback delivered respectfully. If you feel uncomfortable sharing your concerns directly with your manager, there are other channels available — such as reaching out to our HR department or to the next level of management.",
    quoteDepartment: 'IT/software development department',
    quoteReviewDate: 'January 2025',
  },
  {
    id: '2',
    positive:
      'The employer encourages innovative thinking and supports continuous learning. Employees are invited to participate in workshops and training sessions tailored to their professional growth.',
    negative:
      'The company culture promotes transparency and openness, allowing for constructive feedback. Team members feel valued and empowered to share their ideas freely, fostering a sense of belonging.',
    quoteDepartment: 'IT/software development department',
    quoteReviewDate: 'January 2025',
  },
  {
    id: '3',
    positive:
      'The employer prioritizes employee well-being and mental health, offering resources such as counseling services and wellness programs. Staff members are encouraged to take regular breaks to recharge and maintain productivity.',
    negative:
      'The workplace is characterized by a strong sense of community, with regular team-building activities that enhance relationships and collaboration among employees. Communication across all levels is open and respectful.',
    quoteDepartment: 'IT/software development department',
    quoteReviewDate: 'January 2025',
  },
];

const Testimonial = ({ review }: { review: ReviewData }) => (
  <Box paddingTop="space-1100" paddingBottom="space-1100" UNSAFE_style={{ borderTop: '1px solid var(--themed/border/basic, #d9d9d9)' }}>
    <Flex direction="vertical" spacing="space-1000" alignmentX="stretch" alignmentY="top">
      {/* Review section */}
      <Flex direction="vertical" spacing="space-800" alignmentX="stretch" alignmentY="top">
        {/* Positive */}
        <Box backgroundColor="accent-02-subtle" borderRadius="400" padding="space-800">
          <Flex spacing="space-700" alignmentY="top">
            <Icon name="add" />
            <Text elementType="p" size="large">
              {review.positive}
            </Text>
          </Flex>
        </Box>

        {/* Negative */}
        <Box backgroundColor="secondary" borderRadius="400" padding="space-800">
          <Flex spacing="space-700" alignmentY="top">
            <Icon name="add" />
            <Text elementType="p" size="large">
              {review.negative}
            </Text>
          </Flex>
        </Box>

        {/* Employer response */}
        {review.employerResponse && (
          <Box
            backgroundColor="primary"
            borderColor="basic"
            borderWidth="100"
            borderStyle="solid"
            borderRadius="400"
            padding="space-800"
          >
            <Flex direction="vertical" spacing="space-500" alignmentX="stretch" alignmentY="top">
              <Text elementType="p" size="small" textColor="secondary">
                Employer&apos;s response
              </Text>
              <Text elementType="p" size="large">
                {review.employerResponse}
              </Text>
            </Flex>
          </Box>
        )}
      </Flex>

      {/* Quote section */}
      <Flex direction="vertical" spacing="space-900" alignmentX="stretch" alignmentY="top">
        <Text elementType="p" size="small">
          {'At the time of the review, the '}
          <strong>{`employee was working in the ${review.quoteDepartment} and had been with the company for more than five years`}</strong>
          {'. The review was written in '}
          <strong>{review.quoteReviewDate}</strong>.
        </Text>
        <Flex spacing="space-700" alignmentY="center">
          <Text elementType="p" size="small" textColor="secondary">
            Was this comment helpful?
          </Text>
          <ActionGroup>
            <Button color="secondary" size="small">
              Yes
            </Button>
            <Button color="secondary" size="small">
              No
            </Button>
          </ActionGroup>
        </Flex>
      </Flex>
    </Flex>
  </Box>
);

export const Review = () => (
  <Section size="xlarge" containerProps={{ size: 'large' }}>
    <Flex direction="vertical" spacing="space-1300" alignmentX="stretch" alignmentY="top">
      {/* Centered heading in max-width 800px */}
      <Flex
        direction="vertical"
        spacing="space-700"
        alignmentX="center"
        alignmentY="top"
        UNSAFE_style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}
      >
        <Tag isSubtle size="small">
          Small Tag
        </Tag>
        <Flex direction="vertical" spacing="space-900" alignmentX="center" alignmentY="top">
          <Heading elementType="h2" size="large" UNSAFE_style={{ textAlign: 'center' }}>
            What our users are saying
          </Heading>
          <Text elementType="p" size="large" textColor="secondary" UNSAFE_style={{ textAlign: 'center' }}>
            Our mission is to develop a comprehensive design system that can swiftly adapt to any business or
            technological demands, thereby preventing the redundancy of steps when establishing new frontends.
          </Text>
        </Flex>
      </Flex>

      {/* Reviews list */}
      <Flex direction="vertical" alignmentX="stretch" alignmentY="top">
        {reviews.map((review) => (
          <Testimonial key={review.id} review={review} />
        ))}
      </Flex>
    </Flex>
  </Section>
);
