import {useState} from 'react';

const LoginPage = (props) => {
	
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
			props.setError("Username must be atleast four characters and password eight characters long");
			return;
		}
		let user = {
			...state
		}
		if(event.target.name === "register") {
			props.register(user);
		} else {
			props.login(user);
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