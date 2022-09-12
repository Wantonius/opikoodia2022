import {useState,useEffect} from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import ShoppingForm from './components/ShoppingForm';

function App() {
	
	const [state,setState] = useState({
		list:[]
	})
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
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
	
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<ShoppingForm addItem={addItem}/>}/>
			</Routes>
		</div>
	);
}

export default App;
