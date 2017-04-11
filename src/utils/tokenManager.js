function localStorageExist(localStorage) {
  return typeof localStorage === 'undefined' ? false : true;
}

export function setupToken() {
  // ls == localStorage
  const ls = arguments[0]
  if(localStorageExist(ls)){
    for(let i=1 ; i<arguments.length ; i++){
      ls.setItem(arguments[i].key, arguments[i].value)
    }
  }
}

export function removeToken() {
  const ls = arguments[0]
  if(localStorageExist(ls)){
    for(let i=1 ; i<arguments.length ; i++){
      ls.removeItem(arguments[i].key)
    }
  }
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
