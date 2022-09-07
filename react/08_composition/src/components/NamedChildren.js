const NamedChildren = (props) => {
	
	let cardStyle = {
		backgroundColor:"lightblue",
		height:200,
		width:150,
		textAlign:"center",
		margin:10
	}
	
	const {header,media,content} = props;
	return(
		<div style={cardStyle}>
			<div>{header}</div>
			{media ? <div>{media}</div> : <></>}
			<div>{content}</div>
		</div>
	
	)
}

export default NamedChildren;