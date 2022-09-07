import {useState} from 'react';

const GamePage = (props) => {
	
	const [state,setState] = useState({
		currentGuess:0,
		numberOfGuesses:0,
		maximumGuess:100,
		minimumGuess:1,
		message:"Guess between 1 and 100"
	})
	
	const guess = () => {
		if(isNaN(state.currentGuess)) {
			setState((state) => {
				return {
					...state,
					message:"Guess a NUMBER between "+state.minimumGuess+" and "+state.maximumGuess+"! Please!"
				}
			})
			return;
		}
		if(state.currentGuess < state.minimumGuess || state.currentGuess > state.maximumGuess) {
			setState((state) => {
				return {
					...state,
					message:"Guess a number between "+state.minimumGuess+" and "+state.maximumGuess+"! Please!"
				}
			})
			return;			
		}
		if(state.currentGuess > state.minimumGuess && state.currentGuess < props.target_number) {
			setState((state) => {
				return {
					...state,
					numberOfGuesses:state.numberOfGuesses+1,
					minimumGuess:state.currentGuess,
					message:"Too low. Guess again between "+state.currentGuess+" and "+state.maximumGuess+". Please!"
				}
			})
			return;
		}
		if(props.target_number < state.currentGuess && state.currentGuess < state.maximumGuess) {
			setState((state) => {
				return {
					...state,
					numberOfGuesses:state.numberOfGuesses+1,
					maximumGuess:state.currentGuess,
					message:"Too high. Guess again between "+state.minimumGuess+" and "+state.currentGuess+". Please!"
				}
			})
			return;
		}
		let temp = parseInt(state.currentGuess);
		if(temp === props.target_number) {
			props.resetGame({
				playername:props.player_name,
				result:state.numberOfGuesses
			})
			setState({
				currentGuess:0,
				numberOfGuesses:0,
				maximumGuess:100,
				minimumGuess:1,
				message:"Guess between 1 and 100"
			})
		}
	}
	
	const onChange = (event) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	return(
	<div>
		<h2>Game Page</h2>
		<p>{state.message}</p>
		<label htmlFor="guess">Guess a number:</label>
		<input type="number"
				id="guess"
				name="currentGuess"
				onChange={onChange}
				value={state.currentGuess}/>
		<br/>
		<button onClick={guess}>Guess</button>
	</div>
	)
}

export default GamePage;