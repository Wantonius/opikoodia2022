import logo from './logo.svg';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';

function App() {
	
	const dispatch = useDispatch();
	const count = useSelector(state => state.count);
	
	const increment = () => {
		console.log("App - increment()");
		dispatch({
			type:"INCREMENT"
		})
	}
	
	const decrement = () => {
		console.log("App - decrement()");
		dispatch({
			type:"DECREMENT"
		})
	}
	
	return (
		<div className="App">
			<h2>Count:{count}</h2>
			<button onClick={increment}>Increment</button>
			<button onClick={decrement}>Decrement</button>
		</div>
	);
}

export default App;
