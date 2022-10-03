import React,{ReactChild} from 'react';

interface Props {
	header:ReactChild;
	media?:ReactChild;
	content:ReactChild;
}

const NamedChildrenCard:React.FC<Props> =(props:Props) => {
	
	let cardStyle:React.CSSProperties = {
		backgroundColor:"lightblue",
		height:200,
		width:150,
		textAlign:"center",
		margin:10
	}
	return(
		<div style={cardStyle}>
			<div>{props.header}</div>
				{props.media ? <div>{props.media}</div> : <></>}
			<div>{props.content}</div>
		</div>
	)
}

export default NamedChildrenCard;