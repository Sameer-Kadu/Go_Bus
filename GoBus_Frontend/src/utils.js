import { config } from './config'

export function createUrl(path) {
  return `${config.serverUrl}/${path}`
}

