/* global __DEVELOPMENT__ */
import { storage, mainSite } from '../config'

export function replaceStorageUrlPrefix(url = '', isDev = __DEVELOPMENT__) {
  if (isDev || typeof url !== 'string') {
    return url
  }
  const { schema, hostname, bucket } = storage.google
  const toReplace = mainSite.url
  const toBeReplaced = `${schema}://${hostname}/${bucket}`

  return url.replace(toBeReplaced, toReplace)
}
