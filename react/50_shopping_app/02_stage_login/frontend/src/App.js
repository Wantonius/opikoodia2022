import {useState,useEffect} from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';

function App() {

	
	const [state,setState] = useState({
		list:[],
		token:"",
		isLogged:false,
		loading:false,
		error:""
	})
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	//STATE FUNCTIONS
	
	const setLoading = (loading) => {
		setState((state) => {
			return {
				...state,
				loading:loading,
				error:""
			}
		})
	}
	
	const setError = (error) => {
		setState((state) => {
			return {
				...state,
				error:error
			}
		})
	}
	
	const cleanState = () => {
		let state = {
			list:[],
			isLogged:false,
			token:"",
			loading:false,
			error:""
		}
		saveToStorage(state);
		setState(state);
	}
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.url) {
				return;
			}
			let response = await fetch(urlRequest.url,urlRequest.request);
			if(response.ok) {
				switch(urlRequest.action) {
					case "additem":
						getList();
						return;
					case "getlist":
						let data = await response.json();
						if(data) {
							setState({
								list:data
							})
						}
						return;
					case "removeitem":
						getList();
						return;
					case "edititem":
						getList();
						return;
					default:
						return;
				}
			} else {
				switch(urlRequest.action) {
					case "additem":
						console.log("Server responded with a status",response.status);
						return;
					case "getlist":
						console.log("Server responded with a status",response.status);
						return;
					case "removeitem":
						console.log("Server responded with a status",response.status);
						return;
					case "edititem":
						console.log("Server responded with a status",response.status);
						return;
					default:
						return;
				}
			}
		}
		
		fetchData();
	},[urlRequest]);
	
	const addItem = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(item)
			},
			action:"additem"
		})
	}
	
	const getList = () => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"GET",
				headers:{"Content-Type":"application/json"}
			},
			action:"getlist"
		})
	}
	
	const removeItem = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				headers:{"Content-Type":"application/json"}
			},
			action:"removeitem"
		})
	}
	
	const editItem = (item) => {
		setUrlRequest({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(item)
			},
			action:"edititem"
		})
	}
	
	return (
		<div className="App">
			<Navbar/>
			<hr/>
			<Routes>
				<Route exact path="/" element={<ShoppingList editItem={editItem} removeItem={removeItem} list={state.list}/>}/>
				<Route path="/form" element={<ShoppingForm addItem={addItem}/>}/>
			</Routes>
		</div>
	);
}

export default App;
