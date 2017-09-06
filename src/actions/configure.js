import { CONFIGURE } from './types'

export function configure(setting) {
  return {
    type: CONFIGURE,
    payload: setting,
  }
}
