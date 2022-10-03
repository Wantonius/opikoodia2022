import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingItem from './models/ShoppingItem';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import {useAction} from './hooks/useAction'


function App() {
	
	const [list,loading,addToList,removeFromList] = useAction();
	
	let header = <h2>Shopping App</h2>
	if(loading) {
		header = <h2>Loading ...</h2>
	}
	
	return (
		<div className="App">
			{header}
			<ShoppingForm addToList={addToList}/>
			<hr/>
			<ShoppingList list={list} removeFromList={removeFromList}/>
		</div>
	);
}

export default App;
