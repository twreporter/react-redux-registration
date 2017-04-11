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
     <Route path="features" component={AuthenticationScreen(Features)} />
     <Route path="signout" component={SignOut} />
   </Route>
 </Router>
)
}
```
* import reducers from twreporter-registration to root reducer
```js
import { authReducer, oauthReducer } from 'twreporter-registration'
const rootReducer = combineReducers({
   oauth: oauthReducer,
   auth: authReducer,
})
```

## Development
```bash
npm run dev
```
* advice for developer/programmer:
You can program in ES6/7 and only need to edit files in **src** directory.
All files will be transpiled through babel-preset-es2017 and transfered to **lib** directory.
