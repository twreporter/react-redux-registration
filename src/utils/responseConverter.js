import { SETUP_TIME } from '../constants/localStorage'

// Token from GO API of TWReporter(TWR) has two scenario// 1. User Sign In with TWR Account: API return account + jwt(token) in json object.
// 2. User Sign In with OAuth (Google/Facebook Account): API return info in json format string.

// Developer only need to use authInfoStringToObj in sec case.
export function authInfoStringToObj(auth_Info_string) {
  if (auth_Info_string === 'undefined') {
    return auth_Info_string
  }
  const authInfoObj = JSON.parse(auth_Info_string)
  const currentTime = new Date().getTime()
  authInfoObj[SETUP_TIME] = currentTime
  return authInfoObj
}
