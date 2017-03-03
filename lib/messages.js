'use babel';

export const NOTIFICATIONS_ADDED = 'NotificationsAdded';
export const NotificationsAdded = (notifications, lastCheckTime) => ({
  type: NOTIFICATIONS_ADDED,
  notifications,
  lastCheckTime,
});

export const NOTIFICATIONS_DISPLAYED = 'NotificationsDisplayed';
export const NotificationsDisplayed = notificationIds => ({
  type: NOTIFICATIONS_DISPLAYED,
  notificationIds,
});