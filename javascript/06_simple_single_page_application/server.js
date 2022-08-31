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

app.listen(port);

console.log("Running in port "+port);