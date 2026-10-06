'use client';

import {
  Box,
  Divider,
  Heading,
  Stack,
  Text,
  ToastProvider,
  Toggle,
  UncontrolledToast,
  useToast,
} from '@alma-oss/spirit-web-react';
import { useRef } from 'react';
import styles from './NotificationsCard.module.scss';

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

const Settings = () => {
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

// A tile with the card sticking to its bottom edge. The toasts are shown inside of the card, not at the screen edge.
const NotificationsCard = () => (
  <Box
    backgroundColor="secondary"
    borderColor="basic"
    borderWidth="100"
    borderRadius="500"
    paddingTop="space-1000"
    paddingX={{ mobile: 'space-700', tablet: 'space-1000' }}
    paddingBottom="space-0"
    UNSAFE_className={styles.Tile}
  >
    <ToastProvider>
      <div className={styles.Card}>
        <Settings />
        <div className={styles.Toasts}>
          <UncontrolledToast alignmentX="center" alignmentY="bottom" isCollapsible />
        </div>
      </div>
    </ToastProvider>
  </Box>
);

export default NotificationsCard;
