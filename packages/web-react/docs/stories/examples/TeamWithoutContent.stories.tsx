import React from 'react';
import { Avatar, Container, Flex, Heading, Section, Text } from '../../../src/components';

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
  avatarUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    role: 'Software Developer',
    avatarUrl: 'https://picsum.photos/seed/alice-johnson/150/150',
  },
  {
    id: '2',
    name: 'Michael Smith',
    role: 'Data Analyst',
    avatarUrl: 'https://picsum.photos/seed/michael-smith/150/150',
  },
  {
    id: '3',
    name: 'Emma Brown',
    role: 'System Administrator',
    avatarUrl: 'https://picsum.photos/seed/emma-brown/150/150',
  },
  {
    id: '4',
    name: 'James Wilson',
    role: 'UX Designer',
    avatarUrl: 'https://picsum.photos/seed/james-wilson/150/150',
  },
  {
    id: '5',
    name: 'Olivia Davis',
    role: 'Network Engineer',
    avatarUrl: 'https://picsum.photos/seed/olivia-davis/150/150',
  },
  {
    id: '6',
    name: 'Liam Garcia',
    role: 'DevOps Engineer',
    avatarUrl: 'https://picsum.photos/seed/liam-garcia/150/150',
  },
  {
    id: '7',
    name: 'Sophia Martinez',
    role: 'Database Administrator',
    avatarUrl: 'https://picsum.photos/seed/sophia-martinez/150/150',
  },
  {
    id: '8',
    name: 'Noah Rodriguez',
    role: 'Cloud Architect',
    avatarUrl: 'https://picsum.photos/seed/noah-rodriguez/150/150',
  },
];

const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <Flex direction="vertical" spacing="space-800" alignmentX="center" alignmentY="top" UNSAFE_style={{ flex: '1 0 0' }}>
    <Avatar size="xlarge" aria-label={member.name}>
      <img src={member.avatarUrl} alt={member.name} />
    </Avatar>
    <Flex direction="vertical" spacing="space-300" alignmentX="center" alignmentY="top">
      <Text elementType="p" size="medium" emphasis="semibold" UNSAFE_style={{ textAlign: 'center' }}>
        {member.name}
      </Text>
      <Text elementType="p" size="small" UNSAFE_style={{ textAlign: 'center' }}>
        {member.role}
      </Text>
    </Flex>
  </Flex>
);

export const WithoutContent = () => {
  const firstRowMembers = teamMembers.slice(0, 4);
  const secondRowMembers = teamMembers.slice(4, 8);

  return (
    <Section size="xlarge" hasContainer={false}>
      <Flex direction="vertical" spacing="space-1400" alignmentX="stretch" alignmentY="top">
        {/* Centered header in narrow Container Medium */}
        <Container size="medium">
          <Flex direction="vertical" spacing="space-900" alignmentX="center" alignmentY="top">
            <Heading elementType="h1" size="large" UNSAFE_style={{ textAlign: 'center' }}>
              Spirit Design System
            </Heading>
            <Text elementType="p" size="large" textColor="secondary" UNSAFE_style={{ textAlign: 'center' }}>
              Our mission is to develop a comprehensive design system that can swiftly adapt to any business or
              technological demands, thereby preventing the redundancy of steps when establishing new frontends.
            </Text>
          </Flex>
        </Container>

        {/* Team grid in full-width Container XLarge */}
        <Container size="xlarge">
          <Flex direction="vertical" spacing="space-1000" alignmentX="stretch" alignmentY="top">
            {/* First Row */}
            <Flex direction="horizontal" spacing="space-1000" alignmentX="stretch" alignmentY="top">
              {firstRowMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </Flex>

            {/* Second Row */}
            <Flex direction="horizontal" spacing="space-1000" alignmentX="stretch" alignmentY="top">
              {secondRowMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </Section>
  );
};
