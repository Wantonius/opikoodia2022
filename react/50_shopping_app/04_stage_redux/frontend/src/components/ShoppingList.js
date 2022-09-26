import {useState} from 'react';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import {useDispatch,useSelector} from 'react-redux';
import {remove,edit} from '../actions/shoppingActions';

const ShoppingList = (props) => {
	
	const [state,setState] = useState({
		removeIndex:-1,
		editIndex:-1
	})
	
	const dispatch = useDispatch();
	
	const appState = useSelector((state) => {
		return {
			token:state.login.token,
			list:state.shopping.list
		}
	})
	
	const changeMode = (mode,index) => {
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
	
	const removeItem = (id) => {
		dispatch(remove(appState.token,id));
		changeMode("cancel");
	}
	
	const editItem = (item) => {
		dispatch(edit(appState.token,item));
		changeMode("cancel");
	}
	
	let items = appState.list.map((item,index) => {
		if(state.editIndex === index) {
			return <EditRow key={item.id} item={item} editItem={editItem} changeMode={changeMode}/>
		}		
		if(state.removeIndex === index) {
			return <RemoveRow key={item.id} item={item} changeMode={changeMode} removeItem={removeItem}/>
		}
		return <Row key={item.id} item={item} index={index} changeMode={changeMode}/>
	})
	
	return(
		<table className="table table-striped">
			<thead>
				<tr>
					<th>Type</th>
					<th>Count</th>
					<th>Price</th>
					<th>Remove</th>
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
			{items}
			</tbody>
		</table>
	)
}

export default ShoppingList;