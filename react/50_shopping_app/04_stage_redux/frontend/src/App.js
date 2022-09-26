import {useState,useEffect} from 'react';
import './App.css';
import {Routes,Route,Navigate} from 'react-router-dom';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {useSelector} from 'react-redux';

function App() {

	const appState = useSelector(state => state);

	//CONDITIONAL RENDERING
	
	let messageArea = <h4> </h4>
	if(appState.login.loading) {
		messageArea = <h4>Loading ...</h4>
	}
	if(appState.shopping.error) {
		messageArea = <h4>{appState.shopping.error}</h4>
	}
	if(appState.login.error) {
		messageArea = <h4>{appState.login.error}</h4>
	}
	let tempRender = <Routes>
						<Route exact path="/" element={<LoginPage/>}/>
						<Route path="*" element={<Navigate to="/"/>}/>
					 </Routes>
	if(appState.login.isLogged) {
		tempRender = <Routes>
						<Route exact path="/" element={<ShoppingList/>}/>
						<Route path="/form" element={<ShoppingForm />}/>
						<Route path="*" element={<Navigate to="/"/>}/>
					</Routes>
	}
	return (
		<div className="App">
			<Navbar />
			{messageArea}
			<hr/>
			{tempRender}
		</div>
	);
}

export default App;
