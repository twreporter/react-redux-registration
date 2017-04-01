import { OAUTH_USER, OAUTH_ERROR, DELETE_OTOKEN, UNAUTH_USER } from '../actions/types'

/**
 * @prop {object} authError - The error obj for recording any error occured during authentication request.
 * @prop {string} errorMessages - record the error message.
 * @prop {string} webStatus - record the error message.
 * @prop {string} type - the app has two types of OAuth login, which are google and facebook respectively
 * @prop {boolean} authenticated - recotd client authentication status.
 * @prop {string} token - token from oauth.
 */

const initialState = {
  authError: {
    errorMessages: "",
    webStatus: null
  },
  oAuthType: "",
  authenticated: false,
  token: ""
}

export default function(state = initialState, action) {
  switch(action.type) {
    case OAUTH_USER:
      return { ...state, oAuthType: action.payload.oAuthType, token: action.payload.token, authenticated: true }
    case DELETE_OTOKEN:
      return { ...state, token:''}
    case UNAUTH_USER:
      return { ...state, authenticated: false, oAuthType: "" }
    default:
      return state
  }
}
