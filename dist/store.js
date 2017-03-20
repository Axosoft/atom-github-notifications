'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = require('ramda');

var R = _interopRequireWildcard(_ramda);

var _redux = require('redux');

var _messages = require('./messages');

var _types = require('./types');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
  hasPromptedForToken: false,
  lastCheckTime: 0,
  notifications: []
};

function reducer(init, deserializedState) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _extends({}, init, deserializedState);
    var message = arguments[1];

    switch (message.type) {
      case _messages.NOTIFICATIONS_ADDED:
        return _extends({}, state, {
          lastCheckTime: message.lastCheckTime,
          notifications: R.uniqBy(function (_ref) {
            var id = _ref.id;
            return id;
          }, [].concat(_toConsumableArray(state.notifications), _toConsumableArray(message.notifications)))
        });
      case _messages.NOTIFICATIONS_DISPLAYED:
        return _extends({}, state, {
          notifications: R.reject(function (_ref2) {
            var id = _ref2.id;
            return R.contains(id, message.notificationIds);
          }, state.notifications)
        });
      case _messages.RESET_STATE:
        return init;
      case _messages.TOKEN_NOTIFICATION_SHOWN:
        return _extends({}, state, {
          hasPromptedForToken: true
        });
      default:
        return state;
    }
  };
}

function validateState(state) {
  return _extends({}, state, {
    lastCheckTime: state.lastCheckTime || 0
  });
}

// eslint-disable-next-line import/prefer-default-export
var createStore = exports.createStore = function createStore(previousState) {
  return (0, _redux.createStore)(reducer(_extends({}, initialState, validateState(previousState))));
};