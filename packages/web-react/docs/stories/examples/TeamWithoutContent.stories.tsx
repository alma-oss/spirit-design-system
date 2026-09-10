import React from 'react';
import { Avatar, Container, Flex, Grid, Heading, Section, Text } from '../../../src/components';

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
  <Flex direction="vertical" spacing="space-800" alignmentX="center" alignmentY="top">
    <Avatar size="xlarge" aria-label={member.name}>
      <img src={member.avatarUrl} alt="" aria-hidden="true" />
    </Avatar>
    <Flex direction="vertical" spacing="space-300" alignmentX="center" alignmentY="top">
      <Text elementType="p" fontWeight="semibold" textAlignment="center" marginBottom="space-0">
        {member.name}
      </Text>
      <Text elementType="p" size="small" textColor="secondary" textAlignment="center">
        {member.role}
      </Text>
    </Flex>
  </Flex>
);

export const WithoutContent = () => (
  <Section size="xlarge" backgroundColor="primary" hasContainer={false}>
    <Flex direction="vertical" spacing="space-1400" alignmentX="stretch" alignmentY="top">
      {/* Centered header in narrow Container Medium */}
      <Container size="medium">
        <Flex direction="vertical" spacing="space-700" alignmentX="center" alignmentY="top">
          <Flex direction="vertical" spacing="space-900" alignmentX="center" alignmentY="top">
            <Heading elementType="h1" size="large" textAlignment="center" marginBottom="space-0">
              Spirit Design System
            </Heading>
            <Text elementType="p" size="large" textColor="secondary" textAlignment="center">
              Our mission is to develop a comprehensive design system that can swiftly adapt to any business or
              technological demands, thereby preventing the redundancy of steps when establishing new frontends.
            </Text>
          </Flex>
        </Flex>
      </Container>

      {/* Two rows of four members, laid out as one grid */}
      <Container>
        <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }} spacing="space-1000">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </Grid>
      </Container>
    </Flex>
  </Section>
);
