import request from 'superagent'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE, AUTH_REQ } from './types'
import { omit } from 'lodash'
import { apiHost, apiPort, apiEndPoint } from '../../config'
import { messagesSet } from './constants'

const _ = {
  omit
}

const API_URL = `${apiHost}:${apiPort}`
// const O_AUTH_API_URL = 'http://testtest.twreporter.org:8080'

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
    payload: messagesSet.authProcess.unauthUser
  }
}

export function signoutUser() {
  const browserLocalStorage = (typeof localStorage === 'undefined') ? null : localStorage;
  if(browserLocalStorage){
    browserLocalStorage.removeItem('token')
    browserLocalStorage.removeItem('accountInfo')
  }
  return {
    type: UNAUTH_USER,
    payload: messagesSet.authProcess.authUser
  }
}


export function signupUser({ email, password}) {
  return function(dispatch) {
    dispatch(authReq(messagesSet.authProcess.signupReq))
    return request.post(`${API_URL}${apiEndPoint.signup}`)
      .set('Content-Type', 'application/json')
      .send({ email, password })
      .then((success) => {
        dispatch(fetchMessages(messagesSet.app.afterSignUp))
      }, (failure) => {
        dispatch(authError(failure))
      })
  }
}

export function activateUser({ email, activeCode }, callback) {
  return function(dispatch) {
    dispatch(authReq(messagesSet.authProcess.activationReq))
    return request.get(`${API_URL}${apiEndPoint.activate}?email=${email}&token=${activeCode}`)
      .then((res) => {
        const webStatus = res.status
        const parsedRes = JSON.parse(res.text);
        const browserLocalStorage = (typeof localStorage === 'undefined') ? null : localStorage;
        if(browserLocalStorage){
          browserLocalStorage.setItem('token', parsedRes.jwt)
          browserLocalStorage.setItem('accountInfo', JSON.stringify(_.omit(parsedRes, ['jwt'])))
        }
        dispatch(authUser())
        callback()
      }, (err) => {
        dispatch(authError(err))
      })
  }
}

export function signinUser({ email, password}, callback) {
  return function(dispatch) {
    dispatch(authReq(messagesSet.authProcess.signinReq))
    return request.post(`${API_URL}${apiEndPoint.signin}`)
      .set('Content-Type', 'application/json')
      .send({ email, password })
      .then((res) => {
        const webStatus = res.status
        const parsedRes = JSON.parse(res.text);
        const browserLocalStorage = (typeof localStorage === 'undefined') ? null : localStorage;
        if(browserLocalStorage){
          browserLocalStorage.setItem('token', parsedRes.jwt)
          browserLocalStorage.setItem('accountInfo', JSON.stringify(_.omit(parsedRes, ['jwt'])))
        }
        dispatch(authUser())
        callback()
      }, (err) => {
        dispatch(authError(err))
      })
  }
}
