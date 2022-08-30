function changeColor() {
	let header = document.getElementById("header");
	let color = "#";
	const letters = "0123456789ABCDEF";
	for(let i=0;i<6;i++) {
		let temp = Math.floor(Math.random()*16);
		color = color + letters[temp];
	}
	header.style.color = color;
	console.log(color);
}