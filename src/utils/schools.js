import { request } from './api';

export function getSchools() {
    const config = {
      url: '/admin/school',
      method: 'GET',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
  
    return request(config)
      .then(status => status)
  }

export function addSchool(name, state, degree) {
    const config = {
        url: '/admin/school',
        method: 'POST',
        header: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            name,
            state,
            degree
        }
    };

    return request(config)
        .then(status => status)
}

export function deleteSchool(schoolId) {
    const config = {
        url: '/admin/school',
        method: 'DELETE',
        header: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            schoolId
        }
    };

    return request(config)
        .then(status => status)
}