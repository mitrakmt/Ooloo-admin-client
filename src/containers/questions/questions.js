import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getQuestions, addQuestion, deleteQuestion } from 'utils/questions';
import { getInterests } from 'utils/interests';

import FilteredMultiSelect from 'react-filtered-multiselect';

import './questions.css';

class Questions extends Component {
    static defaultProps = {
        user: null
    }

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            interests: {},
            availableInterests: [],
            questions: [],
            question: '',
            topics: [],
            difficulty: '',
            answers: [],
            correctAnswer: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            image: null
        };
    }

    componentWillMount() {
        getInterests()
            .then(interests => {
                let newInterests = {}
                for (let i = 0; i < interests.length; i++) {
                    newInterests[interests[i].id] = interests[i].name
                }
                this.setState({
                    interests: newInterests,
                    availableInterests: interests
                })
            })
        this.getQuestions()
    }

    getQuestions = () => {
        getQuestions()
            .then(questions => {
                this.setState({
                    questions,
                    question: ''
                })
            })
    }

    addQuestion = () => {
        let question = this.state.question
        let topics = this.state.topics
        let finalTopics = []
        let difficulty = this.state.difficulty
        let answers = [
            this.state.answer1,
            this.state.answer2,
            this.state.answer3,
            this.state.answer4
        ]
        let correctAnswer = this.state.correctAnswer
        let image = this.state.image
        for (let i = 0; i < topics.length; i++) {
            finalTopics.push(topics[i].id)
        }
        // TODO: catch missing info provided
        addQuestion(question, finalTopics, difficulty, answers, correctAnswer, image)
            .then(res => {
                if (res.error) {
                    return;
                }
                this.getQuestions()
            })
    }

    deleteQuestion = (id, index) => {
        // search through and remove in UI
        let original = this.state.questions
        let copied = this.state.questions.slice()
        copied.splice(index, 1)
        this.setState({
            questions: copied
        })
        deleteQuestion(id)
            .then(res => {
                if (res.error) {
                    this.setState({
                        questions: original
                    })
                    return;
                }
            })
    }

    showAddContainer = () => {
        this.setState({
            showAddContainerStatus: !this.state.showAddContainerStatus
        })
    }

    handleDeselect = (index) => {
        let topics = this.state.topics.slice()
        topics.splice(index, 1)
        this.setState({topics})
    }
     
    handleSelectionChange = (topics) => {
        this.setState({topics})
    }

    updateState = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    /**
        * Key listener to login on 'enter'
     */
    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.addQuestion()
        }
    }

    render() {
        let multiselectStyles = {
            button: 'questions-addContainer-multiselect__button',
            buttonActive: 'questions-addContainer-multiselect__button--active',
            filter: 'questions-addContainer-multiselect__filter',
            select: 'questions-addContainer-multiselect__select'
          }
        return (
            <div className="questions">
                <div className="questions-questionsContainer">
                    <div className="questions-headerContainer">
                        <h1 className="questions-headerContainer-title">Questions</h1>
                    </div>
                    <div className="questions-addButtonContainer">
                        <h2 className="questions-addButtonContainer-icon" onClick={this.showAddContainer}>{ this.state.showAddContainerStatus ? 'x' : '+' }</h2>
                    </div>
                </div>
                {
                    this.state.showAddContainerStatus &&
                        <div className="questions-addContainer">
                            <div className="column">
                                <textarea className="questions-addContainer-textarea" type="text" placeholder="question" id="question" onChange={this.updateState} value={this.state.question} />
                                <div className="row">
                                    <input className="questions-addContainer-input" type="text" placeholder="Difficulty (1-3)" id="difficulty" onChange={this.updateState} value={this.state.difficulty} />
                                    <input className="questions-addContainer-input" type="text" placeholder="Correct Answer" id="correctAnswer" onChange={this.updateState} value={this.state.correctAnswer} />
                                    <input className="questions-addContainer-input" type="text" placeholder="Answer 1" id="answer1" onChange={this.updateState} value={this.state.answer1} /> 
                                </div>
                                <div className="row">
                                    <input className="questions-addContainer-input" type="text" placeholder="Answer 2" id="answer2" onChange={this.updateState} value={this.state.answer2} />
                                    <input className="questions-addContainer-input" type="text" placeholder="Answer 3" id="answer3" onChange={this.updateState} value={this.state.answer3} />
                                    <input className="questions-addContainer-input" type="text" placeholder="Answer 4" id="answer4" onChange={this.updateState} value={this.state.answer4} />
                                </div>
                                <div className="row">
                                    <FilteredMultiSelect
                                        onChange={this.handleSelectionChange}
                                        options={this.state.availableInterests}
                                        selectedOptions={this.state.topics}
                                        textProp="name"
                                        valueProp="id"
                                        className="questions-addContainer-multiselect"
                                        classNames={multiselectStyles}
                                    />
                                    <div className="questions-addContainer-selectedTopics">
                                        {this.state.topics.length === 0 && <p>(nothing selected yet)</p>}
                                        {this.state.topics.length > 0 && <ul>
                                            {this.state.topics.map((topic, i) => <li key={topic.id}>
                                            {`${topic.name} `}
                                            <button type="button" className="questions-addContainer-selectedTopics-delete" onClick={() => this.handleDeselect(i)}>
                                                &times;
                                            </button>
                                            </li>)}
                                        </ul>}
                                    </div>
                                </div>
                            </div>
                            <button className="questions-addContainer-button" onClick={this.addQuestion}>Submit</button>
                        </div>
                }
                <div className="questions-listContainer">
                    {
                        this.state.questions.map((question, index) => (
                            <div className="questions-listContainer-questionContainer" key={`questionsList-${ question.id }`}>
                                <div className="fullWidth">
                                    <h3 className="questions-listContainer-questionContainer-name">
                                        Difficulty: {question.difficulty}
                                    </h3>
                                    <h3 className="questions-listContainer-questionContainer-question">{question.question}</h3>
                                    <h3 className="questions-listContainer-questionContainer-name">
                                        Topics: 
                                        {
                                            question.topics.map(topic => ( ' ' + this.state.interests[topic] + ',' ))
                                        }
                                    </h3>
                                    <div className="row questions-listContainer-questionContainer-answers">
                                        {
                                            question.answers.map(answer => (
                                                <h3 key={`questionList-answer-${question.id}-${answer}`}>{ answer }</h3>
                                            ))
                                        }
                                    </div>
                                    <div className="row">
                                        <p className="questions-listContainer-questionContainer-correctAnswer">Correct Answer: { question.correctAnswer }</p>
                                    </div>
                                </div>
                                <h3 className="questions-listContainer-questionContainer-delete" onClick={() => {this.deleteQuestion(question.id, index)}}>x</h3>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Questions);
