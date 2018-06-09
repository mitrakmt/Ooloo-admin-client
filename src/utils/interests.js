import { request } from './api';

export function getInterests() {
  const config = {
    url: '/admin/interest',
    method: 'GET'
  };

  return request(config).then(status => status);
}

export function addInterest(interest) {
  const config = {
    url: '/admin/interest',
    method: 'POST',
    data: {
      interest
    }
  };

  return request(config).then(status => status);
}

export function deleteInterest(interest) {
  const config = {
    url: '/admin/interest',
    method: 'DELETE',
    data: {
      interest
    }
  };

  return request(config).then(status => status);
}
