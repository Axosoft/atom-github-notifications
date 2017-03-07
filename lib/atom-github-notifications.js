'use babel';

import { CompositeDisposable } from 'atom';
import { promisifyAll } from 'bluebird';
import GitHubApi from 'github-xhr';
import * as R from 'ramda';
import { createStore } from 'redux';

import _config from './config';
import {
  NotificationSubjectTypes,
  SubjectTypeDisplayNames,
  SubjectTypeUrlString,
} from './constants';
import {
  NOTIFICATIONS_ADDED,
  NOTIFICATIONS_DISPLAYED,
  RESET_STATE,
  NotificationsAdded,
  NotificationsDisplayed,
  ResetState,
} from './messages';

const github = new GitHubApi({
  protocol: 'https',
  host: 'api.github.com',
});
promisifyAll(github.activity);
promisifyAll(github.issues);
promisifyAll(github.pullRequests);

const initialState = {
  lastCheckTime: 0,
  notifications: [],
};
let subscriptions = null;

let store = null;

export const config = _config;

function validateState(state) {
  return {
    ...state,
    lastCheckTime: state.lastCheckTime || 0,
  };
}

function getNotificationMessage(type) {
  const subjectDisplayName = SubjectTypeDisplayNames[type];
  return `You were mentioned in a ${subjectDisplayName}`;
}

function getNotificationDescription(title, body, subjectId, subjectUrl) {
  // GitHub sends down body with `{text}\r\n{more text}\r\n{yet more}` but when rendered using
  // atom's markdown generator, plain newlines not preceded by spaces are swallowed up. To fix this,
  // we replace \r\n's with just \n's and add in two spaces to before the \n to force it to render
  // newlines properly.
  //
  // EX:
  //    foo\r\nbar\r\nmore lines
  //          becomes
  //    foo  \nbar  \nmorelines
  const correctedNewlineBody = body
    ? `  \n${body.replace(/\r\n/g, '\n').replace(/(\S\S|\S\s|\s\S)\n/gm, '$1  \n')}`
    : '';
  return `[**${title}** #${subjectId}](${subjectUrl})${correctedNewlineBody}`;
}

function extractNotificationSubjectData(notification) {
  const commentId = notification.subject.latest_comment_url
    ? R.pathOr(null, ['1'], notification.subject.latest_comment_url.match(/.+\/comments\/(.+)/))
    : null;
  const subjectId = notification.subject.url.match(/.+\/(.+)/)[1];
  const subjectUrlType = SubjectTypeUrlString[notification.subject.type];
  const subjectUrl = `https://github.com/${notification.repository.full_name}/${subjectUrlType}/${subjectId}`;

  return {
    type: notification.subject.type,
    repo: notification.repository.name,
    owner: notification.repository.owner.login,
    commentId,
    subjectId,
    subjectUrl,
  };
}

function showNotification({ title, body, subjectId, subjectUrl, subjectType }) {
  atom.notifications.addInfo(getNotificationMessage(subjectType), {
    dismissable: true,
    description: getNotificationDescription(title, body, subjectId, subjectUrl),
  });
}

export function activate(previousState) {
  // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
  subscriptions = new CompositeDisposable();

  function reducer(state = { ...initialState, ...validateState(previousState) }, message) {
    switch (message.type) {
      case NOTIFICATIONS_ADDED:
        return {
          ...state,
          lastCheckTime: message.lastCheckTime,
          notifications: R.uniqBy(({ id }) => id, [
            ...state.notifications,
            ...message.notifications,
          ]),
        };
      case NOTIFICATIONS_DISPLAYED:
        return {
          ...state,
          notifications: R.reject(
            ({ id }) => R.contains(id, message.notificationIds),
            state.notifications,
          ),
        };
      case RESET_STATE:
        return initialState;
      default:
        return state;
    }
  }

  store = createStore(reducer);

  store.subscribe(() => {
    const { notifications } = store.getState();

    if (R.isEmpty(notifications)) {
      return;
    }

    let delay = 0;
    R.forEach(
      (notification) => {
        // The GitHub notification manager seems to swallow notifications that are triggered too
        // temporally close together. This simply makes sure to display notifications separated by
        // some time so too many at once don't flood the NotificationManager.
        setTimeout(
          () => {
            showNotification(notification);
          },
          delay,
        );
        delay += 750;
      },
      notifications,
    );

    store.dispatch(NotificationsDisplayed(R.map(({ id }) => id, notifications)));
  });

  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-github-notifications:fetch': () => this.fetch(),
      'atom-github-notifications:reset': () => this.reset(),
    }),
  );
}

export function deactivate() {
  subscriptions.dispose();
}

export function serialize() {
  return {
    ...store.getState(),
    lastCheckTime: 0,
  };
}

export function fetch() {
  const token = atom.config.get('atom-github-notifications.personalAccessToken');
  github.authenticate({
    type: 'oauth',
    token,
  });

  const newCheckTime = new Date();
  const lastCheckTime = store.getState().lastCheckTime;
  github.activity
    .getNotificationsAsync({
      since: new Date(lastCheckTime).toISOString(),
    })
    .then(([...notifications]) => Promise.all(
      R.map(
        (notification) => {
          const {
            type,
            commentId,
            subjectId,
            subjectUrl,
            owner,
            repo,
          } = extractNotificationSubjectData(notification);
          const notificationData = {
            title: notification.subject.title,
            subjectType: notification.subject.type,
            reason: notification.reason,
            commentId,
            subjectId,
            subjectUrl,
            id: notification.id,
          };

          switch (type) {
            case NotificationSubjectTypes.COMMIT:
              console.log('commit notification');
              return {};
            case NotificationSubjectTypes.ISSUE:
            case NotificationSubjectTypes.PULL_REQUEST:
              if (commentId) {
                return github.issues.getCommentAsync({ user: owner, repo, id: commentId }).then((
                  { body },
                ) => ({
                  ...notificationData,
                  body,
                }));
              }
              return notificationData;
            default:
              throw new Error(`Unhandled notification subject type: ${type}`);
          }
        },
        notifications,
      ),
    ))
    .then(notificationData =>
      store.dispatch(NotificationsAdded(notificationData, newCheckTime.valueOf())))
    .catch(err => console.error(err));
}

export function reset() {
  store.dispatch(ResetState());
}
