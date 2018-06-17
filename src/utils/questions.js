import { request } from './api'

export function getQuestions(filters) {
  let queryUrl = '/admin/question?'
  if (filters.topics) {
    queryUrl += `topics=${filters.topics}&`
  }
  if (filters.createdBy) {
    queryUrl += `createdBy=${filters.createdBy}&`
  }
  if (filters.difficulty) {
    queryUrl += `difficulty=${filters.difficulty}`
  }
  const config = {
    url: queryUrl,
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
