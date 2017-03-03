export const NOTIFICATION_ADDED = 'NotificationAdded';
export const NotificationAdded = (notifications, time) => ({
  type: NOTIFICATION_ADDED,
  notifications,
  time,
});

export const NOTIFICATIONS_DISMISSED = 'NotificationsDismissed';
export const NotificationsDismissed = notificationIds => ({
  type: NOTIFICATIONS_DISMISSED,
  notificationIds,
});
