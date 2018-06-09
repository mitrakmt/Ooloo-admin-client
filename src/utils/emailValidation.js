import { request } from './api';

export function validateEmail(token) {
  const config = {
    url: '/user/verifyemail',
    method: 'POST',
    data: {
      token
    }
  };

  return request(config).then(status => status);
}
