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

  export function addQuestion(question, topics, difficulty, answers, correctAnswer, image) {
    const config = {
        url: '/admin/question',
        method: 'POST',
        header: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            question,
            topics,
            difficulty,
            answers,
            correctAnswer,
            image: image
        }
    };

    return request(config)
        .then(status => status)
}

export function deleteQuestion(questionId) {
    const config = {
        url: '/admin/question',
        method: 'DELETE',
        header: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            questionId
        }
    };

    return request(config)
        .then(status => status)
}