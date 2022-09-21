const initialState = {
	list:[],
	id:100
}

const contactReducer = (state = initialState, action) => {
	console.log(action);
	let tempList = [];
	switch(action.type) {
		case "ADD_CONTACT":
			action.contact.id = state.id;
			tempList = state.list.concat(action.contact);
			return {
				list:tempList,
				id:state.id+1
			}
		case "REMOVE_CONTACT":
			tempList = state.list.filter(contact => contact.id !== action.id)
			return {
				...state,
				list:tempList
			}
		case "EDIT_CONTACT":
			tempList = state.list.slice();
			for(let i=0;i<tempList.length;i++) {
				if(action.contact.id === tempList[i].id) {
					tempList.splice(i,1,action.contact);
					return {
						...state,
						list:tempList
					}
				}
			}
			return state;
		default:
			return state;
	}
}

export default contactReducer;