import { CONFIGURE } from './types'

export function setupConfigure(setting) {
  return {
    type: CONFIGURE,
    payload: setting
  }
}

export function configure(setting) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(setupConfigure(setting))
      resolve()
    })
  }
}
