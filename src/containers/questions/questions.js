import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getQuestions, addQuestion, deleteQuestion } from 'utils/questions';

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
            questions: [],
            question: '',
            topics: [],
            difficulty: 1,
            answers: [],
            correctAnswer: '',
            image: null
        };
    }

    componentWillMount() {
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
        let difficulty = this.state.difficulty
        let answers = this.state.answers
        let correctAnswer = this.state.correctAnswer
        let image = this.state.image
        // TODO: catch missing info provided
        addQuestion(question, topics, difficulty, answers, correctAnswer, image)
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
                                <input className="questions-addContainer-input" type="text" placeholder="question" id="question" onChange={this.updateState} value={this.state.question} onKeyPress={this.handleKeyPress} />
                            </div>
                            <button className="questions-addContainer-button" onClick={this.addQuestion}>Submit</button>
                        </div>
                }
                <div className="questions-listContainer">
                    {
                        this.state.questions.map((question, index) => (
                            <div className="questions-listContainer-questionContainer" key={`questionsList-${question.id}`}>
                                <div>
                                    <h3 className="questions-listContainer-questionContainer-name">{ question.question }</h3>
                                    <div className="row">
                                        <p className="questions-listContainer-questionContainer-info">{question.answer}</p>
                                    </div>
                                </div>
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
