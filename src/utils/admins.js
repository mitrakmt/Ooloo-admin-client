import { request } from './api';

export function getAdmins() {
    const config = {
      url: '/admin/user',
      method: 'GET',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
  
    return request(config)
      .then(status => status)
  }