'use client';

import {
  Box,
  CloseButton,
  Flex,
  Heading,
  Icon,
  InputAddon,
  Stack,
  Tag,
  Text,
  TextField,
} from '@alma-oss/spirit-web-react';
import { type ChangeEvent, type KeyboardEvent, useState } from 'react';

interface TechTag {
  label: string;
  isAddedByUser: boolean;
}

const MAX_ADDED_TAGS = 3;

const initialTags: TechTag[] = ['Next.js', 'React', 'Docker'].map((label) => ({ label, isAddedByUser: false }));

// Words typed into the input become tags on Enter, up to three of them. Removing the last tag resets the tags.
const TechStackCard = () => {
  const [tags, setTags] = useState<TechTag[]>(initialTags);
  const [value, setValue] = useState('');

  const addedCount = tags.filter((tag) => tag.isAddedByUser).length;
  const isLimitReached = addedCount >= MAX_ADDED_TAGS;

  const addTag = () => {
    const label = value.trim();
    const isDuplicate = tags.some((tag) => tag.label.toLowerCase() === label.toLowerCase());

    if (label && !isDuplicate && !isLimitReached) {
      setTags([...tags, { label, isAddedByUser: true }]);
    }

    if (!isDuplicate) {
      setValue('');
    }
  };

  const removeTag = (label: string) => {
    const remaining = tags.filter((tag) => tag.label !== label);
    setTags(remaining.length > 0 ? remaining : initialTags);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag();
    }
  };

  return (
    <Box
      backgroundColor="primary"
      borderColor="basic"
      borderWidth="100"
      borderRadius="500"
      padding={{ mobile: 'space-700', tablet: 'space-1000' }}
    >
      <Stack spacing="space-900">
        <Stack spacing="space-500">
          <Heading elementType="h3" size="small">
            Tech stack
          </Heading>
          <Text textColor="secondary">Search for the tools &amp; services you have experience with.</Text>
        </Stack>

        <Stack spacing="space-700">
          <TextField
            id="building-blocks-tech-stack"
            name="buildingBlocksTechStack"
            label="Tech stack"
            isLabelHidden
            placeholder="e.g. Next.js, React"
            variant="fill"
            value={value}
            isDisabled={isLimitReached}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            startAddon={
              <InputAddon elementType="label" htmlFor="building-blocks-tech-stack">
                <Icon name="search" />
              </InputAddon>
            }
          />

          <Flex isWrapping alignmentY="center" spacing="space-400">
            {tags.map(({ label }) => (
              <Tag key={label} elementType="div" color="success" isSubtle>
                <span>{label}</span>
                <CloseButton size="xsmall" label={`Remove ${label}`} onClick={() => removeTag(label)} />
              </Tag>
            ))}
          </Flex>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TechStackCard;
