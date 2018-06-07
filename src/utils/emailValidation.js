import { request } from './api';

export function validateEmail(token) {
    const config = {
      url: '/user/verifyemail',
      method: 'POST',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
          token
      }
    };
  
    return request(config)
      .then(status => status)
  }