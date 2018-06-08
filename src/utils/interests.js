import { request } from './api';

export function getInterests() {
    const config = {
        url: '/admin/interest',
        method: 'GET',
        header: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    };
  
    return request(config)
        .then(status => status)
}

export function addInterest(interest) {
    const config = {
        url: '/admin/interest',
        method: 'POST',
        header: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            interest
        }
    };

    return request(config)
        .then(status => status)
}

export function deleteInterest(interest) {
    const config = {
        url: '/admin/interest',
        method: 'DELETE',
        header: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            interest
        }
    };

    return request(config)
        .then(status => status)
}