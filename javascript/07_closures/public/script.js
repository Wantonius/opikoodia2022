window.onload = function() {
	let fontsizer = changeFont();
	let bigbutton = document.getElementById("bigger");
	bigbutton.onclick = fontsizer.bigger;
	let smallbutton = document.getElementById("smaller");
	smallbutton.onclick = fontsizer.smaller;
}

function additionFactory(x) {
	return function(y) {
		return x+y;
	}
}

startAdding = () => {
	const add100 = additionFactory(100);
	const add50 = additionFactory(50);

	console.log(add100(50));
	console.log(add50(50));
}

let changeFont = function() {
	let fontSize = 16;
	document.body.style.fontSize = fontSize+"px";
	
	function changeFontSize(val) {
		fontSize += val;
		document.body.style.fontSize = fontSize+"px";
	}
	
	return {
		bigger:function() {
			console.log("bigger font");
			changeFontSize(2);
		},
		smaller:function() {
			console.log("smaller font");
			changeFontSize(-2);
		}
	}
}

