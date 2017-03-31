'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _types.AUTH_REQ:
      return _extends({}, state, { authProcess: action.payload });
    case _types.AUTH_USER:
      return _extends({}, state, { authenticated: true, authProcess: 'User is authenticated successfully' });
    case _types.UNAUTH_USER:
      return _extends({}, state, { authenticated: false, authProcess: 'User signed out' });
    case _types.AUTH_ERROR:
      return _extends({}, state, { authError: action.payload, messages: '' });
    case _types.FETCH_MESSAGE:
      return _extends({}, state, { messages: action.payload, authError: {} });
    default:
      return state;
  }
};

var _types = require('../actions/types');

/**
* @prop {object} authError - The error obj for recording any error occured during authentication request.
* @prop {string} errorMessages - record the error message.
* @prop {string} webStatus - record the error message.
* @prop {string} messages - message which is sent from server to inform client.
* @prop {boolean} authenticated - recotd client authentication status.
* @prop {string} authProcess - indicate authrntication process: 1. SignUp Req, 2. Activation Req...etc
*/

var initialState = {
  authError: {
    errorMessages: '',
    webStatus: null
  },
  messages: '',
  authenticated: false,
  authProcess: ''
};