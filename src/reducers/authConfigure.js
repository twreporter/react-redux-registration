import { CONFIGURE } from '../actions/types'

const initialState = {
  signUp: '',
  signIn: '',
  activate: '',
  bookmarkUpdate: '',
  bookmarkDelete: '',
  bookmarkGet: '',
  ping: '',
  oAuthProviders: {
    google: '',
    facebook: ''
  }
}

export default function(state = initialState, action) {
  switch(action.type) {
    case CONFIGURE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
