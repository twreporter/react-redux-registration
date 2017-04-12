import request from 'superagent'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE, AUTH_REQ } from './types'
import { omit } from 'lodash'
import { messagesSet } from './constants'
import { setupToken, removeToken } from '../utils/tokenManager'

const _ = {
  omit
}

export function authError({status, message}) {
  return {
    type: AUTH_ERROR,
    payload: { errorMessages: message, webStatus: status }
  }
}

export function authReq(inProcess) {
  return {
    type: AUTH_REQ,
    payload: inProcess
  }
}

export function fetchMessages(message) {
  return {
    type: FETCH_MESSAGE,
    payload: message
  }
}

export function authUser() {
  return {
    type: AUTH_USER,
    payload: messagesSet.authProcess.authUser
  }
}

export function signOutUser() {
  removeToken(['token', 'accountInfo', 'setupTime'])
  return {
    type: UNAUTH_USER,
    payload: messagesSet.authProcess.unauthUser
  }
}


export function signUpUser(email, password, apiUrl, signUpPath) {
  return function(dispatch) {
    dispatch(authReq(messagesSet.authProcess.signUpReq))
    return request.post(`${apiUrl}${signUpPath}`)
      .set('Content-Type', 'application/json')
      .send({ email, password })
      .then((success) => {
        dispatch(fetchMessages(messagesSet.app.afterSignUp))
      }, (failure) => {
        dispatch(authError(failure))
      })
  }
}

export function activateUser(email, activeCode, apiUrl, activationPath) {
  return function(dispatch) {
    dispatch(authReq(messagesSet.authProcess.activationReq))
    return new Promise((resolve, reject) => {
      request.get(`${apiUrl}${activationPath}?email=${email}&token=${activeCode}`)
        .then((res) => {
          const webStatus = res.status
          const parsedRes = JSON.parse(res.text);
          const now = new Date().getTime()
          setupToken({
            'token': parsedRes.jwt,
            'accountInfo': JSON.stringify(_.omit(parsedRes, ['jwt'])),
            'setupTime': now
          })
          dispatch(authUser())
          resolve()
        }, (err) => {
          dispatch(authError(err))
          reject()
        })
    })
  }
}

export function signInUser(email, password, apiUrl, signInPath) {
  return function(dispatch) {
    dispatch(authReq(messagesSet.authProcess.signInReq))
    return new Promise((resolve, reject) => {
      request.post(`${apiUrl}${signInPath}`)
        .set('Content-Type', 'application/json')
        .send({ email, password })
        .then((res) => {
          const webStatus = res.status
          const parsedRes = JSON.parse(res.text);
          const now = new Date().getTime()
          setupToken({
            'token': parsedRes.jwt,
            'accountInfo': JSON.stringify(_.omit(parsedRes, ['jwt'])),
            'setupTime': now
          })
          dispatch(authUser())
          resolve()
        }, (err) => {
          dispatch(authError(err))
          reject()
        })
    })
  }
}
