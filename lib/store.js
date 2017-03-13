// @flow

import * as R from 'ramda';
import { createStore as reduxCreateStore } from 'redux';

import {
  NOTIFICATIONS_ADDED,
  NOTIFICATIONS_DISPLAYED,
  RESET_STATE,
  TOKEN_NOTIFICATION_SHOWN,
} from './messages';
import { State } from './types';

const initialState = {
  hasPromptedForToken: false,
  lastCheckTime: 0,
  notifications: [],
};

function reducer(init, deserializedState) {
  return (state = { ...init, ...deserializedState }, message) => {
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
        return init;
      case TOKEN_NOTIFICATION_SHOWN:
        return {
          ...state,
          hasPromptedForToken: true,
        };
      default:
        return state;
    }
  };
}

function validateState(state) {
  return {
    ...state,
    lastCheckTime: state.lastCheckTime || 0,
  };
}

// eslint-disable-next-line import/prefer-default-export
export const createStore = (previousState: State) =>
  reduxCreateStore(reducer({ ...initialState, ...validateState(previousState) }));
