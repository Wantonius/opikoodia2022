import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {logout} from '../actions/loginActions';
const Navbar = (props) => {
	
	const state = useSelector(state => state);
	const dispatch = useDispatch();
	
	let links = <ul className="navbar-nav"></ul>
	if(state.isLogged) {
		links = <ul className="navbar-nav">
					<li className="nav-item">
						<Link to="/">Shopping List</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/form">Add new item</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/" onClick={() => dispatch(logout(state.token))}>Logout</Link>
					</li>
			</ul>
	}
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<p className="navbar-brand" style={{marginLeft:10}}>Shopping App</p>
			{links}
		</nav>
	)
}

export default Navbar;