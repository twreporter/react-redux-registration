# TW Reporter Registration Package


## Host Project Environment
* The host project need to contain following dependency:
  1. react
  2. redux
  3. react-router
  4. express server

* Bonus: The package work with [next.js](https://github.com/zeit/next.js)


## Installation
```bash
npm i --save twreporter-registration
```


## Work Flow
### Sign Up Account
1. User sign up
2. API obtain data and inform database to add new account.
3. API send activation email to registered account.
  * email link contain authorized token and user's email address.
4. User click customized link and activate account.
5. API return authorized info and the app store(action) info in localStorage.

### Sig In with TWReporter(TWR) Account
1. User Sign in.
2. API obtain data, send request to database.
3. API return auth info. The app store(action) info in localStroage.

### Sign In with oAuth(Facebook, Google)
1. User Sign in.
2. Data from front-end App -> API -> Database
3. API return auth info and redirect page to home page.
  * medium of auth info is cookie.
* order of medium
  1. cookie
  2. redux state
  3. local storage


## Usage js


### [React-Router](https://github.com/ReactTraining/react-router) Setting
  * If user can't pass AuthScreen, the app will be rediected automatically according to the provided redirectPath.

```js
import SignIn from '../containers/SignIn'
import SignUp from '../containers/SignUp'
import Activation from '../containers/Activation'
import Features from '../containers/features'
import AuthenticationScreen from 'twreporter-registration'

export default function (history = browserHistory) {
  return (
    <Router history={history} onUpdate={scrollAndFireTracking} >
      <Route path="/topics/:slug" component={TopicLandingPage} />
      <Route path="/" component={Home} />
      <Route path="/" component={App}>
        <Route path="signup" component={SignUp} />
        <Route path="signin" component={SignIn} />
        <Route path="activate" component={Activation} />
        <Route path="features" component={AuthenticationScreen(Features)} redirectPath={'/signin'} />
      </Route>
    </Router>
  )
}
```

### Sign Up
```js
import React from 'react'
import { connect } from 'react-redux'
import { SignUpForm } from 'twreporter-registration'

const SignUp = (props) => (
  <SignUpForm
    title='title'
    signUpMessage='signUpMessage'
    {...props}
  />
)

export default connect()(SignUp)
```


### Sign In
```js
import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { SignInForm, FacebookButton, GoogleButton } from 'twreporter-registration'

const SignIn = (props) => (
  <SignInForm
    title={'title'}
    historyManager={browserHistory}
    signInRedirectPath = {'/'}
    defaultStyle={true}
    {...props}
  >
    <FacebookButton />
    <GoogleButton />
  </SignInForm>
)

export default connect()(SignIn)
```

### Sign Out
  * Sign out action will remove localStorage auth info and change redux state
```js
import { Link } from 'react-router'
import { signOutAction } from 'twreporter-registration'

<Link to={`/${memberConfigs.path}`} onClick={() => {signOutAction()}}>
  <div>Click here to sign out</div>
</Link>
```



### Activation
```js
import React from 'react'
import { ActivePage } from 'twreporter-registration'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

const Activation = (props) => (
  <div>
    <ActivePage
      activateRedirectPath={'/'}
      browserHistory={browserHistory}
      {...props}
    />
  </div>
)

```

### React Reducer
```js
import { authReducer, configureReducer } from 'twreporter-registration'

const registrationInitialState = {
  apiUrl: '',
  signUp: '',
  signIn: '',
  activate: '',
  oAuthProviders: {
    google: '',
    facebook: ''
  },
  location: '',
  domain: '',
}
const ConfigureReducer = configureReducer(registrationInitialState)

const rootReducer = combineReducers({
  authConfigure: ConfigureReducer,
  auth: authReducer,
})

export default rootReducer
```

### Server Side
  * obtain oAuth data from cookie and pass it to redux state.
  * setup authentication api server url, path(endpoints).

```js
import cookieParser from 'cookie-parser'
import { configureAction, authUserAction, authInfoStringToObj } from 'twreporter-registration'

server.use(cookieParser())

// The following procedure is for OAuth (Google/Facebook)
// setup token to redux state from cookies
if (req.query.login) {
  const authType = req.query.login
  const cookies = req.cookies
  const authInfoString = cookies.auth_info
  const authInfoObj = authInfoStringToObj(authInfoString)
  store.dispatch(authUserAction(authType, authInfoObj))
}
// setup authentication api server url and endpoints
const registrationConfigure = {
  apiUrl: 'http://localhost:8080',
  signUp: '/v1/signup',
  signIn: '/v1/login',
  activate: '/v1/activate',
  oAuthProviders: {
    google: '/v1/auth/google',
    facebook: '/v1/auth/facebook'
  },
  location: 'http://testtest.twreporter.org:3000',
  domain: 'twreporter.org'
}
store.dispatch(configureAction(registrationConfigure))
```


### Enter Point of the Project
  * TWR Ex: src/index.js

```js
import { setupTokenInLocalStorage, deletAuthInfoAction, authUserByTokenAction } from 'twreporter-registration'

// Check if token existed in localStorage and expired
// token can be stored in localStorage in two scenario
// 1. oAuth
// 2. TWReporter account sign in
const { auth } = store.getState()
if(auth.authenticated && auth.authInfo && (auth.authType=== 'facebook' || auth.authType==='google')) {
  setupTokenInLocalStorage(auth.authInfo)
  store.dispatch(deletAuthInfoAction())
}

// 7 = 7 days
store.dispatch(authUserByTokenAction(7, auth.authType))
  .then(() => {})
  .catch(() => {})
```



## Next.js Example

```js
class SignIn extends React.Component {
  static getInitialProps ({ store }) {
    const registrationConfigure = {
      apiUrl: 'http://testtest.twreporter.org:8080',
      signUp: '/v1/signup',
      signIn: '/v1/login',
      activate: '/v1/activate',
      oAuthProviders: {
        google: '/v1/auth/google',
        facebook: '/v1/auth/facebook'
      },
      location: 'http://testtest.twreporter.org:3000',
      domain: 'twreporter.org'
    }
    store.dispatch(configureAction(registrationConfigure))
  }

  render() {
    return (
      <SignInForm
        title={'Sign In to Newsletter'}
        browserHistory={Router}
        AssignedLink={Link}
        signInRedirectPath={'/features'}
        location={'http://testtest.twreporter.org:3000/features'}
        domain={'twreporter.org'}
        account={false}
        facebook={true}
        google={true}
        defaultStyle={false}
      />
    )
  }
}
```

## Development
```bash
npm run dev   //development mode
npm run build //production mode

//Hard reload development without npm link
CUSTOMER_FOLDER=/Users/hanReporter/Documents/twReporter_frontEnd/twreporter-react npm run dev
```

* advice for developer/programmer:
You can program in es2015 + es2017 and only need to edit files in **src** directory.
All files will be transpiled through babel-preset-es2017 and transferred to **lib** directory.
