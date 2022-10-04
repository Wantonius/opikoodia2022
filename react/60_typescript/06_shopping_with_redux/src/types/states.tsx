import ShoppingItem from '../models/ShoppingItem';

export interface LoginState {
	isLogged:boolean;
	token:string;
	error:string;
	loading:boolean;
}

export interface ShoppingState {
	list:ShoppingItem[];
	error:string;
}

export interface AppState {
	shopping:ShoppingState;
	login:LoginState;
}