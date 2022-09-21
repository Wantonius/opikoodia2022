import {
	LOADING,
	STOP_LOADING,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,
	CLEAR_STATE
} from '../actions/loginActions';

/* login state
	isLogged:boolean,
	token:string,
	loading:boolean,
	error:string
*/

const getInitialState = () => {
	if(sessionStorage.getItem("loginstate")) {
		let state = JSON.parse(sessionStorage.getItem("loginstate"));
		return state;
	} else {
		return {
			isLogged:false,
			token:"",
			loading:false,
			error:""
		}
	}
}

const saveToStorage = (state) => {
	sessionStorage.setItem("loginstate",JSON.stringify(state));
}

const initialState = getInitialState();

const loginReducer = (state = initialState, action) => {
	console.log("loginReducer. Action",action);
	let tempState = {};
	switch(action.type) {
		case LOADING:
			return {
				...state,
				loading:true,
				error:""
			}
		case STOP_LOADING:
			return {
				...state,
				loading:false
			}
		case REGISTER_SUCCESS:
			tempState = {
				...state,
				loading:false,
				error:"You successfully registered!"
			}
			saveToStorage(tempState);
			return tempState;
		case REGISTER_FAILED:
			tempState = {
				...state,
				loading:false,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case LOGIN_SUCCESS:
			tempState = {
				loading:false,
				isLogged:true,
				token:action.token,
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case LOGIN_FAILED:
			tempState = {
				...state,
				loading:false,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case LOGOUT_SUCCESS:
			tempState = {
				loading:false,
				token:"",
				isLogged:false,
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case LOGOUT_FAILED:
			tempState = {
				loading:false,
				token:"",
				isLogged:false,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case CLEAR_STATE:
			tempState = {
				loading:false,
				token:"",
				isLogged:false,
				error:""
			}
			saveToStorage(tempState);
			return tempState;			
		default:
			return state;
	}
}

export default loginReducer;