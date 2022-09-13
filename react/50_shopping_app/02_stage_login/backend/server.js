const express = require("express");
const apiroute = require("./routes/apiroute");
const bcrypt = require("bcrypt");

let app = express();

app.use(express.json());

let port = process.env.PORT || 3001;

//LOGIN DATABASES

let registeredUsers = [];
let loggedSessions = [];

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message:"Bad Request"}); 
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			return res.status(409).json({message:"Username is already in use"});
		}
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			return res.status(400).json({message:"Bad Request"}); 
		}
		let user = {
			username:req.body.username,
			password:hash
		}
		registeredUsers.push(user);
		console.log(user);
		return res.status(201).json({message:"Register success"});
	})
})

app.use("/api",apiroute);

app.listen(port);

console.log("Running in port",port);