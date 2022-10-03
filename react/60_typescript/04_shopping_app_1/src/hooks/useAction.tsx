import React,{useReducer,useEffect,useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface AppState {
	list:ShoppingItem[],
	loading:boolean
}

interface FetchState {
	request:Request
}

const initialState:AppState = {
	list:[],
	loading:false
}

type Action = {
	type:string,
	payload?:any
}

const listReducer = (state:AppState,action:Action) => {
	switch(action.type) {
		case "LOADING":
			return {
				...state,
				loading:true
			}
		case "STOP_LOADING":
			return {
				...state,
				loading:false
			}
		case "FETCH_DONE":
			if(action.payload) {
				return {
					...state,
					list:action.payload as ShoppingItem[]
				}
			} else {
				return state;
			}
		default:
			return state;
	}
}

export const useAction = ():[ShoppingItem[],boolean,(item:ShoppingItem) => void,(id:number) => void] => {
	
	const [urlRequest,setUrlRequest] = useState<FetchState>({
		request:new Request("",{})
	}) 
	
	const [state,dispatch] = useReducer(listReducer,initialState);
	
	useEffect(() => {
		if(!urlRequest.request) {
			return;
		}
		
		const fetchData = async () => {
			dispatch({type:"LOADING"});
			const response = await fetch(urlRequest.request);
			dispatch({type:"STOP_LOADING"});
			if(!response) {
				return;
			}
			if(response.ok) {
				if(urlRequest.request.method === "GET") {
					const data = await response.json();
					dispatch({
						type:"FETCH_DONE",
						payload:data
					})
				} else {
					getList();
				}
			} else {
				console.log("Server responded with a status ",response.status,response.statusText)
			}
			
		}
		
		fetchData();
	},[urlRequest.request])

	const getList = () => {
		let tempRequest = new Request("/api/shopping",{
			method:"GET"
		})
		setUrlRequest({
			request:tempRequest
		})
	}

	const addToList = (item:ShoppingItem) => {
		let tempRequest:Request = new Request("/api/shopping",
		{
			method:"POST",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify(item)
		})
		setUrlRequest({
			request:tempRequest
		})
	}
	
	const removeFromList = (id:number) => {
		let tempRequest:Request = new Request("/api/shopping/"+id,{
			method:"DELETE"
		})
		setUrlRequest({
			request:tempRequest
		})
	}
	
	return [state.list,state.loading,addToList,removeFromList];
}