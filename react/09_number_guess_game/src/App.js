import {useState} from 'react';
import {Routes,Route,useNavigate} from 'react-router-dom';
import './App.css';
import StartPage from './StartPage';
import GamePage from './GamePage';

function App() {
	
	const navigate = useNavigate();
	
	const [state,setState] = useState({
		player_name:"",
		target_number:0,
		top_list:[]
	});
	
	const startGame = (name) => {
		if(!name) {
			return;
		}
		let target_number = Math.floor(Math.random()*100)+1;
		setState((state) => {
			return {
				...state,
				target_number:target_number,
				player_name:name
			}
		})
		navigate("/game");
	}
	
	const resetGame = (win) => {
		alert("Congrats "+win.playername+"! You win with "+win.result+" guesses")
		setState((state) => {
			return {
				target_number:0,
				player_name:"",
				top_list:state.top_list.concat(win)
			}
		})
		navigate("/");
	}
	
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<StartPage 
						startGame={startGame} toplist={state.top_list}/>}/>
				<Route path="/game" element={<GamePage 
					player_name={state.player_name} target_number={state.target_number} resetGame={resetGame}/>}/>
			</Routes>
		</div>
	);
}

export default App;
