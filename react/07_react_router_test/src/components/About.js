import {useNavigate} from 'react-router-dom';

const About = (props) => {
	
	const navigate = useNavigate();
	
	return (
		<div>
			<h2>This is an example of React Router</h2>
			<button onClick={() => navigate("/secret")}>To Secret Page</button>
		</div>
	)
}

export default About;