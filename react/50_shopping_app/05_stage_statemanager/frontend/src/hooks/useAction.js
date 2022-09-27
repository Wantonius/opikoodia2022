import {useState,useEffect,useContext} from 'react';
import ActionContext from '../context/ActionContext';
import * as ActionConstants from '../types/actionConstants';
import useAppState from './useAppState';

const useAction = () => {
	
	const action = useContext(ActionContext);
	const [state,setState] = useState({
		url:"",
		request:{},
		action:""
	})
	
	const {token} = useAppState();
	
	//backend communication using useEffect
	
	useEffect(() => {
		
		const contactBackend = async () => {
			if(!state.url) {
				return;
			}
			action.dispatch({
				type:ActionConstants.LOADING
			})
			let response = await fetch(state.url,state.request);
			action.dispatch({
				type:ActionConstants.STOP_LOADING
			})
			if(!response) {
				action.dispatch({
					type:ActionConstants.LOGOUT_FAILED,
					error:"There was an error with the connection. Logging you out!"
				})
			}
			if(response.ok) {
				switch(state.action) {
					case "register":
						action.dispatch({
							type:ActionConstants.REGISTER_SUCCESS
						})
						return;
					case "login":
						let data = await response.json();
						if(!data) {
							action.dispatch({
								type:ActionConstants.LOGIN_FAILED,
								error:"Failed to parse login information"
							})
							return;
						}
						action.dispatch({
							type:ActionConstants.LOGIN_SUCCESS,
							token:data.token
						})
						return;
					case "logout":
						action.dispatch({
							type:ActionConstants.LOGOUT_SUCCESS
						})
						return;
					case "getlist":
						let list = await response.json();
						if(!list) {
							action.dispatch({
								type:ActionConstants.FETCH_LIST_FAILED,
								error:"Failed to parse shopping information"
							})
							return;
						}
						action.dispatch({
							type:ActionConstants.FETCH_LIST_SUCCESS,
							list:list
						})
						return;
					case "add":
						action.dispatch({
							type:ActionConstants.ADD_ITEM_SUCCESS
						})
						getList();
						return;
					case "remove":
						action.dispatch({
							type:ActionConstants.REMOVE_ITEM_SUCCESS
						})
						getList();
						return;				
					case "edit":
						action.dispatch({
							type:ActionConstants.EDIT_ITEM_SUCCESS
						})
						getList();
						return;
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					action.dispatch({
						type:ActionConstants.LOGOUT_FAILED,
						error:"Your session has expired. Logging you out!"
					})
					return;
				}
				switch(state.action) {
					case "register":
						if(response.status === 409) {
							action.dispatch({
								type:ActionConstants.REGISTER_FAILED,
								error:"Username is already in use"
							})
						} else {
							action.dispatch({
								type:ActionConstants.REGISTER_FAILED,
								error:"Register failed. Server responded with a status "+response.status+" "+response.statusText
							})
						}
						return;
					case "login":
						action.dispatch({
							type:ActionConstants.LOGIN_FAILED,
							error:"Login failed. Server responded with a status "+response.status+" "+response.statusText
						})
						return;
					case "logout":
						action.dispatch({
							type:ActionConstants.LOGOUT_FAILED,
							error:"Removing session failed. Logging you out!"
						})
						return;
					case "getlist":
						action.dispatch({
							type:ActionConstants.FETCH_LIST_FAILED,
							error:"Server responded with a status "+response.status+" "+response.statusText
						})
						return;
					case "add":
						action.dispatch({
							type:ActionConstants.ADD_ITEM_FAILED,
							error:"Server responded with a status "+response.status+" "+response.statusText
						})
						return;
					case "remove":
						action.dispatch({
							type:ActionConstants.REMOVE_ITEM_FAILED,
							error:"Server responded with a status "+response.status+" "+response.statusText
						})
						return;
					case "edit":
						action.dispatch({
							type:ActionConstants.EDIT_ITEM_FAILED,
							error:"Server responded with a status "+response.status+" "+response.statusText
						})
						return;
					default:
						return;
				}
			}
		}
		
		contactBackend();
	},[state])
	
	//Action generators for components
	
	const register = (user) => {
		setState({
			url:"/register",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"register"
		})
	}
	
	const login = (user) => {
		setState({
			url:"/login",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"login"
		})		
	}
	
	const logout = () => {
		setState({
			url:"/logout",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json",
				"token":token}
			},
			action:"logout"
		})
	}
	
	const getList = () => {
		setState({
			url:"/api/shopping",
			request:{
				method:"GET",
				headers:{"Content-Type":"application/json",
				"token":token}
			},
			action:"getlist"
		})
	}

	const add = (item) => {
		setState({
			url:"/api/shopping",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json",
				"token":token},
				body:JSON.stringify(item)
			},
			action:"add"
		})
	}
	
	const remove = (id) => {
		setState({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				headers:{"Content-Type":"application/json",
				"token":token}
			},
			action:"remove"
		})
	}
	
	const edit = (item) => {
		setState({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				headers:{"Content-Type":"application/json",
				"token":token},
				body:JSON.stringify(item)
			},
			action:"edit"
		})
	}

	return {register,login,logout,getList,add,remove,edit}
}

export default useAction;