import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getQuestions, addQuestion, deleteQuestion } from 'utils/questions'
import { getAdmins } from 'utils/admins'
import { getInterests } from 'utils/interests'

import FilteredMultiSelect from 'react-filtered-multiselect'
import _ from 'lodash'

import './questions.css'

class Questions extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      admins: [],
      correctAnswer: '',
      answers: [],
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      filterTopics: [],
      filterDifficulty: null,
      filterCreatedBy: null,
      availableInterests: [],
      difficulty: '',
      difficultyOptions: [{ value: 1, label: 'Easy' }, { value: 2, label: 'Medium' }, { value: 3, label: 'Hard' }],
      image: null,
      interests: {},
      questions: [],
      question: '',
      topics: [],
    }
  }

  componentWillMount() {
    getInterests().then(interests => {
      let newInterests = {}
      for (let i = 0; i < interests.length; i++) {
        newInterests[interests[i].id] = interests[i].name
      }
      this.setState({
        interests: newInterests,
        availableInterests: interests,
      })
    })
    this.getQuestions()

    getAdmins().then(admins => {
      this.setState({
        admins,
      })
    })
  }

  getQuestions = () => {
    let filters = {
      topics: this.state.filterTopics,
      difficulty: this.state.filterDifficulty,
      createdBy: this.state.filterCreatedBy,
    }
    let finalFilters = _.pickBy(filters, item => {
      return !_.isUndefined(item)
    })
    getQuestions(finalFilters).then(questions => {
      this.setState({
        questions,
      })
    })
  }

  addQuestion = () => {
    let answers = [this.state.answer1, this.state.answer2, this.state.answer3, this.state.answer4]
    let correctAnswer = [this.state.correctAnswer]
    let difficulty = this.state.difficulty
    let finalTopics = []
    let image = this.state.image
    let question = this.state.question
    let topics = this.state.topics
    for (let i = 0; i < topics.length; i++) {
      finalTopics.push(topics[i].id)
    }
    // TODO: catch missing info provided
    addQuestion(question, finalTopics, difficulty, answers, correctAnswer, image).then(res => {
      if (res.error) {
        return
      }
      this.clearQuestionForm()
      this.getQuestions()
    })
  }

  clearQuestionForm = () => {
    this.setState({
      answer1: '',
      answer2: '',
      answer3: '',
      difficulty: '',
      answer4: '',
      correctAnswer: '',
      question: '',
      topics: [],
    })
  }

  deleteQuestion = (id, index) => {
    // search through and remove in UI
    let copied = this.state.questions.slice()
    let original = this.state.questions
    copied.splice(index, 1)
    this.setState({
      questions: copied,
    })
    deleteQuestion(id).then(res => {
      if (res.error) {
        this.setState({
          questions: original,
        })
        return
      }
    })
  }

  showAddContainer = () => {
    this.setState({
      showAddContainerStatus: !this.state.showAddContainerStatus,
    })
  }

  handleDeselect = index => {
    let topics = this.state.topics.slice()
    topics.splice(index, 1)
    this.setState({ topics })
  }

  handleSelectionChange = topics => {
    this.setState({ topics })
  }

  updateState = event => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  updateFilter = event => {
    this.setState(
      {
        [event.target.id]: event.target.value,
      },
      () => {
        this.getQuestions()
      },
    )
  }

  updateFilterTopics = event => {
    this.setState(
      {
        filterTopics: [parseInt(event.target.value)],
      },
      () => {
        this.getQuestions()
      },
    )
  }

  /**
   * Key listener to login on 'enter'
   */
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.addQuestion()
    }
  }

  render() {
    let multiselectStyles = {
      button: 'questions-addContainer-multiselect__button',
      buttonActive: 'questions-addContainer-multiselect__button--active',
      filter: 'questions-addContainer-multiselect__filter',
      select: 'questions-addContainer-multiselect__select',
    }
    return (
      <div className="questions">
        <div className="questions-questionsContainer">
          <div className="questions-headerContainer">
            <h1 className="questions-headerContainer-title">Questions</h1>
          </div>
          <div className="questions-addButtonContainer">
            <h2 className="questions-addButtonContainer-icon" onClick={this.showAddContainer}>
              {this.state.showAddContainerStatus ? 'x' : '+'}
            </h2>
          </div>
        </div>
        {this.state.showAddContainerStatus && (
          <div className="questions-addContainer">
            <div className="column">
              <textarea
                className="questions-addContainer-textarea"
                id="question"
                onChange={this.updateState}
                placeholder="Question"
                type="text"
                value={this.state.question}
              />
              <div className="row">
                <input
                  className="questions-addContainer-input"
                  id="difficulty"
                  onChange={this.updateState}
                  placeholder="Difficulty (1-3)"
                  value={this.state.difficulty}
                />
                <input
                  className="questions-addContainer-input"
                  id="correctAnswer"
                  onChange={this.updateState}
                  placeholder="Correct Answer"
                  value={this.state.correctAnswer}
                />
                <input
                  className="questions-addContainer-input"
                  id="answer1"
                  onChange={this.updateState}
                  placeholder="Answer 1"
                  value={this.state.answer1}
                />
              </div>
              <div className="row">
                <input
                  className="questions-addContainer-input"
                  id="answer2"
                  onChange={this.updateState}
                  placeholder="Answer 2"
                  value={this.state.answer2}
                />
                <input
                  className="questions-addContainer-input"
                  id="answer3"
                  onChange={this.updateState}
                  placeholder="Answer 3"
                  value={this.state.answer3}
                />
                <input
                  className="questions-addContainer-input"
                  id="answer4"
                  onChange={this.updateState}
                  placeholder="Answer 4"
                  value={this.state.answer4}
                />
              </div>
              <div className="row">
                <FilteredMultiSelect
                  className="questions-addContainer-multiselect"
                  classNames={multiselectStyles}
                  onChange={this.handleSelectionChange}
                  options={this.state.availableInterests}
                  selectedOptions={this.state.topics}
                  textProp="name"
                  valueProp="id"
                />
                <div className="questions-addContainer-selectedTopics">
                  {this.state.topics.length === 0 && <p>(nothing selected yet)</p>}
                  {this.state.topics.length > 0 && (
                    <ul>
                      {this.state.topics.map((topic, i) => (
                        <li key={topic.id}>
                          {`${topic.name} `}
                          <button
                            className="questions-addContainer-selectedTopics-delete"
                            onClick={() => this.handleDeselect(i)}
                            type="button"
                          >
                            &times;
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <button className="questions-addContainer-button" onClick={this.addQuestion}>
              Submit
            </button>
          </div>
        )}
        <div className="questions-listContainer">
          <h3>Filters</h3>
          <div className="questions-listContainer-filters">
            <div className="questions-listContainer-filters-category">
              <h5>Difficulty</h5>
              <select
                className="questions-listContainer-filters-category-select"
                id="filterDifficulty"
                onChange={this.updateFilter}
              >
                <option value={null}>Select</option>
                {this.state.difficultyOptions.map(difficulty => (
                  <option value={difficulty.value} key={`filterDifficulty${difficulty.value}${difficulty.label}`}>
                    {difficulty.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="questions-listContainer-filters-category">
              <h5>Topic</h5>
              <select
                className="questions-listContainer-filters-category-select"
                id="filterTopics"
                onChange={this.updateFilterTopics}
              >
                <option value={null}>Select</option>
                {this.state.availableInterests.map(topic => (
                  <option value={topic.id} key={`filterTopics${topic.id}${topic.name}`}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="questions-listContainer-filters-category">
              <h5>Created By</h5>
              <select
                className="questions-listContainer-filters-category-select"
                id="filterCreatedBy"
                onChange={this.updateFilter}
              >
                <option value={null}>Select</option>
                {this.state.admins.map(admin => (
                  <option value={admin.id} key={`filterCreatedBy${admin.id}${admin.usernmae}`}>
                    {admin.username}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {this.state.questions.map((question, index) => (
            <div className="questions-listContainer-questionContainer" key={`questionsList-${question.id}`}>
              <div className="fullWidth">
                <h3 className="questions-listContainer-questionContainer-name">Difficulty: {question.difficulty}</h3>
                <h3 className="questions-listContainer-questionContainer-name">
                  Topics:
                  {question.topics.map(topic => ' ' + this.state.interests[topic] + ',')}
                </h3>
                <h3 className="questions-listContainer-questionContainer-question">{question.question}</h3>
                <div className="row questions-listContainer-questionContainer-answers">
                  {question.answers.map(answer => (
                    <h3
                      key={`questionList-answer-${question.id}-${answer}`}
                      style={answer === question.correctAnswer[0] ? { color: 'green' } : {}}
                    >
                      {answer}
                    </h3>
                  ))}
                </div>
              </div>
              <h3
                className="questions-listContainer-questionContainer-delete"
                onClick={() => {
                  this.deleteQuestion(question.id, index)
                }}
              >
                x
              </h3>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

Questions.defaultProps = {
  user: null,
}

Questions.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

Questions.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Questions)
