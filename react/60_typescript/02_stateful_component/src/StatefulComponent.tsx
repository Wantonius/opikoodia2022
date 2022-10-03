import React,{useState,useEffect} from 'react';

interface State {
	seconds:number;
	timer: ReturnType<typeof setInterval> | null;
}

const StatefulComponent:React.FC<{}> = (props) => {
	
	const [state,setState] = useState<State>({
		seconds:0,
		timer:null
	})

	const startTimer = ():void => {
		setState((state) => {
			return {
				...state,
				seconds:state.seconds+1
			}
			});
	}
	
	useEffect(() => {
		let interval = setInterval(startTimer,1000);
		setState((state) => {
			return {
				...state,
				timer:interval
			}
		})
		
		return () => clearInterval(interval);
	},[])
	
	return(
		<h1>{state.seconds} seconds since page loaded</h1>
	)
}

export default StatefulComponent;