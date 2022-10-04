import ShoppingItem from '../models/ShoppingItem';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import * as actionConstants from '../types/actionConstants';

export const getList = (token:string) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request = new Request("/api/shopping",
		{
			method:"GET",
			headers:{"Content-Type":"application/json",
			"token":token}
		})
		handleFetch(request,"getlist",dispatch,token);
	}
}

export const add = (token:string,item:ShoppingItem) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request = new Request("/api/shopping",
		{
			method:"POST",
			headers:{"Content-Type":"application/json",
			"token":token},
			body:JSON.stringify(item)
		})
		handleFetch(request,"add",dispatch,token);
	}
}

export const remove = (token:string,id:number|string) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request = new Request("/api/shopping/"+id,
		{
			method:"DELETE",
			headers:{"Content-Type":"application/json",
			"token":token}
		})
		handleFetch(request,"remove",dispatch,token);
	}
}

export const edit = (token:string,item:ShoppingItem) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request = new Request("/api/shopping/"+item.id,
		{
			method:"PUT",
			headers:{"Content-Type":"application/json",
			"token":token},
			body:JSON.stringify(item)
		})
		handleFetch(request,"edit",dispatch,token);
	}
}

const handleFetch = async (req:Request,act:string,dispatch:ThunkDispatch<any,any,AnyAction>,token:string) => {
	
}