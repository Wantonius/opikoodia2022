import React,{useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import {add} from '../actions/shoppingActions';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {useDispatch,useSelector} from 'react-redux';

interface TokenState {
	login:{
		token:string;
	}
}

interface State {
	type:string;
	count:number;
	price:number;
}

const ShoppingForm:React.FC<{}> = (props) => {
	
}

export default ShoppingForm;