const express = require("express");
const mongoose = require("mongoose");

let app = express();

let port = process.env.PORT || 3000;

const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;
const mongo_url = process.env.MONGODB_URL;

mongoose.connect("mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/?retryWrites=true&w=majority").then(
	() => console.log("Connected to mongodb"),
	(err) => console.log("Failed to connect. Reason",err)
);

app.listen(port);

console.log("Running in port",port);




