import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, AUTH_REQ, DELETE_AUTHINFO, WRITE_TOKEN_STATUS, RESET_AUTH_ERROR } from './types'
import { localStorageKeys } from '../config'
import { messagesSet } from '../constants/messageSet'
import { setupTokenInLocalStorage, removeToken, tokenExpirationChecker } from '../utils/tokenManager'
import axios from 'axios'
import get from 'lodash/get'

const _ = {
  get,
}

const { authInfo } = localStorageKeys

const getAxiosInstance = (token) => {
  if (token) {
    return axios.create({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }
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

export function authUser(authType, authInfoData) {
  return {
    type: AUTH_USER,
    payload: { authProcess: messagesSet.authProcess.authUser, authType, authInfoData },
  }
}

export function signOutUser() {
  removeToken(authInfo)
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

export function signUpUser(email, apiUrl, signUpPath) {
  return (dispatch) => {
    dispatch(authReq(messagesSet.authProcess.signUpReq))
    const axiosInstance = getAxiosInstance()
    return new Promise((resolve, reject) => {
      axiosInstance.post(`${apiUrl}${signUpPath}`, { email })
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
          setupTokenInLocalStorage(res.data, authInfo)
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

export function signInUser(email, apiUrl, signInPath, destination) {
  return (dispatch) => {
    dispatch(authReq(messagesSet.authProcess.signInReq))
    return new Promise((resolve, reject) => {
      const axiosInstance = getAxiosInstance()
      axiosInstance.post(`${apiUrl}${signInPath}`, { email, destination })
        .then(() => {
          // setupTokenInLocalStorage(res.data, authInfo)
          // dispatch(authUser('account signIn', {}))
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

export function forgetPassword(email, apiUrl, path) {
  return (dispatch) => {
    dispatch(authReq(messagesSet.authProcess.forgetpassword))
    const axiosInstance = getAxiosInstance()
    return axiosInstance.post(`${apiUrl}${path}`, { email })
  }
}

export function changePassword(email, password, token, apiUrl, path) {
  return (dispatch) => {
    dispatch(authReq(messagesSet.authProcess.forgetpassword))
    const axiosInstance = getAxiosInstance()
    return axiosInstance.post(`${apiUrl}${path}`, { email, password, token })
  }
}

export function authenticateUserByToken(days, currentAuthType) {
  return (dispatch) => {
    if (!tokenExpirationChecker(days, authInfo)) {
      const authType = `${currentAuthType} verified token`
      dispatch(writeTokenStatus(messagesSet.token.valid))
      dispatch(authUser(authType, {}))
    } else {
      dispatch(writeTokenStatus(messagesSet.token.invalid))
      dispatch(signOutUser())
    }
  }
}

export function renewToken(apiUrl, path, authObj) {
  return (dispatch) => {
    dispatch(authReq(messagesSet.authProcess.renewToken))
    const userId = _.get(authObj, 'id', '')
    const jwt = _.get(authObj, 'jwt', '')
    const axiosInstance = getAxiosInstance(jwt)
    return axiosInstance.get(`${apiUrl}${path}/${userId}`)
      .then((res) => {
        const newToken = _.get(res, 'data.data.token', '')
        if (newToken) {
          const newAuthObj = { ...authObj, jwt: newToken }
          setupTokenInLocalStorage(newAuthObj, authInfo)
        }
      })
      .catch((err) => {
        const errorInfo = getErrorInfo(err)
        dispatch(authError(errorInfo))
      })
  }
}
