import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

interface State {
	login:{
		isLogged:boolean
	}
}

function App() {
	
	const stateSelector = (state:State) => state.login.isLogged;
	
	const isLogged = useSelector(stateSelector);
	
	if(isLogged) {
		return(
		<div className="App">
			<Navbar/>
			<hr/>
			<Routes>
				<Route path="/" element={<ShoppingList/>}/>
				<Route path="/form" element={<ShoppingForm/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
		</div>
		)
	} else {
	return (
		<div className="App">
			<Navbar/>
			<hr/>
			<Routes>
				<Route path="/" element={<LoginPage/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
		</div>
	);
	}
}

export default App;
