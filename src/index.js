import ActivePage from './containers/ActivePage'
import AuthenticationScreen from './containers/AuthScreen'
import NextSignInForm from './containers/sign-in-next'
import SignInForm from './containers/sign-in-react'
import SignUpForm from './containers/sign-up'
import FacebookButton from './containers/facebook-button'
import GoogleButton from './containers/google-button'
import authReducer from './reducers/authReducer'
import configureReducer from './reducers/configure'
import { configure as configureAction, authUser as authUserAction, signOutUser as signOutAction, deletAuthInfo as deletAuthInfoAction, authenticateUserByToken as authUserByTokenAction } from './actions'
import { authInfoStringToObj } from './utils/responseConverter'
import { setupTokenInLocalStorage, tokenExpirationChecker } from './utils/tokenManager'
// import * from './actions/types'

export {
  ActivePage,
  AuthenticationScreen,
  NextSignInForm,
  SignInForm,
  SignUpForm,
  FacebookButton,
  GoogleButton,
  authReducer,
  configureReducer,
  configureAction,
  authUserAction,
  signOutAction,
  deletAuthInfoAction,
  authUserByTokenAction,
  authInfoStringToObj,
  setupTokenInLocalStorage,
  tokenExpirationChecker,
}
