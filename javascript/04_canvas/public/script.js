var canvas;
var ctx;
var running = 0;
var interval;

window.onload = function() {
	canvas = document.getElementById("mycanvas");
	ctx = canvas.getContext("2d");
	//get canvas and get draw context. //https://www.w3schools.com/html/html5_canvas.asp
}

function startCanvas() {
	let startButton = document.getElementById("startbutton");
	if(running) {
		running = 0;
		startButton.value = "Start";
		clearInterval(interval);
	} else {
		running = 1;
		startButton.value = "Stop";
		interval = setInterval(createRect,200);
	}
}

function createRect() {
	let x,y = 0;
	let side = 0;
	let color = "#";
	const colorpicker = "ABCDEF0123456789";
	x = Math.floor(Math.random()*400);
	y = Math.floor(Math.random()*400);
	side = Math.floor(Math.random()*80)+20;
	for(let i=0;i<6;i++) {
		let temp = Math.floor(Math.random()*16);
		color = color + colorpicker[temp];
	}
	ctx.fillStyle = color;
	ctx.fillRect(x,y,side,side);
}

function clearCanvas() {
	ctx.clearRect(0,0,500,500);
}
// Calculate the relative position of mouse event inside the canvas.
// The mouse event knows the coordinates in relative to the screen
// Function getBoundingClientRect gives us canvas position on the screen
// Substracting canvas position from mouse event position gives us position
// relative to canvas
function getMousePos(evt) {
	let rect = canvas.getBoundingClientRect();
	let tempX = Math.floor(evt.clientX - rect.left);
	let tempY = Math.floor(evt.clientY - rect.top);
	return {
		x:tempX,
		y:tempY
	}
}

function writeMessage(message) {
	clearCanvas();
	ctx.font = "18pt Arial";
	ctx.fillStyle = "black";
	ctx.fillText(message,10,25);
}

function canvasMouseMove(evt) {
	let mousePos = getMousePos(evt);
	let message = "Mouse position:"+mousePos.x+","+mousePos.y;
	writeMessage(message);
}
