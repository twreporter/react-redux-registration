import { AUTH_USER, UNAUTH_USER, AUTH_REQ,  AUTH_ERROR, FETCH_MESSAGE } from '../actions/types'

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
}

export default function(state = initialState, action) {
  switch(action.type) {
    case AUTH_REQ:
      return { ...state, authProcess: action.payload }
    case AUTH_USER:
      return { ...state, authenticated: true, authProcess: action.payload }
    case UNAUTH_USER:
      return { ...state, authenticated: false, authProcess: action.payload }
    case AUTH_ERROR:
      return { ...state, authError: action.payload, messages: ''}
    case FETCH_MESSAGE:
      return { ...state, messages: action.payload, authError: {
        errorMessages: '',
        webStatus: null
      }}
    default:
      return state
  }
}
