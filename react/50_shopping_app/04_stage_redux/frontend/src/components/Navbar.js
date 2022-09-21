import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

const Navbar = (props) => {
	
	const state = useSelector(state => state);
	
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
						<Link to="/" onClick={props.logout}>Logout</Link>
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