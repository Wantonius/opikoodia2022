import {useContext} from 'react';
import {ThemeContext} from './ThemeContext';

const Paragraph = (props) => {
	
	const theme = useContext(ThemeContext);
	
	return (
		<p style={{
			color:theme.color,
			backgroundColor:theme.backgroundColor
		}}>
		{props.children}
		</p>
	)
}

export default Paragraph;