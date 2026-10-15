'use client';

import { Box, ToastProvider } from '@alma-oss/spirit-web-react';
import './NotificationsCard.scss';
import NotificationsSettings from './NotificationsSettings';
import NotificationToasts from './NotificationToasts';

// A tile with the panel sticking to its bottom edge. The toasts are shown inside of the panel, not at the screen edge.
const NotificationsCard = () => (
  <Box
    backgroundColor="secondary"
    borderColor="basic"
    borderWidth="100"
    borderRadius="500"
    paddingTop="space-1000"
    paddingX={{ mobile: 'space-700', tablet: 'space-1000' }}
    paddingBottom="space-0"
    UNSAFE_className="NotificationsCard"
  >
    <ToastProvider>
      <div className="NotificationsCard__panel">
        <NotificationsSettings />
        <NotificationToasts />
      </div>
    </ToastProvider>
  </Box>
);

export default NotificationsCard;
