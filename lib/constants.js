'use babel';

export const CommentType = {
  COMMIT: 'commits',
  ISSUE: 'issue',
  PULL_REQUEST: 'pull',
};

export const NotificationSubjectTypes = {
  COMMIT: 'Commit',
  ISSUE: 'Issue',
  PULL_REQUEST: 'PullRequest',
};

export const NotificationReasonTypes = {
  ASSIGN: 'assign',
  AUTHOR: 'author',
  COMMENT: 'comment',
  INVITATION: 'invitation',
  MANUAL: 'manual',
  MENTION: 'mention',
  STATE_CHANGE: 'state_change',
  SUBSCRIBED: 'subscribed',
  TEAM_MENTION: 'team_mention',
};

export const SubjectTypeDisplayNames = {
  [NotificationSubjectTypes.COMMIT]: 'Commit',
  [NotificationSubjectTypes.ISSUE]: 'Issue',
  [NotificationSubjectTypes.PULL_REQUEST]: 'Pull Request',
};

export const SubjectTypeUrlString = {
  [NotificationSubjectTypes.COMMIT]: 'commit',
  [NotificationSubjectTypes.ISSUE]: 'issue',
  [NotificationSubjectTypes.PULL_REQUEST]: 'pull',
};

export const STORE_TIME_INTERVAL = 5000;
