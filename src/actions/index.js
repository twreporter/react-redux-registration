import { browserHistory } from 'react-router'
import request from 'superagent'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE, AUTH_REQ } from './types'
import { omit } from 'lodash'

const _ = {
  omit
}

const API_URL = 'http://testtest.twreporter.org:8080'
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
    type: AUTH_USER
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
  }
}


export function signupUser({ email, password}) {
  return function(dispatch) {
    dispatch(authReq('Sign Up Request'))
    request.post(`${API_URL}/v1/signup`)
      .set('Content-Type', 'application/json')
      .send({ email, password })
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch(authError(err))
        } else {
          dispatch(fetchMessages('You will receive an E-mail. Please check your mail box.'))
        }
      })
  }
}

export function activateUser({ email, activeCode }, callback) {
  return function(dispatch) {
    dispatch(authReq('Active Request'))
    request.get(`${API_URL}/v1/activate?email=${email}&token=${activeCode}`)
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch(authError(err))
        } else {
           const webStatus = res.status
           const parsedRes = JSON.parse(res.text);
           const browserLocalStorage = (typeof localStorage === 'undefined') ? null : localStorage;
           if(browserLocalStorage){
             browserLocalStorage.setItem('token', parsedRes.jwt)
             browserLocalStorage.setItem('accountInfo', JSON.stringify(_.omit(parsedRes, ['jwt'])))
           }
           dispatch(authUser())
           callback()
         }
      })
  }
}

export function signinUser({ email, password}, callback) {
  return function(dispatch) {
    dispatch(authReq('Sign In Request'))
    request.post(`${API_URL}/v1/login`)
      .set('Content-Type', 'application/json')
      .send({ email, password })
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch(authError(err))
        } else {
          const webStatus = res.status
          const parsedRes = JSON.parse(res.text);
          const browserLocalStorage = (typeof localStorage === 'undefined') ? null : localStorage;
          // console.log(parsedRes)
          if(browserLocalStorage){
            browserLocalStorage.setItem('token', parsedRes.jwt)
          }
          dispatch(authUser())
          callback()
        }
      })
  }
}

export function oAuthFacebook() {
  return function(dispatch) {
    dispatch(authReq('Sign In O Auth Request'))
    request.get(`${API_URL}/v1/auth/facebook`)
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch(authError(err))
        } else {
          const webStatus = res.status
          const parsedRes = JSON.parse(res.text);
          const browserLocalStorage = (typeof localStorage === 'undefined') ? null : localStorage;
          if(browserLocalStorage){
            browserLocalStorage.setItem('token', parsedRes.jwt)
          }
        }
      })
  }
}
