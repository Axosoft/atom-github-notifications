'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var NOTIFICATIONS_ADDED = exports.NOTIFICATIONS_ADDED = 'NotificationsAdded';

var NotificationsAdded = exports.NotificationsAdded = function NotificationsAdded(notifications, lastCheckTime) {
  return {
    type: NOTIFICATIONS_ADDED,
    notifications: notifications,
    lastCheckTime: lastCheckTime
  };
};

var NOTIFICATIONS_DISPLAYED = exports.NOTIFICATIONS_DISPLAYED = 'NotificationsDisplayed';
var NotificationsDisplayed = exports.NotificationsDisplayed = function NotificationsDisplayed(notificationIds) {
  return {
    type: NOTIFICATIONS_DISPLAYED,
    notificationIds: notificationIds
  };
};

var RESET_STATE = exports.RESET_STATE = 'ResetState';
var ResetState = exports.ResetState = function ResetState() {
  return {
    type: RESET_STATE
  };
};

var TOKEN_NOTIFICATION_SHOWN = exports.TOKEN_NOTIFICATION_SHOWN = 'TokenNotificationShown';
var TokenNotificationShown = exports.TokenNotificationShown = function TokenNotificationShown() {
  return {
    type: TOKEN_NOTIFICATION_SHOWN
  };
};