'use client';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardMedia,
  CardTitle,
  Checkbox,
  CloseButton,
  File,
  FileImagePreview,
  FileUpload,
  Flex,
  Grid,
  Heading,
  Hidden,
  Icon,
  IconBox,
  InputAddon,
  Item,
  Label,
  Link,
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationLinkNext,
  PaginationLinkPrevious,
  Pill,
  ProgressBar,
  Radio,
  Select,
  Stack,
  Tag,
  Text,
  TextField,
  Toggle,
  VisuallyHidden,
} from '@alma-oss/spirit-web-react';
import { type CSSProperties, useEffect, useState } from 'react';
import styles from './ComponentShowcase.module.scss';
import PageSection from './PageSection';

const panelProps = {
  backgroundColor: 'primary',
  borderColor: 'basic',
  borderWidth: '100',
  borderRadius: '300',
  UNSAFE_className: styles.Panel,
} as const;

const stats = [
  { value: 6, suffix: '+', label: 'products and brands' },
  { value: 70, suffix: '+', label: 'battle-tested components' },
  { value: 500, suffix: '+', label: 'icons and illustrations' },
  { value: 5, suffix: '', label: 'years in production' },
];

const ComponentShowcase = () => {
  // ProgressBar animates value changes, so the bars start empty and fill up once mounted.
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <PageSection size="xlarge" hasTopLine className={styles.ComponentShowcase}>
      <Stack spacing="space-1300">
        <Hidden on={['mobile', 'tablet']}>
          <Flex isWrapping alignmentX="center" alignmentY="top" spacing="space-900">
            <Flex direction="vertical" spacing="space-900" UNSAFE_className={styles.Column}>
              <Pagination>
                <PaginationItem>
                  <PaginationLinkPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" accessibilityLabel="Go to Page 1" pageNumber={1} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isCurrent accessibilityLabel="Current Page, Page 2" pageNumber={2} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" accessibilityLabel="Go to Page 3" pageNumber={3} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" accessibilityLabel="Go to Page 4" pageNumber={4} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" accessibilityLabel="Go to Page 5" pageNumber={5} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLinkNext href="#" />
                </PaginationItem>
              </Pagination>

              <Box {...panelProps} padding="space-700">
                <Stack spacing="space-500">
                  <Radio
                    id="component-showcase-radio-period"
                    name="componentShowcaseRadioPeriod"
                    label="Last 24 hours"
                  />
                  <Checkbox
                    id="component-showcase-checkbox-language"
                    name="componentShowcaseCheckboxLanguage"
                    label="English"
                    helperText="Search job offers without specific language"
                    defaultChecked
                  />
                </Stack>
              </Box>

              <Flex isWrapping alignmentX="right" alignmentY="center" spacingX="space-700" spacingY="space-600">
                <Tag color="informative">New</Tag>
                <Tag elementType="div">
                  <span>Animation</span>
                  <CloseButton size="xsmall" label="Remove Animation" />
                </Tag>
                <Tag color="success">Published</Tag>
                <Tag color="warning" isSubtle>
                  Hidden
                </Tag>
                <Tag elementType="div" color="warning">
                  <span>Claude Code</span>
                  <CloseButton size="xsmall" label="Remove Claude Code" />
                </Tag>
              </Flex>

              <Flex alignmentX="right" alignmentY="center" spacing="space-800">
                <Button isSymmetrical size="small" aria-label="Folder">
                  <Icon name="placeholder" />
                </Button>
                <Button isSymmetrical color="secondary" size="small" aria-label="Upload">
                  <Icon name="upload" />
                </Button>
                <Button isSymmetrical color="tertiary" size="small" aria-label="Profile">
                  <Icon name="profile" />
                </Button>
                <Button isSymmetrical color="danger" size="small" aria-label="Hide">
                  <Icon name="visibility-off" />
                </Button>
              </Flex>

              <Flex alignmentX="right" alignmentY="center" spacing="space-800">
                <Radio
                  id="component-showcase-radio-1"
                  name="componentShowcaseRadioSingle"
                  label="Radio"
                  isLabelHidden
                />
                <Radio
                  id="component-showcase-radio-2"
                  name="componentShowcaseRadioSingle"
                  label="Selected radio"
                  isLabelHidden
                  defaultChecked
                />
                <Radio
                  id="component-showcase-radio-3"
                  name="componentShowcaseRadioSingle"
                  label="Radio with error"
                  isLabelHidden
                  validationState="danger"
                />
                <Checkbox
                  id="component-showcase-checkbox-1"
                  name="componentShowcaseCheckbox1"
                  label="Checkbox"
                  isLabelHidden
                />
                <Checkbox
                  id="component-showcase-checkbox-2"
                  name="componentShowcaseCheckbox2"
                  label="Selected checkbox"
                  isLabelHidden
                  defaultChecked
                />
              </Flex>

              <Flex alignmentX="right" alignmentY="center" spacing="space-800">
                <Toggle id="component-showcase-toggle-1" label="Toggle" isLabelHidden hasIndicators />
                <Toggle
                  id="component-showcase-toggle-2"
                  label="Selected toggle"
                  isLabelHidden
                  hasIndicators
                  isChecked
                />
                <Toggle
                  id="component-showcase-toggle-3"
                  label="Another selected toggle"
                  isLabelHidden
                  hasIndicators
                  isChecked
                />
              </Flex>

              <Flex alignmentX="right" alignmentY="center" spacing="space-800">
                <Pill color="neutral">3</Pill>
                <Pill color="success">99</Pill>
                <Pill>+1</Pill>
              </Flex>
            </Flex>

            <Flex direction="vertical" spacing="space-900" UNSAFE_className={styles.Column}>
              <Box {...panelProps} padding="space-700">
                <Stack spacing="space-700">
                  <ProgressBar aria-label="Progress" color="01" value={isLoaded ? 32 : 0} />
                  <ProgressBar
                    aria-label="Progress"
                    color="01"
                    value={isLoaded ? 20 : 0}
                    valueLabel="20%"
                    valuePlacement="right"
                  />
                  <ProgressBar
                    aria-label="Awards"
                    color="01"
                    value={20}
                    valueLabel="4 out of 20 awards"
                    valuePlacement="bottom"
                  />
                </Stack>
              </Box>

              <Select
                id="component-showcase-select-salary"
                name="componentShowcaseSelectSalary"
                label="Salary"
                isLabelHidden
              >
                <option value="">Salary</option>
              </Select>

              <TextField
                id="component-showcase-password"
                name="componentShowcasePassword"
                label="Password"
                placeholder="Password"
                defaultValue="Spirit123"
                helperText="Helper text"
                hasPasswordToggle
                isRequired
                startAddon={
                  <InputAddon elementType="label" htmlFor="component-showcase-password">
                    <Icon name="lock" />
                  </InputAddon>
                }
              />

              <Box {...panelProps} padding="space-700">
                <Stack spacing="space-300">
                  <Item elementType="button">
                    <Label>My account</Label>
                  </Item>
                  <Item
                    elementType="button"
                    isSelected
                    startSlot={<Icon name="placeholder" />}
                    endSlot={<Icon name="check-plain" color="selected" />}
                  >
                    <Label>My CV</Label>
                  </Item>
                  <Item elementType="button" startSlot={<Icon name="placeholder" />}>
                    <Label>Settings</Label>
                  </Item>
                  <Item elementType="button" startSlot={<Icon name="placeholder" />}>
                    <Label>Settings</Label>
                  </Item>
                </Stack>
              </Box>
            </Flex>

            <Flex direction="vertical" spacing="space-900" UNSAFE_className={styles.Column}>
              <Flex alignmentY="center" alignmentX="space-between">
                <Avatar size="large" aria-label="John Doe">
                  <Icon name="profile" />
                </Avatar>
                <Avatar isSquare size="large" aria-label="John Doe">
                  <span aria-hidden="true">JB</span>
                </Avatar>
                <Avatar size="large" aria-label="John Doe">
                  <img src="/component-showcase/avatar-1.png" alt="" aria-hidden="true" />
                </Avatar>
                <Avatar size="large" aria-label="John Doe">
                  <img src="/component-showcase/avatar-2.png" alt="" aria-hidden="true" />
                </Avatar>
                <Avatar isSquare size="large" aria-label="John Doe">
                  <img src="/component-showcase/avatar-3.png" alt="" aria-hidden="true" />
                </Avatar>
              </Flex>

              <Box {...panelProps} paddingX="space-800" paddingY="space-900">
                <Flex elementType="ul" direction="vertical" spacing="space-600" aria-label="Uploaded files">
                  <File
                    label="Profile Photo"
                    helperText="8,5 kB"
                    previewSlot={
                      <FileImagePreview
                        imagePreview="/component-showcase/profile-photo.jpg"
                        label="Preview of Profile Photo"
                      />
                    }
                    onChange={() => {}}
                    onDismiss={() => {}}
                    removeText="Remove Profile Photo"
                    editText="Edit Profile Photo"
                  />
                  <File
                    label="My CV.doc"
                    helperText={
                      <span>
                        <Icon name="spinner" boxSize={16} UNSAFE_className="animation-spin-clockwise" />{' '}
                        <span>Uploading your file…</span>
                      </span>
                    }
                    onDismiss={() => {}}
                    removeText="Remove My CV.doc"
                  />
                </Flex>
              </Box>

              <FileUpload
                id="component-showcase-file-upload"
                name="componentShowcaseFileUpload"
                label="Upload your CV"
                isLabelHidden
                inputUploadText="Upload your CV"
                helperText="Max file size is 10MB"
                buttonText="Browse"
                isCompact
              />

              <Card direction="horizontal" alignmentY="center">
                <CardMedia size="small">
                  <img src="/component-showcase/article.jpg" alt="" />
                </CardMedia>
                <CardBody>
                  <Stack spacing="space-400">
                    <CardTitle>How to write a resume?</CardTitle>
                    <Link href="#">Read more</Link>
                  </Stack>
                </CardBody>
              </Card>

              <Flex isWrapping alignmentY="top" spacing="space-800">
                <IconBox iconName="placeholder" color="01" shape="circle" size="xlarge" />
                <IconBox iconName="placeholder" color="02" shape="circle" size="large" />
                <IconBox iconName="file" color="success" shape="circle" />
                <IconBox iconName="file" color="informative" shape="circle" size="small" />
                <IconBox iconName="file" color="danger" shape="circle" size="xsmall" />
              </Flex>
            </Flex>

            <Flex direction="vertical" alignmentX="left" spacing="space-900" UNSAFE_className={styles.ButtonColumn}>
              <Button>
                <Icon name="placeholder" />
                Label
              </Button>
              <Button color="secondary">Label</Button>
              <Button color="tertiary">Label</Button>
              <Button isDisabled>Label</Button>
              <Button isSymmetrical color="plain" aria-label="Placeholder">
                <Icon name="placeholder" />
              </Button>
            </Flex>
          </Flex>
        </Hidden>

        <Grid cols={{ mobile: 2, tablet: 4 }}>
          {stats.map(({ value, suffix, label }) => (
            <Stack key={label} spacing="space-500">
              <Heading elementType="p" size="medium" textAlignment="center">
                <VisuallyHidden>{`${value}${suffix}`}</VisuallyHidden>
                <span aria-hidden="true">
                  <span className={styles.StatValue} style={{ '--stat-target': value } as CSSProperties} />
                  {suffix}
                </span>
              </Heading>
              <Text textColor="secondary" textAlignment="center">
                {label}
              </Text>
            </Stack>
          ))}
        </Grid>
      </Stack>
    </PageSection>
  );
};

export default ComponentShowcase;
