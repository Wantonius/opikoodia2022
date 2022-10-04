import * as actionConstants from '../types/actionConstants';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import User from '../models/User';
interface Token {
	token:string
}

export const register = (user:User) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request:Request = new Request("/register",{
			method:"POST",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify(user)
		})
		handleLogin(request,"register",dispatch);
	}
}

export const login = (user:User) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request:Request = new Request("/login",{
			method:"POST",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify(user)
		})
		handleLogin(request,"login",dispatch);
	}
}

export const logout = (token:string) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request:Request = new Request("/logout",{
			method:"POST",
			headers:{"Content-Type":"application/json",
			"token":token}
		})
		handleLogin(request,"logout",dispatch)
	}
}

const handleLogin = async (request:Request,act:string,dispatch:ThunkDispatch<any,any,AnyAction>) => {
	dispatch({
		type:actionConstants.LOADING
	})
	const response = await fetch(request);
	if(!response) {
		dispatch({
			type:actionConstants.CLEAR_STATE
		})
		dispatch({
			type:actionConstants.LOGOUT_FAILED,
			error:"There was an error with the connection to the server"
		})
		return;
	}
	if(response.ok) {
		switch(act) {
			case "register":
				dispatch({
					type:actionConstants.REGISTER_SUCCESS
				})
				return;
			case "login":
				const temp = await response.json()
				if(!temp) {
					dispatch({
						type:actionConstants.LOGIN_FAILED,
						error:"Failed to parse login information"
					})
					return;
				}
				let data = temp as Token;
				dispatch({
					type:actionConstants.LOGIN_SUCCESS,
					token:data.token
				})
				return;
			case "logout":
				dispatch({
					type:actionConstants.LOGOUT_SUCCESS
				})
				dispatch({
					type:actionConstants.CLEAR_STATE
				})
				return;
			default:
				return;
		}
	} else {
		switch(act) {
			case "register":
				if(response.status === 409) {
					dispatch({
						type:actionConstants.REGISTER_FAILED,
						error:"Username already in use"
					})
				} else {
					dispatch({
						type:actionConstants.REGISTER_FAILED,
						error:"Register failed. Server responded with a status "+response.status+" "+response.statusText
					})
				}
				return;
			case "login":
				dispatch({
					type:actionConstants.LOGIN_FAILED,
					error:"Login failed. Server responded with a status "+response.status+" "+response.statusText
				})
				return;
			case "logout":
				dispatch({
					type:actionConstants.CLEAR_STATE
				})
				dispatch({
					type:actionConstants.LOGOUT_FAILED,
					error:"Server responded with a status "+response.status+" "+response.statusText+". Logging you out."
					})
				return;
			default:
				return;
		}
	}
}