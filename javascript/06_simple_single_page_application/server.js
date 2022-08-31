const express = require("express");

let app = express();

//database

let database = [];
let id = 100;

let port = process.env.PORT || 3000;

//middleware json and static

app.use(express.json());
app.use(express.static("public"));

//REST API

app.get("/api/contacts/",function(req,res) {
	return res.status(200).json(database);
})

app.post("/api/contacts/",function(req,res) {
	let contact = {
		id:id,
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		email:req.body.email,
		phone:req.body.phone
	}
	id++;
	database.push(contact);
	return res.status(201).json(contact);
})

app.delete("/api/contacts/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let tempDatabase = database.filter(contact => contact.id !== tempId);
	database = tempDatabase;
	return res.status(200).json({message:"success!!"});
})

app.put("/api/contacts/:id", function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let contact = {
		id:tempId,
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		email:req.body.email,
		phone:req.body.phone
	}
	for(let i=0;i<database.length;i++) {
		if(tempId === database[i].id) {
			database.splice(i,1,contact);
			return res.status(200).json({message:"success!!"})
		}
	}
	return res.status(404).json({message:"not found"});
})

app.listen(port);

console.log("Running in port "+port);






