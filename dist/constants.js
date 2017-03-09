'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SubjectTypeDisplayNa, _SubjectTypeUrlString;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CommentType = exports.CommentType = {
  COMMIT: 'commits',
  ISSUES: 'issues',
  PULL_REQUEST: 'pull'
};

var NotificationSubjectTypes = exports.NotificationSubjectTypes = {
  COMMIT: 'Commit',
  ISSUE: 'Issue',
  PULL_REQUEST: 'PullRequest'
};

var NotificationReasonTypes = exports.NotificationReasonTypes = {
  ASSIGN: 'assign',
  AUTHOR: 'author',
  COMMENT: 'comment',
  INVITATION: 'invitation',
  MANUAL: 'manual',
  MENTION: 'mention',
  STATE_CHANGE: 'state_change',
  SUBSCRIBED: 'subscribed',
  TEAM_MENTION: 'team_mention'
};

var SubjectTypeDisplayNames = exports.SubjectTypeDisplayNames = (_SubjectTypeDisplayNa = {}, _defineProperty(_SubjectTypeDisplayNa, NotificationSubjectTypes.COMMIT, 'Commit'), _defineProperty(_SubjectTypeDisplayNa, NotificationSubjectTypes.ISSUE, 'Issue'), _defineProperty(_SubjectTypeDisplayNa, NotificationSubjectTypes.PULL_REQUEST, 'Pull Request'), _SubjectTypeDisplayNa);

var SubjectTypeUrlString = exports.SubjectTypeUrlString = (_SubjectTypeUrlString = {}, _defineProperty(_SubjectTypeUrlString, NotificationSubjectTypes.COMMIT, 'commit'), _defineProperty(_SubjectTypeUrlString, NotificationSubjectTypes.ISSUE, 'issues'), _defineProperty(_SubjectTypeUrlString, NotificationSubjectTypes.PULL_REQUEST, 'pull'), _SubjectTypeUrlString);

var STORE_TIME_INTERVAL = exports.STORE_TIME_INTERVAL = 5000;