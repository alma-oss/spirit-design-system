'use client';

import { ToastBar, ToastBarLink, ToastBarMessage, useToast } from '@alma-oss/spirit-web-react';

// Toast is fixed to the viewport and cannot be placed in the card. ToastBar is the bar itself, so the queue renders here.
const NotificationToasts = () => {
  const { hide, queue } = useToast();
  const visible = queue.filter((item) => item.isOpen && item.content);

  if (visible.length === 0) {
    return null;
  }

  return (
    <div className="NotificationsCard__toasts">
      {visible.map((item) => {
        const { color, iconName, id, content, hasIcon, isDismissible, linkProps } = item;

        return (
          <ToastBar
            key={id}
            id={id}
            color={color}
            hasIcon={hasIcon}
            iconName={iconName}
            isDismissible={isDismissible}
            onClose={() => hide(id)}
            isOpen
          >
            <ToastBarMessage>{content.message}</ToastBarMessage>
            {content.link && <ToastBarLink {...linkProps}>{content.link}</ToastBarLink>}
          </ToastBar>
        );
      })}
    </div>
  );
};

export default NotificationToasts;
