import {useState,useEffect} from 'react';

const StatefulComponent = (props) => {

	let [state,setState] = useState({
		seconds:0,
		timer:0
	})
	
	const startTimer = () => {
		setState((state) => {
			return {
				...state,
				seconds:state.seconds+1
			}
		})
	}
	
	useEffect(() => {
		let interval = setInterval(startTimer,1000);
		setState((state) => {
			return {
				...state,
				timer:interval
			}
		})
		
		return () => clear();
	},[])

	const clear = () => {
		clearInterval(state.timer);
	}
	
	return(
		<div>
			<h2>{state.seconds} seconds since you entered the page</h2>
		</div>
	)
}

export default StatefulComponent;





