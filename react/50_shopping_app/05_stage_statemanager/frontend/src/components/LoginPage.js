import {useState} from 'react';
import useAction from '../hooks/useAction';
const LoginPage = (props) => {
	
	const {register,login} = useAction();
	
	const [state,setState] = useState({
		username:"",
		password:""
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
		if(state.username.length < 4 || state.password.length < 8) {
			return;
		}
		let user = {
			...state
		}
		if(event.target.name === "register") {
			register(user);
		} else {
			login(user);
		}
	}
	
	return(
	<div style={{
		"width":"40%",
		"backgroundColor":"lightblue",
		"margin":"auto"
	}}>
		<form className="mb-3">
			<label htmlFor="username" className="form-label">Username</label>
			<input type="text"
					name="username"
					id="username"
					className="form-control"
					onChange={onChange}
					value={state.username}/>
			<label htmlFor="password" className="form-label">Password</label>
			<input type="password"
					name="password"
					id="password"
					className="form-control"
					onChange={onChange}
					value={state.password}/>
			<button className="btn btn-primary" onClick={onSubmit} name="register">Register</button>
			<button className="btn btn-secondary" onClick={onSubmit} name="login">Login</button>
		</form>
	</div>
	)
}

export default LoginPage;