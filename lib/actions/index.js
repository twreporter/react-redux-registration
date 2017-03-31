'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authError = authError;
exports.authReq = authReq;
exports.fetchMessages = fetchMessages;
exports.authUser = authUser;
exports.signoutUser = signoutUser;
exports.signupUser = signupUser;
exports.activateUser = activateUser;
exports.signinUser = signinUser;
exports.oAuthFacebook = oAuthFacebook;

var _reactRouter = require('react-router');

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _types = require('./types');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = {
  omit: _lodash.omit
};

var API_URL = 'http://testtest.twreporter.org:8080';
// const O_AUTH_API_URL = 'http://testtest.twreporter.org:8080'

function authError(_ref) {
  var status = _ref.status,
      message = _ref.message;

  return {
    type: _types.AUTH_ERROR,
    payload: { errorMessages: message, webStatus: status }
  };
}

function authReq(inProcess) {
  return {
    type: _types.AUTH_REQ,
    payload: inProcess
  };
}

function fetchMessages(message) {
  return {
    type: _types.FETCH_MESSAGE,
    payload: message
  };
}

function authUser() {
  return {
    type: _types.AUTH_USER
  };
}

function signoutUser() {
  var browserLocalStorage = typeof localStorage === 'undefined' ? null : localStorage;
  if (browserLocalStorage) {
    browserLocalStorage.removeItem('token');
    browserLocalStorage.removeItem('accountInfo');
  }
  return {
    type: _types.UNAUTH_USER
  };
}

function signupUser(_ref2) {
  var email = _ref2.email,
      password = _ref2.password;

  return function (dispatch) {
    dispatch(authReq('Sign Up Request'));
    _superagent2.default.post(API_URL + '/v1/signup').set('Content-Type', 'application/json').send({ email: email, password: password }).end(function (err, res) {
      if (err || !res.ok) {
        dispatch(authError(err));
      } else {
        dispatch(fetchMessages('You will receive an E-mail. Please check your mail box.'));
      }
    });
  };
}

function activateUser(_ref3, callback) {
  var email = _ref3.email,
      activeCode = _ref3.activeCode;

  return function (dispatch) {
    dispatch(authReq('Active Request'));
    _superagent2.default.get(API_URL + '/v1/activate?email=' + email + '&token=' + activeCode).end(function (err, res) {
      if (err || !res.ok) {
        dispatch(authError(err));
      } else {
        var webStatus = res.status;
        var parsedRes = JSON.parse(res.text);
        var browserLocalStorage = typeof localStorage === 'undefined' ? null : localStorage;
        if (browserLocalStorage) {
          browserLocalStorage.setItem('token', parsedRes.jwt);
          browserLocalStorage.setItem('accountInfo', JSON.stringify(_.omit(parsedRes, ['jwt'])));
        }
        dispatch(authUser());
        callback();
      }
    });
  };
}

function signinUser(_ref4, callback) {
  var email = _ref4.email,
      password = _ref4.password;

  return function (dispatch) {
    dispatch(authReq('Sign In Request'));
    _superagent2.default.post(API_URL + '/v1/login').set('Content-Type', 'application/json').send({ email: email, password: password }).end(function (err, res) {
      if (err || !res.ok) {
        dispatch(authError(err));
      } else {
        var webStatus = res.status;
        var parsedRes = JSON.parse(res.text);
        var browserLocalStorage = typeof localStorage === 'undefined' ? null : localStorage;
        // console.log(parsedRes)
        if (browserLocalStorage) {
          browserLocalStorage.setItem('token', parsedRes.jwt);
        }
        dispatch(authUser());
        callback();
      }
    });
  };
}

function oAuthFacebook() {
  return function (dispatch) {
    dispatch(authReq('Sign In O Auth Request'));
    _superagent2.default.get(API_URL + '/v1/auth/facebook').end(function (err, res) {
      if (err || !res.ok) {
        dispatch(authError(err));
      } else {
        var webStatus = res.status;
        var parsedRes = JSON.parse(res.text);
        var browserLocalStorage = typeof localStorage === 'undefined' ? null : localStorage;
        if (browserLocalStorage) {
          browserLocalStorage.setItem('token', parsedRes.jwt);
        }
      }
    });
  };
}