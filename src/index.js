import ActivePage from './containers/ActivePage'
import AuthenticationScreen from './containers/AuthScreen'
import SignInForm from './containers/SignIn'
import SignUpForm from './containers/SignUp'
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
