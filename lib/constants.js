'use babel';

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
