'use babel';

import { CompositeDisposable } from 'atom';
import { createStore } from 'redux';

import _config from './config';

const initialState = {
  lastCheckTime: new Date().valueOf(),
  notifications: [],
};
let subscriptions = null;

let store = null;

export const config = _config;

export function activate(previousState) {
  // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
  subscriptions = new CompositeDisposable();

  function reducer(state = { ...initialState, ...previousState }, message) {
    switch (message.type) {
      default:
        return state;
    }
  }

  store = createStore(reducer);

  // Register command that toggles this view
  subscriptions.add(atom.commands.add('atom-workspace', {
    'atom-github-notifications:toggle': () => this.toggle(),
  }));
}

export function deactivate() {
  subscriptions.dispose();
}

export function serialize() {
  return store.getState();
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
