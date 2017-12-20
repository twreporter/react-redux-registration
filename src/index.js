import { configure as configureAction, authUser as authUserAction, signOutUser as signOutAction, deletAuthInfo as deletAuthInfoAction, authenticateUserByToken as authUserByTokenAction, renewToken } from './actions'
import { setupTokenInLocalStorage, tokenExpirationChecker, getItem, scheduleRenewToken } from './utils/tokenManager'
import { localStorageKeys } from './config/config'
import ActivePage from './containers/active-page'
import AuthenticationScreen from './containers/auth-screen'
import authReducer from './reducers/authReducer'
import ChangePassword from './containers/change-password'
import configureReducer from './reducers/configure'
import Confirmation from './containers/sign-in-up-confirm'
import FacebookButton from './containers/facebook-button'
import ForgetPassword from './containers/forget-password'
import GoogleButton from './containers/google-button'
import PageContainer from './components/page-container'
import SignInForm from './containers/sign-in'
import SignUpForm from './containers/sign-up'

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
  setupTokenInLocalStorage,
  tokenExpirationChecker,
  getItem,
  localStorageKeys,
  PageContainer,
  ForgetPassword,
  ChangePassword,
  Confirmation,
  renewToken,
  scheduleRenewToken,
}

export default {
  components: {
    ActivePage,
    AuthenticationScreen,
    SignInForm,
    SignUpForm,
    FacebookButton,
    GoogleButton,
    PageContainer,
    ForgetPassword,
    ChangePassword,
    Confirmation,
  },
  reducers: {
    authReducer,
    configureReducer,
  },
  actions: {
    configureAction,
    authUserAction,
    signOutAction,
    deletAuthInfoAction,
    authUserByTokenAction,
    renewToken,
  },
  utils: {
    setupTokenInLocalStorage,
    tokenExpirationChecker,
    getItem,
    scheduleRenewToken,
  },
  localStorageKeys,
}
