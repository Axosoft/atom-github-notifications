export type Notification = any;

export type NotificationId = string;

export type State = {|
  hasPromptedForToken: boolean,
  lastCheckTime: number,
  notifications: [Notification],
|};
