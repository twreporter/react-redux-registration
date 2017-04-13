function localStorageExist(callback) {
  const browserLocalStorage = (typeof localStorage === 'undefined') ? null : localStorage;
  callback(browserLocalStorage)
}

/**
* @param {object} setting - inside obj should be key value pair for localStorage
*/

export function setupToken(setting) {
  localStorageExist((ls) => {
    if(ls) {
      for(let prop in setting) {
        ls.setItem(prop, setting[prop])
      }
    }
  })
}

/**
* @param {array} setting - contain string key
*/

export function removeToken(setting) {
  localStorageExist((ls) => {
    if(ls) {
      for(let prop of setting) {
        ls.removeItem(prop)
      }
    }
  })
}

export function tokenExpirationChecker(localStorage, days) {
  if(localStorage.getItem('setupTime')) {
    const setupTime = localStorage.getItem('setupTime')
    const now = new Date().getTime()
    if(now-setupTime > days*24*60*60*1000) {
      localStorage.clear()
    }
  }
}
