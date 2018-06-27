import { request } from './api'

export function getNews() {
  const config = {
    url: '/admin/news',
    method: 'GET',
  }

  return request(config).then(status => status)
}

export function addNews(content, daysToLast, adminPassword) {
  const config = {
    url: '/admin/news',
    method: 'POST',
    data: {
      content,
      daysToLast: parseInt(daysToLast),
      adminPassword,
    },
  }

  return request(config).then(status => status)
}

export function deleteNews(newsId, adminPassword) {
  const config = {
    url: '/admin/news',
    method: 'DELETE',
    data: {
      newsId: parseInt(newsId),
      adminPassword,
    },
  }

  return request(config).then(status => status)
}
