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
			let tempState = {
				...state,
				error:error
			}
			saveToStorage(tempState);
			return tempState;
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
	
	//STORAGE FUNCTIONS
	
	const saveToStorage = (state) => {
		sessionStorage.setItem("state",JSON.stringify(state));
	}
	
	useEffect(() => {
		if(sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			setState(state);
			if(state.isLogged) {
				getList(state.token);
			}
		}
	},[])
	
	//FETCH
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.url) {
				return;
			}
			setLoading(true);
			let response = await fetch(urlRequest.url,urlRequest.request);
			setLoading(false);
			if(response.ok) {
				switch(urlRequest.action) {
					case "additem":
						getList();
						return;
					case "getlist":
						let data = await response.json();
						if(data) {
							setState((state) => {
								let tempState = {
									...state,
									list:data
								}
								saveToStorage(tempState);
								return tempState;
							})
						}
						return;
					case "removeitem":
						getList();
						return;
					case "edititem":
						getList();
						return;
					case "register":
						setError("You have succesfully registered!");
						return;
					case "login":
						let loginData = await response.json();
						if(loginData) {
							setState((state) => {
								let tempState = {
									...state,
									isLogged:true,
									token:loginData.token
								}
								saveToStorage(tempState);
								return tempState;
							});
							getList(loginData.token);
						}
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
	
	//LOGIN API
	
	const register = (user) => {
		setUrlRequest({
			url:"/register",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"register"
		})
	}

	const login = (user) => {
		setUrlRequest({
			url:"/login",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"login"
		})
	}	
	
	const logout = () => {
		setUrlRequest({
			url:"/logout",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json",
							token:state.token}
			},
			action:"logout"
		})
	}
	
	//REST API
	
	const addItem = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json",
							token:state.token},
				body:JSON.stringify(item)
			},
			action:"additem"
		})
	}
	
	const getList = (token) => {
		let tempToken = state.token;
		if(token) {
			tempToken = token
		}
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"GET",
				headers:{"Content-Type":"application/json",
						token:tempToken}
			},
			action:"getlist"
		})
	}
	
	const removeItem = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				headers:{"Content-Type":"application/json",
						token:state.token}
			},
			action:"removeitem"
		})
	}
	
	const editItem = (item) => {
		setUrlRequest({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				headers:{"Content-Type":"application/json",
						token:state.token},
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
