import axios from 'axios'
import get from 'lodash/get'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, AUTH_REQ, DELETE_AUTHINFO, WRITE_TOKEN_STATUS, RESET_AUTH_ERROR } from './types'
import { messagesSet } from '../constants/messageSet'
import { setupTokenInLocalStorage, removeToken, tokenExpirationChecker } from '../utils/tokenManager'

const _ = {
  get,
}

const getAxiosInstance = () => {
  return axios.create({
    headers: { 'Content-Type': 'application/json' },
  })
}


export function resetAuthError() {
  return {
    type: RESET_AUTH_ERROR,
  }
}

export function deletAuthInfo() {
  return {
    type: DELETE_AUTHINFO,
  }
}

export function authError({ status, message }) {
  return {
    type: AUTH_ERROR,
    payload: { authError: { errorMessages: message, webStatus: status } },
  }
}

export function authReq(inProcess) {
  return {
    type: AUTH_REQ,
    payload: { authProcess: inProcess },
  }
}

export function authUser(authType, authInfo) {
  return {
    type: AUTH_USER,
    payload: { authProcess: messagesSet.authProcess.authUser, authType, authInfo },
  }
}

export function signOutUser() {
  removeToken()
  return {
    type: UNAUTH_USER,
    payload: { authProcess: messagesSet.authProcess.unauthUser },
  }
}

export function writeTokenStatus(status) {
  return {
    type: WRITE_TOKEN_STATUS,
    payload: { tokenStatus: status },
  }
}

export const getErrorInfo = (err) => {
  const status = _.get(err, 'response', 500)
  const message = _.get(err, ['response', 'data', 'status'], 'Internal Server Error')
  return {
    status,
    message,
  }
}

export function signUpUser(email, password, apiUrl, signUpPath) {
  return (dispatch) => {
    dispatch(authReq(messagesSet.authProcess.signUpReq))
    const axiosInstance = getAxiosInstance()
    return new Promise((resolve, reject) => {
      axiosInstance.post(`${apiUrl}${signUpPath}`, { email, password })
        .then(() => {
          resolve()
        })
        .catch((err) => {
          const errorInfo = getErrorInfo(err)
          dispatch(authError(errorInfo))
          reject(errorInfo)
        })
    })
  }
}

export function activateUser(email, token, apiUrl, activationPath) {
  return (dispatch) => {
    dispatch(authReq(messagesSet.authProcess.activationReq))
    return new Promise((resolve, reject) => {
      const axiosInstance = getAxiosInstance()
      axiosInstance.get(`${apiUrl}${activationPath}?email=${email}&token=${token}`)
        .then((res) => {
          setupTokenInLocalStorage(res.data)
          dispatch(authUser('account signUp/activate', {}))
          resolve()
        })
        .catch((err) => {
          dispatch(authError(getErrorInfo(err)))
          reject()
        })
    })
  }
}

export function signInUser(email, password, apiUrl, signInPath) {
  return (dispatch) => {
    dispatch(authReq(messagesSet.authProcess.signInReq))
    return new Promise((resolve, reject) => {
      const axiosInstance = getAxiosInstance()
      axiosInstance.post(`${apiUrl}${signInPath}`, { email, password })
        .then((res) => {
          setupTokenInLocalStorage(res.data)
          dispatch(authUser('account signIn', {}))
          resolve()
        })
        .catch((err) => {
          const errorInfo = getErrorInfo(err)
          dispatch(authError(errorInfo))
          reject(errorInfo)
        })
    })
  }
}

export function authenticateUserByToken(days, curretnAuthType) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      if (!tokenExpirationChecker(days)) {
        const authType = `${curretnAuthType} verified token`
        dispatch(writeTokenStatus(messagesSet.token.valid))
        dispatch(authUser(authType, {}))
        resolve()
      } else {
        dispatch(writeTokenStatus(messagesSet.token.invalid))
        dispatch(signOutUser())
        reject()
      }
    })
  }
}
