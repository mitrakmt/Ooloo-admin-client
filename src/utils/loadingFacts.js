import { request } from './api'

export function getLoadingFacts() {
  const config = {
    url: '/admin/loadingFact',
    method: 'GET',
  }

  return request(config).then(status => status)
}

export function addLoadingFact(fact) {
  const config = {
    url: '/admin/loadingFact',
    method: 'POST',
    data: {
      fact,
    },
  }

  return request(config).then(status => status)
}

export function deleteLoadingFact(factId) {
  const config = {
    url: '/admin/loadingFact',
    method: 'DELETE',
    data: {
      factId,
    },
  }

  return request(config).then(status => status)
}
