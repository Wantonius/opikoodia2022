import './App.css';
import {useState} from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
	
	const [state,setState] = useState({
		list:[],
		id:100
	})
	
	const addContact = (contact) => {
		contact.id = state.id;
		setState((state) => {
			return {
				list:state.list.concat(contact),
				id:state.id+1
			}
		})
	}
	
	const removeContact = (id) => {
		setState((state) => {
			let tempList = state.list.filter(contact => contact.id !== id);
			return {
				...state,
				list:tempList
			}
		})
	}
	
	const editContact = (contact) => {
		for(let i=0;i<state.list.length;i++) {
			if(state.list[i].id === contact.id) {
				let tempList = state.list.slice();
				tempList.splice(i,1,contact);
				setState({
					...state,
					list:tempList
				})
			}
		}
	}
	
	return (
		<div className="App">
			<ContactForm addContact={addContact}/>
			<hr/>
			<ContactList list={state.list} removeContact={removeContact}
				editContact={editContact}/>
		</div>
	);
}

export default App;
