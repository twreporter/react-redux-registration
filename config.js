module.exports = {
  apiHost: process.env.APIHOST || 'http://testtest.twreporter.org',
  apiPort: process.env.APIPORT || 8080,
  apiEndPoint: {
    google: '/v1/auth/google',
    facebook: '/v1/auth/facebook',
    signin: '/v1/login',
    signup: '/v1/signup',
    activate: '/v1/activate',
    bookmarks: ''
  }
}
