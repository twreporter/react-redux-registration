import * as types from '../../../actions/types'

export const mockActionSet = {
  [types.AUTH_REQ]: {
    type: types.AUTH_REQ,
    payload: 'mock authentication request'
  },
  [types.AUTH_USER]: {
    type: types.AUTH_USER,
    payload: 'mock autherizing user'
  },
  [types.UNAUTH_USER]: {
    type: types.UNAUTH_USER,
    payload: 'mock unauthorizing user'
  },
  [types.AUTH_ERROR]: {
    type: types.AUTH_ERROR,
    payload: {
      webStatus: 401,
      errorMessages: 'mock error message'
    }
  },
  [types.FETCH_MESSAGE]: {
    type: types.FETCH_MESSAGE,
    payload: 'mock fetching message'
  },
}


export const mockExpStateSet = {
  initialState: {
    authError: {
      errorMessages: '',
      webStatus: null
    },
    messages: '',
    authenticated: false,
    authProcess: '',
  },
  authReq: {
    authError: {
      errorMessages: '',
      webStatus: null
    },
    messages: '',
    authenticated: false,
    authProcess: mockActionSet.AUTH_REQ.payload,
  },
  authUser: {
    authError: {
      errorMessages: '',
      webStatus: null
    },
    messages: '',
    authenticated: true,
    authProcess: mockActionSet.AUTH_USER.payload,
  },
  unauthUser: {
    authError: {
      errorMessages: '',
      webStatus: null
    },
    messages: '',
    authenticated: false,
    authProcess: mockActionSet.UNAUTH_USER.payload,
  },
  authError: {
    authError: mockActionSet.AUTH_ERROR.payload,
    messages: '',
    authenticated: false,
    authProcess: '',
  },
  fetchMessage: {
    authError: {
      errorMessages: '',
      webStatus: null
    },
    messages: mockActionSet.FETCH_MESSAGE.payload,
    authenticated: false,
    authProcess: '',
  }
}
