import { request } from './api';

export function getQuestions() {
    const config = {
      url: '/admin/question',
      method: 'GET',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
  
    return request(config)
      .then(status => status)
  }