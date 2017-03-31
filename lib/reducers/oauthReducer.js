"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _types.OAUTH_USER:
      return _extends({}, state, { oAuthType: action.payload.oAuthType, token: action.payload.token, authenticated: true });
    case _types.DELETE_OTOKEN:
      return _extends({}, state, { token: '' });
    case _types.UNAUTH_USER:
      return _extends({}, state, { authenticated: false, oAuthType: "" });
    default:
      return state;
  }
};

var _types = require("../actions/types");

/**
 * @prop {object} authError - The error obj for recording any error occured during authentication request.
 * @prop {string} errorMessages - record the error message.
 * @prop {string} webStatus - record the error message.
 * @prop {string} type - the app has two types of OAuth login, which are google and facebook respectively
 * @prop {boolean} authenticated - recotd client authentication status.
 * @prop {string} token - token from oauth.
 */

var initialState = {
  authError: {
    errorMessages: "",
    webStatus: null
  },
  oAuthType: "",
  authenticated: false,
  token: ""
};