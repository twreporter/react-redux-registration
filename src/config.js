export const localStorageKeys = {
  authInfo: 'authInfo',
  checkedInfo: 'checkedInfo',
  redirectLocation: 'redirectLocation',
}

export const linkPrefix = {
  article: '/a/',
  interactiveArticle: '/i/',
  categories: '/categories/',
  tag: '/tag/',
  topic: '/topic/',
  topics: '/topics/',
  author: '/author/',
  authors: '/authors',
}

export const storage = {
  google: {
    schema: 'https',
    hostname: 'storage.googleapis.com',
    bucket: 'twreporter-multimedia',
  },
}

export const mainSite = {
  url: 'https://www.twreporter.org',
}

export const appConfig = {
  host: process.env.NODE_ENV === 'production' ? 'https://www.twreporter.org' : 'http://testtest.twreporter.org:3000',
}
