import { AUTH_USER, UNAUTH_USER, AUTH_REQ, AUTH_ERROR, DELETE_AUTHINFO, TOKEN_STATUS, RESET_AUTH_ERROR } from '../actions/types'

/**
* @prop {object} authError - The error obj for recording any error occured during authentication request.
* @prop {string} errorMessages - property of authError
* @prop {string} webStatus - property of authError
* @prop {boolean} authenticated - recotd client authentication status.
* @prop {string} authProcess - indicate authrntication process: 1. SignUp Req, 2. Activation Req...etc
* @prop {string} authType - signin, oauth(facebook, google), token
* @prop {object} authInfo - obj with props => token, userID, accountInfo, setUpTime
*/

/**
* DELETE_AUTHINFO: Used for oAuth.
* oAuth info process: 1. cookie -> redux state (temporary storage) -> localStorage
* DELETE_AUTHINFO will remove the auth data from redux state
*
*/
const initialState = {
  authenticated: false,
  authProcess: '',
  authType: '',
  authInfo: {},
  authError: {
    errorMessages: '',
    webStatus: null,
  },
  tokenStatus: '',
}

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_REQ: {
      const { authProcess } = action.payload
      return { ...state, authProcess }
    }
    case AUTH_USER: {
      const { authProcess, authType, authInfo } = action.payload
      return { ...state, authenticated: true, authProcess, authType, authInfo }
    }
    case UNAUTH_USER: {
      const { authProcess } = action.payload
      return { ...state, authenticated: false, authProcess, authType: '', tokenStatus: '' }
    }
    case AUTH_ERROR: {
      const { authError } = action.payload
      return { ...state, authError }
    }
    case DELETE_AUTHINFO:
      return { ...state, authInfo: {} }
    case TOKEN_STATUS: {
      const { tokenStatus } = action.payload
      return { ...state, tokenStatus }
    }
    case RESET_AUTH_ERROR:
      return { ...state, authError: {} }
    default:
      return state
  }
}
