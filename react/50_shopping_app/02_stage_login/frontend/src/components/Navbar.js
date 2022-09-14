import {Link} from 'react-router-dom';

const Navbar = (props) => {
	
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<a className="navbar-brand" style={{marginLeft:10}}>Shopping App</a>
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link to="/">Shopping List</Link>
				</li>
				<li className="nav-item" style={{marginLeft:10}}>
					<Link to="/form">Add new item</Link>
				</li>
			</ul>		
		</nav>
	)
}

export default Navbar;