const express = require("express");

let app = express();

app.use(express.json());

let port = process.env.PORT || 3001;

//DATABASE
let database = [];
let id = 100;

app.get("/api/shopping",function(request,response) {
	return response.status(200).json(database);
});

app.listen(port);

console.log("Running in port",port);