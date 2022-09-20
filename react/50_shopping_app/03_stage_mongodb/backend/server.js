const express = require("express");
const apiroute = require("./routes/apiroute");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const sessionModel = require("./models/session");

let app = express();

app.use(express.json());

let port = process.env.PORT || 3001;

//MONGOOSE CONNECTION

const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;
const mongo_url = process.env.MONGODB_URL;

mongoose.connect("mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/shoppingdatabase?retryWrites=true&w=majority").then(
	() => console.log("Connected to mongodb"),
	(err) => console.log("Failed to connect. Reason",err)
);

mongoose.set("toJSON",{virtuals:true});

//LOGIN DATABASES

let registeredUsers = [];
let loggedSessions = [];
const time_to_live_diff = 3600000;

//MIDDLEWARE

createToken = () => {
	let token = crypto.randomBytes(64);
	return token.toString("hex");
}

isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({message:"Forbidden!"});
	}
	sessionModel.findOne({"token":req.headers.token},function(err,session) {
		if(err) {
			console.log("Failed to find session. Reason",err);
			return res.status(403).json({message:"Forbidden"})
		}
		if(!session) {
			return res.status(403).json({message:"Forbidden"})
		}
		let now = Date.now();
		if(now > session.ttl) {
			sessionModel.deleteOne({"_id":session._id},function(err) {
				if(err) {
					console.log("Failed to remove session. Reason",err)
				}
				return res.status(403).json({message:"Forbidden"})
			})
		} else {
			req.session = {};
			req.session.user = session.user;
			session.ttl = now + time_to_live_diff;
			session.save(function(err) {
				if(err) {
					console.log("Failed to resave session. Reason",err);
				}
				return next()
			})
		}
	})
}

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
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			return res.status(400).json({message:"Bad Request"}); 
		}
		let user = new userModel({
			username:req.body.username,
			password:hash
		})
		user.save(function(err,user) {
			if(err) {
				console.log("Failed to create user. Reason",err);
				if(err.code === 11000) {
					return res.status(409).json({message:"Username already in use"})
				} 
				return res.status(500).json({message:"Internal server error"})
			}
			if(!user) {
				return res.status(500).json({message:"Internal server error"})
			}
			return res.status(201).json({message:"User registered!"});
		})
	})
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message:"Bad Request"}); 
	}
	userModel.findOne({"username":req.body.username},function(err,user) {
		if(err) {
			console.log("Failed to login. Reason",err);
			return res.status(500).json({message:"Internal server error"})
		}
		if(!user) {
			return res.status(401).json({message:"Unauthorized"})
		}
		bcrypt.compare(req.body.password,user.password,function(err,success) {
			if(err) {
				console.log("Comparing passwords failed. Reason",err);
				return res.status(500).json({message:"Internal server error"})
			}
			if(!success) {
				return res.status(401).json({message:"Unauthorized"})
			}
			let token = createToken();
			let now = Date.now();
			let session = new sessionModel({
				user:req.body.username,
				ttl:now + time_to_live_diff,
				token:token
			})
			session.save(function(err) {
				if(err) {
					console.log("Saving session failed. Reason",err);
					return res.status(500).json({message:"Internal server error"})
				}
				return res.status(200).json({token:token});
			})
		})
	})
});

app.post("/logout",function(req,res) {
	if(!req.headers.token) {
		return res.status(404).json({message:"Not found"});
	}
	for(let i=0;i<loggedSessions.length;i++) {
		if(req.headers.token === loggedSessions[i].token) {
			loggedSessions.splice(i,1);
			return res.status(200).json({message:"Logged out"});
		}
	}
	return res.status(404).json({message:"Not found"});
})

app.use("/api",isUserLogged,apiroute);

app.listen(port);

console.log("Running in port",port);