import { request } from './api';

export function getInterests() {
    const config = {
      url: '/interest',
      method: 'GET',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
  
    return request(config)
      .then(status => status)
  }