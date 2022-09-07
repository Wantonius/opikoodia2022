import {useState} from 'react';

const StartPage = (props) => {
	
	const [state,setState] = useState({
		playername:""
	});
	
	const onChange = (event) => {
		setState((state) => {
			return {
				[event.target.name]:event.target.value
			}
		})
	}
	
	const startGame = () => {
		props.startGame(state.playername);
	}
	
	let toplist = props.toplist.map((item) => {
		return(
			<li>Name:{item.playername} Result:{item.result}</li>
		)
	})
	
	return(
		<div>
			<h2>Welcome to number guess game!</h2>
			<p>Try to guess a number between 1-100 with least amount of guesses.</p>
			<label htmlFor="playername">Please Enter Your Name</label>
			<input type="text"
					id="playername"
					name="playername"
					onChange={onChange}
					value={state.playername}/>
			<br/>
			<button onClick={startGame}>Start Game</button>
			<hr/>
			<h2>Best guessers</h2>
			<ul style={{listStyleType:"decimal"}}>
				{toplist}
			</ul>
		</div>
	)
}

export default StartPage;