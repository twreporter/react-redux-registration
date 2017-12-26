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

## Work Flow
### Overview
* 2 mechanisms
 1. oAuth
 2. twreporter account

* 2 scenarios
 1. User signin/up at registration page
 2. User want to bookmark page under sign out.

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

## Widget
The package provide two kind of widget. One is bookmark widget, another one is service widgets. Each widget can be served on specific url, so you can use iframe to implement the funcion.

```js
//Interactive page

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


class foo extends React.Component {

  componentDidMount() {
      setTimeout(() => {
        const element = document.getElementById('bookmarkIcon')
        element.contentWindow.postMessage(JSON.stringify(bookmarkData), 'http://testtest.twreporter.org:3000')
      }, 1000)
    }

  return (
    <iframe id='bookmarkIcon' title='bookmark-widget' src='http://testtest.twreporter.org:3000/twreporter-bookmark-widget' />
    <iframe title='service-widget' src='http://testtest.twreporter.org:3000/twreporter-service-widgets' />  
  )  
}
```

```js
//Service Provider


class BookmarkIframe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slug: '',
      bookmarkData: {}
    }
    this.receiveMessage = this._receiveMessage.bind(this)
  }

  _receiveMessage(event) {
    if (event.origin !== 'https://www.twreporter.org' && process.env.NODE_ENV === 'production') {
      return
    }
    let dataObject
    if (typeof event.data === 'string') {
      dataObject = JSON.parse(event.data)
      this.setState({
        slug: _.get(dataObject, 'slug', ''),
        bookmarkData: dataObject
      })
    }
  }

  componentDidMount() {
    window.addEventListener('message', this.receiveMessage, false)
  }

  render() {
    const { slug, bookmarkData } = this.state
    return (
      <Container>
        <BookmarkWidget
          slug={slug}
          bookmarkData={bookmarkData}
          external
        />
    </Container>
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
