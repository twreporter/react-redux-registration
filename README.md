# TW Reporter Registration Package

## Prequisite
* your project need to be a react redux project.

## Installation
```bash
npm i --save twreporter-registration
```

## List of Containers/Components and Reducers

### Containers
* ActivePage
* AuthenticationScreen
* Features
* SignInForm
*

### Components
* SignOut

### Reducers
* authReducer
* oauthReducer

## Usage js
* import containers/components from twreporter-registration for react router of your peojct
```js
import { SignUpForm, AuthenticationScreen } from 'twreporter-registration'
export default function (history = browserHistory) {
return (
 <Router history={history} >
   <Route path="/" component={App}>
     <IndexRoute component={Home} />
     <Route path="signup" component={SignUpForm} />
     <Route path="signin" component={SignInForm} facebook={true} google={false}/>
     <Route path="activate" component={ActivePage} />
     <Route path="features" component={AuthenticationScreen(Features)} redirectPath={'/signin'} />
     <Route path="signout" component={SignOut} />
   </Route>
 </Router>
)
}
```
* import reducers from twreporter-registration to root reducer
```js
import { authReducer, oauthReducer, configureReducer } from 'twreporter-registration'
const rootReducer = combineReducers({
   authConfigure: configureReducer,
   oauth: oauthReducer,
   auth: authReducer,
})
```

* import actions from from package  
We provide you a default structure of path of authentication api server. You only need to
enter your paths into registrationConfigure obj which is presented at following example.
```js
// in your render file
import { types, configureAction } from 'twreporter-registration'
const registrationConfigure = {
    apiUrl: 'http://testtest.twreporter.org/8080',
    signUp: '/v1/signup',
    signIn: '/v1/login',
    activate: '/v1/activate',
    bookmarkUpdate: '',
    bookmarkDelete: '',
    bookmarkGet: '',
    ping: '',
    oAuthProviders: {
      google: '/v1/auth/google',
      facebook: '/v1/auth/facebook'
    }
}
// before render, you have to dispatch configureAction from our package
// you have to choose either server side or client side rendering
store.dispatch(configureAction(registrationConfigure)).then(
  ReactDOM.render((
    <Provider store={store}>
      <DeviceProvider device={device}>
        { createRoutes(history) }
      </DeviceProvider>
    </Provider>
  ), document.getElementById('root'))
)
```

## Development
```bash
npm run dev
```
* advice for developer/programmer:
You can program in es2015/es2017 and only need to edit files in **src** directory.
All files will be transpiled through babel-preset-es2017 and transfered to **lib** directory.
