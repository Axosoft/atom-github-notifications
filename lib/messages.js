// @flow

import type { Notification, NotificationId } from './types';

export const NOTIFICATIONS_ADDED = 'NotificationsAdded';
export const NotificationsAdded = (notifications: [Notification], lastCheckTime: number) => ({
  type: NOTIFICATIONS_ADDED,
  notifications,
  lastCheckTime,
});

export const NOTIFICATIONS_DISPLAYED = 'NotificationsDisplayed';
export const NotificationsDisplayed = (notificationIds: [NotificationId]) => ({
  type: NOTIFICATIONS_DISPLAYED,
  notificationIds,
});

export const RESET_STATE = 'ResetState';
export const ResetState = () => ({
  type: RESET_STATE,
});

export const TOKEN_NOTIFICATION_SHOWN = 'TokenNotificationShown';
export const TokenNotificationShown = () => ({
  type: TOKEN_NOTIFICATION_SHOWN,
});
