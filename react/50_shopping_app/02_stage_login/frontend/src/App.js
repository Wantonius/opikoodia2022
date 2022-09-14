import {useState,useEffect} from 'react';
import './App.css';
import {Routes,Route,Navigate} from 'react-router-dom';
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
					case "logout":
						cleanState();
						return;
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					cleanState();
					setError("Your session has expired. Logging you out!");
					return;
				}
				switch(urlRequest.action) {
					case "additem":
						setError("Adding new item failed. Server responded with "+response.status+" "+response.statusText);
						return;
					case "getlist":
						setError("Fetching shopping list failed. Server responded with "+response.status+" "+response.statusText);
						return;
					case "removeitem":
						setError("Removing item failed. Server responded with "+response.status+" "+response.statusText);
						return;
					case "edititem":
						setError("Editing an item failed. Server responded with "+response.status+" "+response.statusText);
						return;
					case "register":
						if(response.status === 409) {
							setError("Username is already in use");
						} else {
							setError("Registering new user failed. Server responded with "+response.status+" "+response.statusText);
						}
						return;
					case "login":
						setError("Login failed. Server responded with "+response.status+" "+response.statusText);
						return;
					case "logout":
						cleanState();
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
	
	//CONDITIONAL RENDERING
	
	let messageArea = <h4> </h4>
	if(state.loading) {
		messageArea = <h4>Loading ...</h4>
	}
	if(state.error) {
		messageArea = <h4>{state.error}</h4>
	}
	let tempRender = <Routes>
						<Route exact path="/" element={<LoginPage setError={setError} login={login} register={register}/>}/>
						<Route path="*" element={<Navigate to="/"/>}/>
					 </Routes>
	if(state.isLogged) {
		tempRender = <Routes>
						<Route exact path="/" element={<ShoppingList editItem={editItem} removeItem={removeItem} list={state.list}/>}/>
						<Route path="/form" element={<ShoppingForm addItem={addItem}/>}/>
						<Route path="*" element={<Navigate to="/"/>}/>
					</Routes>
	}
	return (
		<div className="App">
			<Navbar isLogged={state.isLogged} logout={logout}/>
			{messageArea}
			<hr/>
			{tempRender}
		</div>
	);
}

export default App;
