import {loading,stopLoading,clearState} from './loginActions';

//Action constants

export const FETCH_LIST_SUCCESS = "FETCH_LIST_SUCCESS";
export const FETCH_LIST_FAILED = "FETCH_LIST_FAILED";
export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
export const ADD_ITEM_FAILED = "ADD_ITEM_FAILED";
export const REMOVE_ITEM_SUCCESS = "REMOVE_ITEM_SUCCESS";
export const REMOVE_ITEM_FAILED = "REMOVE_ITEM_FAILED";
export const EDIT_ITEM_SUCCESS = "EDIT_ITEM_SUCCESS";
export const EDIT_ITEM_FAILED = "EDIT_ITEM_FAILED";

//ASync Actions

export const getList = (token) => {
	return async (dispatch) => {
		let request = {
			method:"GET",
			headers:{"Content-Type":"application/json",
					"token":token}
		}
		dispatch(loading());
		let response = await fetch("/api/shopping",request);
		dispatch(stopLoading());
		if(!response) {
			dispatch(fetchListFailed("There was an error with the connection. Fetching shopping information failed!"));
			return;
		}
		if(response.ok) {
			let data = await response.json();
			if(!data) {
				dispatch(fetchListFailed("Failed to parse shopping information"));
				return;
			}
			dispatch(fetchListSuccess(data));
		} else {
			if(response.status === 403) {
				dispatch(clearState());
				dispatch(fetchListFailed("Your session has expired. Logging you out!"));
			} else {
				dispatch(fetchListFailed("Fetching shopping information failed. Server responded with a status "+response.status+" "+response.statusText));
			}
		}
	}
}

//Action Creators

const fetchListSuccess = (list) => {
	return {
		type:FETCH_LIST_SUCCESS,
		list:list
	}
}

const fetchListFailed = (error) => {
	return {
		type:FETCH_LIST_FAILED,
		error:error
	}
}

const addItemSuccess = () => {
	return {
		type:ADD_ITEM_SUCCESS
	}
}

const addItemFailed = (error) => {
	return {
		type:ADD_ITEM_FAILED,
		error:error
	}
}

const removeItemSuccess = () => {
	return {
		type:REMOVE_ITEM_SUCCESS
	}
}

const removeItemFailed = (error) => {
	return {
		type:REMOVE_ITEM_FAILED,
		error:error
	}
}

const editItemSuccess = () => {
	return {
		type:EDIT_ITEM_SUCCESS
	}
}

const editItemFailed = (error) => {
	return {
		type:EDIT_ITEM_FAILED,
		error:error
	}
}