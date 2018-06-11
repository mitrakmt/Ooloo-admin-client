import { request } from './api'

export function getAdmins() {
  const config = {
    url: '/admin/user',
    method: 'GET',
  }

  return request(config).then(status => status)
}

export function addAdmin(email, username, password, adminPassword) {
  const config = {
    url: '/admin/user',
    method: 'POST',
    data: {
      adminPassword,
      email,
      password,
      username,
    },
  }

  return request(config).then(status => status)
}
