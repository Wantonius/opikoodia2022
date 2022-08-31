window.onload = function() {
	createForm();
}

var mode = 0;

createForm = () => {
	let anchor = document.getElementById("anchor");
	let form = document.createElement("form");
	form.setAttribute("id","form");
	
	//first name input
	let firstnameinput = document.createElement("input");
	firstnameinput.setAttribute("type","text");
	firstnameinput.setAttribute("id","firstnameinput");
	firstnameinput.setAttribute("name","firstnameinput");
	let firstnamelabel = document.createElement("label");
	firstnamelabel.setAttribute("for","firstnameinput");
	let firstnametext = document.createTextNode("First Name");
	firstnamelabel.appendChild(firstnametext);
	
	//last name input
	let lastnameinput = document.createElement("input");
	lastnameinput.setAttribute("type","text");
	lastnameinput.setAttribute("id","lastnameinput");
	lastnameinput.setAttribute("name","lastnameinput");
	let lastnamelabel = document.createElement("label");
	lastnamelabel.setAttribute("for","lastnameinput");
	let lastnametext = document.createTextNode("Last Name");
	lastnamelabel.appendChild(lastnametext);
	
	//email input
	let emailinput = document.createElement("input");
	emailinput.setAttribute("type","email");
	emailinput.setAttribute("id","emailinput");
	emailinput.setAttribute("name","emailinput");
	let emaillabel = document.createElement("label");
	emaillabel.setAttribute("for","emailinput");
	let emailtext = document.createTextNode("Email");
	emaillabel.appendChild(emailtext);	

	//phone input
	let phoneinput = document.createElement("input");
	phoneinput.setAttribute("type","tel");
	phoneinput.setAttribute("id","phoneinput");
	phoneinput.setAttribute("name","phoneinput");
	let phonelabel = document.createElement("label");
	phonelabel.setAttribute("for","phoneinput");
	let phonetext = document.createTextNode("Phone");
	phonelabel.appendChild(phonetext);

	//submit Button
	let submitbutton = document.createElement("input");
	submitbutton.setAttribute("type","submit");
	submitbutton.setAttribute("value","Add");
	submitbutton.setAttribute("id","submitbutton");
	
	//build form
	
	let br = document.createElement("br");
	form.appendChild(firstnamelabel);
	form.appendChild(firstnameinput);
	form.appendChild(br);
	form.appendChild(lastnamelabel);
	form.appendChild(lastnameinput);
	form.appendChild(br.cloneNode());
	form.appendChild(emaillabel);
	form.appendChild(emailinput);
	form.appendChild(br.cloneNode());
	form.appendChild(phonelabel);
	form.appendChild(phoneinput);
	form.appendChild(br.cloneNode());
	form.appendChild(submitbutton);
	form.addEventListener("submit",function(event) {
		event.preventDefault();
		addContact();
	})
	
	anchor.appendChild(form);
}

addContact = async () => {
	let firstname = document.getElementById("firstnameinput");
	let lastname = document.getElementById("lastnameinput");
	let email = document.getElementById("emailinput");
	let phone = document.getElementById("phoneinput");
	let contact = {
		"firstname":firstname.value,
		"lastname":lastname.value,
		"email":email.value,
		"phone":phone.value
	}
	let method = "POST";
	let url = "/api/contacts/";
	let request = {
		method:method,
		mode:"cors",
		headers:{"Content-Type":"application/json"},
		body:JSON.stringify(contact)
	}
	let response = await fetch(url,request);
	if(response.ok) {
		firstname.value="";
		lastname.value="";
		email.value="";
		phone.value="";
		//TODO get contact list
	} else {
		console.log("Server responded with a status:",response.status);
	}
}

getContactList = async () => {
	let request = {
		method:"GET",
		mode:"cors",
		headers:{"Content-Type":"application/json"}
	}
	let response = await fetch("/api/contacts/",request);
	if(response.ok) {
		let data = await response.json();
		populateTable(data);
	} else {
		console.log("Server responded with a status:"+response.status);
	}
}







