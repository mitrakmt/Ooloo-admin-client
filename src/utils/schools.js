import { request } from './api'

export function getSchools() {
  const config = {
    url: '/admin/school',
    method: 'GET',
  }

  return request(config).then(status => status)
}

export function addSchool(name, state, degree) {
  const config = {
    url: '/admin/school',
    method: 'POST',
    data: {
      degree,
      state,
      name,
    },
  }

  return request(config).then(status => status)
}

export function deleteSchool(schoolId) {
  const config = {
    url: '/admin/school',
    method: 'DELETE',
    data: {
      schoolId,
    },
  }

  return request(config).then(status => status)
}
