# TW Reporter Registration Package


## Host Project Environment
* The host project need to contain following dependency:
  1. react
  2. redux
  3. react-router
  4. express server


## Installation
```bash
npm i --save @twreporter/registration
```

## Main Features
1. Registration System
2. Service/Bookmark widgets

## Work Flow
### Overview
* 2 mechanisms
 1. oAuth
 2. twreporter account

* 2 scenarios
 1. User signin/up at registration page
 2. User want to bookmark page without signing in.

* The internal data process is same, no matter user sign in or sign up
* In either way (oAuth/twreporter account), user will browse activation page to be redirected to destination.

### Sign In/Up twreporter account
* Start at Sign In page
 1. Sign In
 2. Redirect to confirm page
 3. User get email and click the url
 4. Go to activation page

* Start at article page
 1. Click Bookmark
 2. Redirect to Sign In page (At the time, url contain with query path)
 3. User signIn and get email. (Store path into localStorage)
 4. User Click url to activation page
 5. Activation page get path from localStorage and redirect user back to article page

### Sign In with oAuth(Facebook, Google)
1. User Sign in.
2. Data from front-end App -> API -> Database
3. API return auth info and redirect page to home page.
  * medium of auth info is cookie.
* order of medium
  1. cookie
  2. redux state
  3. local storage

## Registration

### Server - [server.js](https://github.com/twreporter/twreporter-react/blob/master/src/server.js)
1. Set up configuration for registration
2. Process cookie in oAuth procedure

```js
import { configureAction, authUserAction } from '@twreporter/registration'

if (path === `/${ACTIVATE_PAGE_PATH}`) {
  // The following procedure is for OAuth (Google/Facebook)
  // setup token to redux state from cookies
  const authInfoString = get(req, 'cookies.auth_info', '')
  const authType = get(req, 'query.login', 'email signin')
  if (authInfoString) {
    const authInfoObj = JSON.parse(authInfoString)
    const jwt = get(authInfoObj, 'jwt', '')
    if (jwt) {
      store.dispatch(authUserAction(authType, authInfoObj))
    }
  }
}
// setup authentication api server url and endpoints
store.dispatch(configureAction(config.registrationConfigure))
```

### Entry point of application - [App.js](https://github.com/twreporter/twreporter-react/blob/master/src/containers/App.js)
```js
// token can be stored in localStorage in two scenario
// 1. TWReporter account sign in
// 2. oAuth
// Acount: store auth info during signin action
// oAuth: cookie -> redux state -> localStorage -> delete authinfo in redux state
// The following procedure is only for oAuth
// const { auth } = store.getState()
const { ifAuthenticated, authInfo, authType, deletAuthInfoAction } = this.props
if(ifAuthenticated && authInfo && (authType === 'facebook' || authType === 'google')) {
  setupTokenInLocalStorage(authInfo, localStorageKeys.authInfo)
  deletAuthInfoAction()
  // store.dispatch(deletAuthInfoAction())
}

// 1. Renew token when user brows our website
// 2. ScheduleRenewToken if user keep the tab open forever
const { authConfigure, renewToken } = this.props
const authInfoString = getItem(localStorageKeys.authInfo)
if(authInfoString) {
  const authObj = JSON.parse(authInfoString)
  // const { authConfigure } = store.getState()
  const { apiUrl, renew } = authConfigure
  renewToken(apiUrl, renew, authObj)
  scheduleRenewToken(
    6,
    () => {
      if (getItem(localStorageKeys.authInfo)) {
        renewToken(apiUrl, renew, JSON.parse(getItem(localStorageKeys.authInfo)))
      }
    }
  )
}

// Check if token existed in localStorage and expired
// following preocedure is for both accoutn and oAuth SignIn
// 7 = 7 days
const { authUserByTokenAction } = this.props
authUserByTokenAction(7, authType)
```

### [Sign In Page](https://github.com/twreporter/twreporter-react/blob/master/src/containers/sign-in.js)
### [Sign Up Page](https://github.com/twreporter/twreporter-react/blob/master/src/containers/sign-up.js)
### [Activation](https://github.com/twreporter/twreporter-react/blob/master/src/containers/Activation.js)

## Widget
The package provide two kind of widgets. One is bookmark widget, another one is service widgets. Each widget can be served on specific url, so you can use iframe to implement the function.

### Data Structure

```js
// Bookmark
const bookmarkData = {
  slug: 'fake-slug',
  host: 'http://fake-host:3000',
  is_external: false,
  title: 'fake-title',
  desc: 'fake-description',
  thumbnail: 'fake-thumbnail',
  category: 'issue',
  published_date: '2017-12-12T08:00:00+08:00',
}

const bookmarkPostMessage = {
  bookmarkData,
  svgColor: 'white',
}

// Service
const bookmarkPostMessage = {
  svgColor: 'white',
}

```

### Usage
* Create Receiver Component which use imported WidgetFrame from this package.( which is iframe)
  * Receiver Component is equivalent to iframe Service Provider
* Create iFrame in the application page.

#### Service Provider
```js
//Receiver Prototype
const isJson = (string) => {
  try {
    JSON.parse(string)
  } catch (e) {
    return false
  }
  return true
}

class WidgetPrototype extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postMessage: {}
    }
    this.receiveMessage = this._receiveMessage.bind(this)
  }

  _receiveMessage(event) {
    // The statement is only for production
    // Only receiveMessage from twreporter website
    if (event.origin !== 'https://www.twreporter.org' && process.env.NODE_ENV === 'production') {
      return
    }
    let dataObject
    // Only process message which contain useful infomation
    const data = _.get(event, 'data', '')
    if (typeof data === 'string' && isJson(data)) {
      dataObject = JSON.parse(event.data)
      this.setState({
        postMessage: dataObject
      })
    }
  }

  componentDidMount() {
    window.addEventListener('message', this.receiveMessage, false)
  }
}

export default WidgetPrototype
```

```js
// Receiver page
// User can use the url for iframe
import { BookmarkWidget } from '@twreporter/registration'
import get from 'lodash/get'
import React from 'react'
import WidgetPrototype from './prototype'

const _ = {
  get
}


class BookmarkIframe extends WidgetPrototype {
  render() {
    const { postMessage } = this.state
    return (
      <BookmarkWidget
        slug={_.get(postMessage, 'bookmarkData.slug', '')}
        bookmarkData={_.get(postMessage, 'bookmarkData', {})}
        svgColor={_.get(postMessage, 'svgColor', '')}
        external
        mobile
      />
    )
  }
}

export default BookmarkIframe
```

#### Application

```js
class foo extends React.Component {
  componentDidMount() {
    const serviceElement = document.getElementById('serviceIcon')
    serviceElement.onload = () => {
      serviceElement.contentWindow.postMessage(JSON.stringify(servicePostMessage), `${HOST}`)
    }
  }

  render() {
    return (
      <iFrame
        id="serviceIcon"
        title="service-widget"
        src={`${HOST}/widgets-services`}
        scrolling="no"
      />
    )
  }
}
```

## Development
```bash
npm run dev    //development mode
npm run build  //production mode

//Hard reload development without npm link
CUSTOMER_FOLDER=/task/xxfolder/twreporter npm run dev

//Or you can put @twreporter/registration at same directory with your project folder.
```
