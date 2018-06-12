import { request } from './api'

export function downloadPhoto(userId) {
  const config = {
    url: `/image/profile/${userId}`,
    method: 'GET',
  }

  return request(config).then(status => status)
}
