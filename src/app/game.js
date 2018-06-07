import React, {Component} from 'react'; 
import io from 'socket.io-client';


class Game extends Component{
	constructor(props){
		super(props); 
		this.state = {};
	}
	componentDidMount(){
		console.log('connecting'); 
		const socket = io('http://localhost:3001/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTI4MzQzMDExfQ.Vr6rFksDbL6HZw8FMg5N6O7RhPD1un8S_ZN6WEao9Ac');
		socket.on('gameStart', (gameData)=>{
			console.log('gameStarted: ', gameData); 
			this.setState({playerIndex: gameData.playerIndex}); 
		});
		socket.on('answerResults', (answerResult)=>{
			console.log('answerResult: ', answerResult); 
		});
		socket.on('gameResults', (results)=>{
			console.log('results: ', results); 
		});
		socket.on('question', (question)=>{
			this.setState({...question}); 
			console.log('question: ', question); 
		});
		this.setState({socket});
	}
	submitAnswer(answer){
		this.state.socket.emit('answer', {answer, questionNumber: this.state.questionNumber, playerIndex: this.state.playerIndex});
	}
	render(){
		console.log(this.state); 
		const {question, possibleAnswers} = this.state; 
		return(
			<div>
			<h1>
				Game
			</h1>
			{(question && 
				<div> Question: {question}</div>
			)}
			{(possibleAnswers &&
				<div>
					{possibleAnswers.map((answer)=>{
						return(
							<button
								key={answer}
								onClick={()=>this.submitAnswer(answer)}
							>
								{answer}
							</button>
						);
					})}
				</div>
			)}
			</div>
		);
	}
}



export default Game; 