import { request } from './api'

export function getQuestions() {
  const config = {
    url: '/admin/question',
    method: 'GET',
  }

  return request(config).then(status => status)
}

export function addQuestion(question, topics, difficulty, answers, correctAnswer, image) {
  const config = {
    url: '/admin/question',
    method: 'POST',
    data: {
      answers,
      correctAnswer,
      difficulty,
      image: image,
      question,
      topics,
    },
  }

  return request(config).then(status => status)
}

export function deleteQuestion(questionId) {
  const config = {
    url: '/admin/question',
    method: 'DELETE',
    data: {
      questionId,
    },
  }

  return request(config).then(status => status)
}
