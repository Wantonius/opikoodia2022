import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';

const ContactList = (props) => {
	
	const [state,setState] = useState({
		removeIndex:-1,
		editIndex:-1,
		firstname:"",
		lastname:"",
		email:"",
		phone:""
	});
	
	const list = useSelector(state => state.list);
	const dispatch = useDispatch();
	
	const changeToRemoveMode = (index) => {
		setState({
			...state,
			removeIndex:index,
			editIndex:-1
		})
	}

	const changeToEditMode = (index,contact) => {
		setState({
			firstname:contact.firstname,
			lastname:contact.lastname,
			email:contact.email,
			phone:contact.phone,
			removeIndex:-1,
			editIndex:index
		})
	}
	
	const onChange = (event) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const cancel = () => {
		setState({
			removeIndex:-1,
			editIndex:-1,
			firstname:"",
			lastname:"",
			email:"",
			phone:""
		})
	}
	
	const removeContact = (id) => {
		dispatch({
			type:"REMOVE_CONTACT",
			id:id
		})
		cancel();
	}

	const editContact = (id) => {
		let contact = {
			id:id,
			firstname:state.firstname,
			lastname:state.lastname,
			email:state.email,
			phone:state.phone
		}
		dispatch({
			type:"EDIT_CONTACT",
			contact:contact
		})
		cancel();
	}

	let contacts = list.map((contact,index) => {
		if(state.editIndex === index) {
			return(
				<tr key={contact.id}>
					<td><input type="text"
								name="firstname"
								id="firstname"
								onChange={onChange}
								value={state.firstname}/></td>
					<td><input type="text"
								name="lastname"
								id="lastname"
								onChange={onChange}
								value={state.lastname}/></td>				
					<td><input type="email"
								name="email"
								id="email"
								onChange={onChange}
								value={state.email}/></td>
					<td><input type="tel"
								name="phone"
								id="phone"
								onChange={onChange}
								value={state.phone}/></td>
					<td><button onClick={() => editContact(contact.id)}>Save</button></td>
					<td><button onClick={() => cancel()}>Cancel</button></td>
				</tr>
			)
		}
		if(state.removeIndex === index) {
			return ( <tr key={contact.id}>
				<td>{contact.firstname}</td>
				<td>{contact.lastname}</td>
				<td>{contact.email}</td>
				<td>{contact.phone}</td>
				<td><button onClick={() => cancel()}>Cancel</button></td>
				<td><button onClick={() => removeContact(contact.id)}>Confirm</button></td>
			</tr>
			)
		}
		return(
			<tr key={contact.id}>
				<td>{contact.firstname}</td>
				<td>{contact.lastname}</td>
				<td>{contact.email}</td>
				<td>{contact.phone}</td>
				<td><button onClick={() => changeToRemoveMode(index)}>Remove</button></td>
				<td><button onClick={() => changeToEditMode(index,contact)}>Edit</button></td>
			</tr>
		)
	})
	return (
		<table>
			<thead>
				<tr>	
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Remove</th>
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
			{contacts}
			</tbody>
		</table>
	)

}

export default ContactList;