import React,{useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {useDispatch,useSelector} from 'react-redux';
import {remove,edit} from '../actions/shoppingActions';

interface ListState {
	login:{
		token:string;
	},
	shopping:{
		list:ShoppingItem[];
	}
}

interface State {
	removeIndex:number;
	editIndex:number;
}

const ShoppingList:React.FC<{}> = (props) => {
	
	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
	const appSelector = (state:ListState) => state

	const appState = useSelector(appSelector);
	
	const dispatch:ThunkDispatch<any,any,AnyAction> = useDispatch();
	
	const changeMode = (mode:string,index:number) => {
		if(mode === "remove") {
			setState({
				removeIndex:index,
				editIndex:-1
			})
		}
		if(mode === "edit") {
			setState({
				removeIndex:-1,
				editIndex:index
			})		
		}
		if(mode === "cancel") {
			setState({
				removeIndex:-1,
				editIndex:-1
			})
		}
	}
	
	const removeItem = (id:number|string) => {
		dispatch(remove(appState.login.token,id));
		changeMode("cancel",0);
	}
	
	const editItem = (item:ShoppingItem) => {
		dispatch(edit(appState.login.token,item));
		changeMode("cancel",0);
	}
}

export default ShoppingList;