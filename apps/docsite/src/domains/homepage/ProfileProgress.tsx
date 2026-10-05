'use client';

import { Box, Checkbox, Divider, FieldGroup, ProgressBar, Radio, Stack } from '@alma-oss/spirit-web-react';
import { useState } from 'react';
import styles from './ProfileProgress.module.scss';

const TOTAL_STEPS = 4;

const contactOptions = [
  { id: 'freelancer', label: 'Freelancer' },
  { id: 'company', label: 'Company' },
  { id: 'agency', label: 'Agency' },
];

// Each group counts as a single step, no matter how many checkboxes are ticked.
const ProfileProgress = () => {
  const [contacts, setContacts] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<string>('public');

  const toggleContact = (id: string) =>
    setContacts((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  const completedSteps = (contacts.length > 0 ? 1 : 0) + (visibility ? 1 : 0);

  return (
    <Box
      backgroundColor="primary"
      borderColor="basic"
      borderWidth="100"
      borderRadius="500"
      padding={{ mobile: 'space-700', tablet: 'space-1000' }}
      UNSAFE_className={styles.Card}
    >
      <Stack spacing="space-800">
        <Stack spacing="space-700">
          <FieldGroup id="building-blocks-visibility" label="CV visibility" isRequired>
            <Stack spacing="space-500" UNSAFE_className={styles.Options}>
              <Radio
                id="building-blocks-visibility-public"
                name="buildingBlocksVisibility"
                label="Public"
                isChecked={visibility === 'public'}
                onChange={() => setVisibility('public')}
              />
              <Radio
                id="building-blocks-visibility-hidden"
                name="buildingBlocksVisibility"
                label="Hidden"
                helperText="Companies won’t contact you directly"
                isChecked={visibility === 'hidden'}
                onChange={() => setVisibility('hidden')}
              />
            </Stack>
          </FieldGroup>

          <Divider />

          <FieldGroup id="building-blocks-contact" label="Who can contact you?" isRequired>
            <Stack spacing="space-500" UNSAFE_className={styles.Options}>
              {contactOptions.map(({ id, label }) => (
                <Checkbox
                  key={id}
                  id={`building-blocks-contact-${id}`}
                  name="buildingBlocksContact"
                  label={label}
                  isChecked={contacts.includes(id)}
                  onChange={() => toggleContact(id)}
                />
              ))}
            </Stack>
          </FieldGroup>
        </Stack>

        <Divider />

        <ProgressBar
          aria-label="Profile completion"
          color="01"
          value={(completedSteps / TOTAL_STEPS) * 100}
          helperText={`${completedSteps} of ${TOTAL_STEPS} steps completed`}
        />
      </Stack>
    </Box>
  );
};

export default ProfileProgress;
