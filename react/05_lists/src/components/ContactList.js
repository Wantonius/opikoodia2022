import {useState} from 'react';

const ContactList = (props) => {
	
	const [state,setState] = useState({
		removeIndex:-1,
		editIndex:-1
	});
	
	const changeToRemoveMode = (index) => {
		setState({
			removeIndex:index,
			editIndex:-1
		})
	}

	const changeToEditMode = (index) => {
		setState({
			removeIndex:-1,
			editIndex:index
		})
	}

	const cancel = () => {
		setState({
			removeIndex:-1,
			editIndex:-1
		})
	}
	
	const removeContact = (id) => {
		props.removeContact(id);
		cancel();
	}

	let contacts = props.list.map((contact,index) => {
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
				<td><button onClick={() => changeToEditMode(index)}>Edit</button></td>
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