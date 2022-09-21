export const LOADING = "LOADING";
export const STOP_LOADING = "STOP_LOADING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const CLEAR_STATE = "CLEAR_STATE";

//ASYNC ACTIONS

export const register = (user) => {
	return async (dispatch) => {
		let request = {
			method:"POST",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify(user)
		}
		dispatch(loading());
		let response = await fetch("/register",request);
		if(!response) {
			dispatch(registerFailed("There was an error with the server connection. Register failed."));
			return;
		}
		if(response.ok) {
			dispatch(registerSuccess());
		} else {
			if(response.status === 409) {
				dispatch(registerFailed("Username already in use"));
			} else {
				dispatch(registerFailed("Register failed. Server responded with a status "+response.status+" "+response.statusText));
			}
		}
	}
}

export const login = (user) => {
	return async (dispatch) => {
		let request = {
			method:"POST",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify(user)
		}
		dispatch(loading());
		let response = await fetch("/login",request);
		if(!response) {
			dispatch(loginFailed("There was an error with the connection to server. Login failed."))
			return;
		}
		if(response.ok) {
			let data = await response.json();
			if(!data) {
				dispatch(loginFailed("Failed to parse login information. Login failed."))
				return;
			}
			dispatch(loginSuccess(data.token));
		} else {
			dispatch(loginFailed("Login failed. Server responded with a status "+response.status+" "+response.statusText));
		}
	}

}

export const logout = (token) => {
	return async (dispatch) => {
		let request = {
			method:"POST",
			headers:{"Content-Type":"application/json",
			"token":token}
		}
		dispatch(loading());
		let response = await fetch("/logout",request);
		if(!response) {
			dispatch(clearState());
			dispatch(logoutFailed("There was an error with the connection to the server. Logging you out"));
			return;
		}
		if(response.ok) {
			dispatch(clearState());
			dispatch(logoutSuccess());
		} else {
			dispatch(clearState());
			dispatch(logoutFailed("Server responded with a status "+response.status+" "+response.statusText+". Logging you out!"))
		}
	}
}
//ACTION CREATORS

export const loading = () => {
	return {
		type:LOADING
	}
}

export const stopLoading = () => {
	return {
		type:STOP_LOADING
	}
}

const registerSuccess = () => {
	return {
		type:REGISTER_SUCCESS
	}
}

export const registerFailed = (error) => {
	return {
		type:REGISTER_FAILED,
		error:error
	}
}

const loginSuccess = (token) => {
	return {
		type:LOGIN_SUCCESS,
		token:token
	}
}

const loginFailed = (error) => {
	return {
		type:LOGIN_FAILED,
		error:error
	}
}

const logoutSuccess = () => {
	return {
		type:LOGOUT_SUCCESS
	}
}

const logoutFailed = (error) => {
	return {
		type:LOGOUT_FAILED,
		error:error
	}
}

export const clearState = () => {
	return {
		type:CLEAR_STATE
	}
}