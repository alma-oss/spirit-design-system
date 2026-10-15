'use client';

import { Divider, Heading, Stack, Text, Toggle, useToast } from '@alma-oss/spirit-web-react';
import { useRef } from 'react';

const settings = [
  {
    id: 'notifications-every-reply',
    label: 'Every reply to a job ad',
    description: 'We send a summary of all replies once a day to your email.',
    isChecked: true,
  },
  { id: 'notifications-rejection', label: 'Candidate rejection', isChecked: false },
  { id: 'notifications-reviews', label: 'Reviews of your company', isChecked: false },
];

const NotificationsSettings = () => {
  const { show } = useToast();
  const toastCount = useRef(0);

  // Every change of a setting shows a toast. The toasts stack when the settings are toggled repeatedly.
  const showToast = () => {
    toastCount.current += 1;
    show({ message: 'Settings updated' }, `notifications-toast-${toastCount.current}`, {
      color: 'success',
      isDismissible: true,
      enableAutoClose: true,
      linkProps: {},
    });
  };

  return (
    <Stack spacing="space-1100">
      <Stack spacing="space-500">
        <Heading elementType="h3" size="small" marginBottom="space-0">
          Notifications
        </Heading>
        <Text textColor="secondary" marginBottom="space-0">
          Let us know what you care about.
        </Text>
      </Stack>

      <Stack spacing="space-600">
        {settings.map(({ id, label, description, isChecked }, index) => (
          <Stack key={id} spacing="space-600">
            {index > 0 && <Divider />}
            <Toggle
              id={id}
              label={label}
              helperText={description}
              isChecked={isChecked}
              hasIndicators
              onChange={showToast}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default NotificationsSettings;
