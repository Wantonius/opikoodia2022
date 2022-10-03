import React from 'react';

interface Props {
	name?:string
}

const HelloWorld:React.FC<Props> = (props:Props) => {
	
	let name:string = "World";
	if(props.name) {
		name = props.name;
	}
	return (
		<h2>Hello {name}</h2>
	)
}

export default HelloWorld;