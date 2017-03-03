'use babel';

import { CompositeDisposable } from 'atom';
import GitHubApi from 'github-xhr';
import * as R from 'ramda';
import { createStore } from 'redux';

import _config from './config';
import {
  SubjectTypeDisplayNames,
} from './constants';
import {
  NOTIFICATIONS_ADDED,
  NOTIFICATIONS_DISPLAYED,
  NotificationsAdded,
  NotificationsDisplayed,
} from './messages';

const github = new GitHubApi({
  protocol: 'https',
  host: 'api.github.com',
});
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

function getNotificationTitle(notification) {
  const subjectDisplayName = SubjectTypeDisplayNames[notification.subject.type];
  return `You were mentioned in a ${subjectDisplayName}`;
}

function showNotification(notification) {
  atom.notifications.addInfo(
    getNotificationTitle(notification), {
      dismissable: true,
      description: notification.subject.title,
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
          notifications: R.uniqBy(
            ({ id }) => id,
            [
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

    R.forEach((notification) => {
      showNotification(notification);
    }, notifications);

    store.dispatch(NotificationsDisplayed(R.map(({ id }) => id, notifications)));
  });

  // Register command that toggles this view
  subscriptions.add(atom.commands.add('atom-workspace', {
    'atom-github-notifications:toggle': () => this.toggle(),
    'atom-github-notifications:fetch': () => this.fetch(),
  }));
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
  github.activity.getNotifications({
    since: new Date(lastCheckTime).toISOString(),
  }, (err, [...notifications]) => {
    if (err) {
      console.error(err);
      return;
    }

    store.dispatch(NotificationsAdded(notifications, newCheckTime.valueOf()));
  });
}

export function toggle() {
  const info = atom.notifications.addInfo('Here is a notification!', {
    buttons: [{
      text: 'A Button',
      onDidClick: () => { console.log('button clicked'); },
    }],
    dismissable: true,
    description: 'Here\'s a description',
    detail: 'Here\'s a detail',
  });
  console.log(info);
}
