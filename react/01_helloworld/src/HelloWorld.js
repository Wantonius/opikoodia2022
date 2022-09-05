const HelloWorld = (props) => {
	
	let name = "World";
	if(props.name) {
		name = props.name;
	}
	return (
		<h2>Hello {name}</h2>
	)
}

export default HelloWorld;