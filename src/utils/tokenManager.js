function localStorageExist(callback) {
  const browserLocalStorage = (typeof localStorage === 'undefined') ? null : localStorage
  if (browserLocalStorage) {
    return callback(browserLocalStorage)
  }
  return null
}

/**
* @param {object} setting - inside obj should be key value pair for localStorage
*/

export function setupTokenInLocalStorage(setting) {
  localStorageExist((ls) => {
    if (ls) {
      const now = new Date().getTime()
      ls.setItem('setupTime', now)
      for (const key in setting) {
        if (Object.prototype.hasOwnProperty.call(setting, key)) {
          ls.setItem(key, setting[key])
        }
      }
    }
  })
}

/**
* @param {array} setting - contain string key
*/

export function removeToken() {
  localStorageExist((ls) => {
    if (ls) {
      ls.clear()
    }
  })
}

export function tokenExpirationChecker(days) {
  return localStorageExist((ls) => {
    const setupTime = ls.getItem('setupTime')
    const token = ls.getItem('jwt')
    if (setupTime && token) {
      const now = new Date().getTime()
      if (now - setupTime > days * 24 * 60 * 60 * 1000) {
        ls.clear()
        return true
      }
      return false
    }
    return true
  })
}
