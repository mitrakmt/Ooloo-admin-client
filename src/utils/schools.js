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