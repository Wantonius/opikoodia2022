import {Link} from 'react-router-dom';

const Navbar = (props) => {
	
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<a className="navbar-brand">Shopping App</a>
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link to="/">Shopping List</Link>
				</li>
				<li className="nav-item">
					<Link to="/form">Add new item</Link>
				</li>
			</ul>		
		</nav>
	)
}

export default Navbar;