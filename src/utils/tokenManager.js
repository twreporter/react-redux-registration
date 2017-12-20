import get from 'lodash/get'

const _ = {
  get,
}

let tokenRenewalTimeout

// Internal Usage

const daysToSecs = (days) => {
  if (typeof days === 'number') {
    return days * 24 * 60 * 60 * 1000
  }
  return 6 * 24 * 60 * 60 * 1000
}

function ObjToString(obj) {
  if (obj) {
    return JSON.stringify(obj)
  }
  return obj
}

function StringToObj(string) {
  if (string) {
    return JSON.parse(string)
  }
  return string
}

function localStorageExist(callback) {
  const browserLocalStorage = (typeof localStorage === 'undefined') ? null : localStorage
  if (browserLocalStorage) {
    return callback(browserLocalStorage)
  }
  return null
}

// External Usage

/**
* @param {object} setting - inside obj should be key value pair for localStorage
*/

export function setupTokenInLocalStorage(setting, key) {
  if (typeof setting !== 'object') {
    throw new Error('typeof setting should be object')
  }
  localStorageExist((ls) => {
    if (ls) {
      const now = new Date().getTime()
      const updatedSetting = { ...setting, setupTime: now }
      ls.setItem(key, ObjToString(updatedSetting))
    }
  })
}

/**
* @param {object} key - localStorage key
*/

export function getItem(key) {
  return localStorageExist((ls) => {
    if (ls) {
      return ls.getItem(key)
    }
    return ''
  })
}

/**
* @param {array} setting - contain string key
*/

export function removeToken(key) {
  clearInterval(tokenRenewalTimeout)
  localStorageExist((ls) => {
    if (ls) {
      ls.removeItem(key)
    }
  })
}

export function tokenExpirationChecker(days, key) {
  return localStorageExist((ls) => {
    const lsInfoString = ls.getItem(key)
    const lsInfoObj = StringToObj(lsInfoString)
    const setupTime = _.get(lsInfoObj, 'setupTime')
    if (setupTime) {
      const now = new Date().getTime()
      if (now - setupTime > daysToSecs(days)) {
        removeToken(key)
        return true
      }
      return false
    }
    return true
  })
}

export function scheduleRenewToken(days, cb) {
  tokenRenewalTimeout = setInterval(() => {
    cb()
  }, daysToSecs(days))
}
