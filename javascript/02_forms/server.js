const express = require("express");

let app = express();

app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));

//database

let database = [];

app.post("/contact",function(req,res) {
	console.log(req);
	let contact = {
		"firstname":req.body.firstname,
		"lastname":req.body.lastname
	}
	database.push(contact);
	return res.status(200).json(database);
})

app.listen(3000);

console.log("Running in port 3000");