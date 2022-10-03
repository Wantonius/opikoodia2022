import React,{ReactChild} from 'react';

interface Props {
	children:ReactChild;
}

const ContactCard:React.FC<Props> = (props:Props) => {
	
	let cardStyle:React.CSSProperties = {
		backgroundColor:"lightgreen",
		height:200,
		width:150,
		textAlign:"center",
		margin:10
	}
	return (
		<div style={cardStyle}>
			{props.children}
		</div>
	)
	
}

export default ContactCard;