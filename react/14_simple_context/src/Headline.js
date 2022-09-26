import {useContext} from 'react';
import {ThemeContext} from './ThemeContext';

const Headline = (props) => {
	
	const theme = useContext(ThemeContext);
	
	return (
		<h1 style={{
			color:theme.color,
			backgroundColor:theme.backgroundColor
		}}>
		{props.children}
		</h1>
	)
}

export default Headline;