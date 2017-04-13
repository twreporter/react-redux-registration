import { AUTH_USER, UNAUTH_USER, AUTH_REQ,  AUTH_ERROR, FETCH_MESSAGE, DELETE_OTOKEN } from '../actions/types'

/**
* @prop {object} authError - The error obj for recording any error occured during authentication request.
* @prop {string} errorMessages - record the error message.
* @prop {string} webStatus - record the error message.
* @prop {string} messages - message which is sent from registration app/system ro API Server.
* @prop {boolean} authenticated - recotd client authentication status.
* @prop {string} authProcess - indicate authrntication process: 1. SignUp Req, 2. Activation Req...etc
*/

const initialState = {
  authError: {
    errorMessages: '',
    webStatus: null
  },
  messages: '',
  authenticated: false,
  authProcess: '',
  authType: '',
  token: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
    case AUTH_REQ:
      return { ...state, authProcess: action.payload }
    case AUTH_USER:
      const { authProcess, authType, token } = action.payload
      return { ...state, authenticated: true, authProcess, authType, token }
    case UNAUTH_USER:
      return { ...state, authenticated: false, authProcess: action.payload, authType: '' }
    case AUTH_ERROR:
      return { ...state, authError: action.payload, messages: ''}
    case FETCH_MESSAGE:
      return { ...state, messages: action.payload, authError: {
        errorMessages: '',
        webStatus: null
      }}
    case DELETE_OTOKEN:
      return { ...state, token:''}
    default:
      return state
  }
}
