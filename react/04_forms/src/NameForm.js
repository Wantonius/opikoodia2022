import {useState} from 'react';

const NameForm = (props) => {
	
	const [state,setState] = useState({
		firstname:"",
		lastname:""
	})
	
	const onChange = (event) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}			
		})	
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		let name = state.firstname+" "+state.lastname;
		props.setGreeting(name);
	}
	
	return(
		<form onSubmit={onSubmit}>
			<label htmlFor="firstname">First name:</label>
			<input type="text"
					name="firstname"
					id="firstname"
					onChange={onChange}
					value={state.firstname}/>
			<br/>
			<label htmlFor="lastname">Last name:</label>
			<input type="text"
					name="lastname"
					id="lastname"
					onChange={onChange}
					value={state.lastname}/>
			<br/>
			<input type="submit" value="Greet"/>
		</form>
	)
}

export default NameForm;

