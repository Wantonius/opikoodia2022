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
	
}

export default loginReducer;