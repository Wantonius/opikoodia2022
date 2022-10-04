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
	
}