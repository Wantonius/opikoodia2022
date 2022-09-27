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
	
	useEffect(() => {},[state])
	
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