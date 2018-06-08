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

  export function addAdmin(email, username, password, adminPassword) {
    const config = {
        url: '/admin/user',
        method: 'POST',
        header: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            email,
            username,
            password,
            adminPassword
        }
    };

    return request(config)
        .then(status => status)
}