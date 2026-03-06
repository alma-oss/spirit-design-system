import { Avatar, Container, Flex, Heading, Section, Text } from '../../../src/components';
import React from 'react';

export default {
  title: 'Examples/Layout Templates/Team',
  tags: ['!autodocs'],
  parameters: {
    controls: { disable: true },
  },
};

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    role: 'Software Developer',
    bio: 'Meet Alice, a dedicated software developer recognized for creating innovative software solutions. With a strong background in coding and a love for problem-solving, she thrives on turning ideas into real-world applications.',
    avatarUrl: 'https://picsum.photos/seed/alice-johnson/150/150',
  },
  {
    id: '2',
    name: 'Bob Smith',
    role: 'Product Manager',
    bio: 'Bob is an experienced product manager who excels at leading cross-functional teams. He is known for his strategic vision and ability to translate customer needs into actionable product features.',
    avatarUrl: 'https://picsum.photos/seed/bob-smith/150/150',
  },
  {
    id: '3',
    name: 'Charlie Brown',
    role: 'UX Designer',
    bio: 'Charlie is a talented UX designer passionate about creating intuitive user experiences. His expertise in user research and design thinking helps bridge the gap between users and technology.',
    avatarUrl: 'https://picsum.photos/seed/charlie-brown/150/150',
  },
  {
    id: '4',
    name: 'Dana Lee',
    role: 'Data Analyst',
    bio: 'Dana is a detail-oriented data analyst who specializes in transforming raw data into meaningful insights. Her analytical skills and proficiency in data visualization tools empower businesses to make informed decisions.',
    avatarUrl: 'https://picsum.photos/seed/dana-lee/150/150',
  },
  {
    id: '5',
    name: 'Michael Smith',
    role: 'UX Designer',
    bio: 'Michael is a passionate UX designer who specializes in creating intuitive user experiences. His design philosophy centers around user empathy and data-driven decisions, ensuring that every interface he crafts is not only beautiful but also functional.',
    avatarUrl: 'https://picsum.photos/seed/michael-smith/150/150',
  },
  {
    id: '6',
    name: 'Sarah Lee',
    role: 'Product Manager',
    bio: 'With a keen eye for detail and a strategic mindset, Sarah excels as a product manager. She bridges the gap between development and business teams, ensuring that products align with user needs and market demands.',
    avatarUrl: 'https://picsum.photos/seed/sarah-lee/150/150',
  },
  {
    id: '7',
    name: 'David Brown',
    role: 'Data Analyst',
    bio: 'David is an insightful data analyst who transforms raw data into actionable insights. His analytical skills allow organizations to make informed decisions, driving growth and efficiency through data storytelling.',
    avatarUrl: 'https://picsum.photos/seed/david-brown/150/150',
  },
  {
    id: '8',
    name: 'Emily Davis',
    role: 'Marketing Specialist',
    bio: 'A creative marketing specialist, Emily develops compelling campaigns that resonate with audiences. She combines her knowledge of market trends with innovative strategies to enhance brand visibility and engagement.',
    avatarUrl: 'https://picsum.photos/seed/emily-davis/150/150',
  },
];

const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <Flex direction="vertical" spacing="space-800" alignmentX="left" alignmentY="top">
    <Avatar size="xlarge" aria-label={member.name}>
      <img src={member.avatarUrl} alt={member.name} />
    </Avatar>
    <Flex direction="vertical" spacing="space-700" alignmentX="left" alignmentY="top">
      <Flex direction="vertical" spacing="space-300" alignmentX="left" alignmentY="top">
        <Text elementType="p" size="medium" emphasis="semibold">
          {member.name}
        </Text>
        <Text elementType="p" size="small">
          {member.role}
        </Text>
      </Flex>
      <Text elementType="p" size="small">
        {member.bio}
      </Text>
    </Flex>
  </Flex>
);

export const WithContent = () => {
  const firstRowMembers = teamMembers.slice(0, 4);
  const secondRowMembers = teamMembers.slice(4, 8);

  return (
    <Section size="xlarge">
      <Container size="xlarge">
        <Flex direction="vertical" spacing="space-1400" alignmentX="stretch" alignmentY="top">
          {/* Header Section */}
          <Flex
            direction="vertical"
            spacing="space-700"
            alignmentX="left"
            alignmentY="top"
            UNSAFE_style={{ maxWidth: '696px' }}
          >
            <Flex direction="vertical" spacing="space-900" alignmentX="left" alignmentY="top">
              <Heading elementType="h1" size="large">
                Spirit Design System
              </Heading>
              <Text elementType="p" size="large" textColor="secondary">
                Our mission is to develop a comprehensive design system that can swiftly adapt to any business or
                technological demands, thereby preventing the redundancy of steps when establishing new frontends.
              </Text>
            </Flex>
          </Flex>

          {/* Team Members Section */}
          <Flex direction="vertical" spacing="space-1000" alignmentX="stretch" alignmentY="top">
            {/* First Row */}
            <Flex direction="horizontal" spacing="space-1000" alignmentX="stretch" alignmentY="top">
              {firstRowMembers.map((member) => (
                <Flex
                  key={member.id}
                  direction="vertical"
                  spacing="space-800"
                  alignmentX="left"
                  alignmentY="top"
                  UNSAFE_style={{ flex: '1 0 0' }}
                >
                  <TeamMemberCard member={member} />
                </Flex>
              ))}
            </Flex>

            {/* Second Row */}
            <Flex direction="horizontal" spacing="space-1000" alignmentX="stretch" alignmentY="top">
              {secondRowMembers.map((member) => (
                <Flex
                  key={member.id}
                  direction="vertical"
                  spacing="space-800"
                  alignmentX="left"
                  alignmentY="top"
                  UNSAFE_style={{ flex: '1 0 0' }}
                >
                  <TeamMemberCard member={member} />
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
};
