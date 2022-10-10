const express = require("express");
const apiroute = require("./routes/apiroute");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const sessionModel = require("./models/session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const mongoStore = require("connect-mongo");

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

//SESSION MANAGEMENT

app.use(session({
	name:"shopping-session",
	resave:false,
	secret:"NormallyNotInCode",
	saveUninitialized:false,
	cookie:{maxAge:1000*60*60},
	store: mongoStore.create({
		mongoUrl:"mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/shoppingdatabase?retryWrites=true&w=majority",
		collectionName:"sessions"
	})
}))

//PASSPORT

app.use(passport.initialize());
app.use(passport.session());

//PASSPORT STRATEGY

passport.use("local-login",new localStrategy({
	usernameField:"username",
	passwordField:"password",
	passReqToCallback:true
}, function(req,username,password,done) {
	if(!req.body) {
		return done(null,false,{message:"Bad request"})
	}
	if(!req.body.username || !req.body.password) {
		return done(null,false,{message:"Bad request"})
	}
	if(req.body.username < 4 || req.body.password < 8) {
		return done(null,false,{message:"Bad request"})
	}
	userModel.findOne({"username":username}, function(err,user) {
		if(err) {
			console.log("Error finding user. Reason:",err);
			return done(err);
		} 
		if(!user) {
			return done(null,false,{message:"Unauthorized"});
		}
		bcrypt.compare(password,user.password,function(err,success) {
			if(err) {
				console.log("Error comparing passwords. Reason:",err);
				return done(err);				
			}
			if(!success) {
				return done(null,false,{message:"Unauthorized"});
			}
			let token = createToken();
			req.session.token = token;
			req.session.username = username;
			return done(null,user);
		})
	})
}));

passport.serializeUser(function(user,done) {
	console.log("Serialize user");
	done(null,user._id);
})

passport.deserializeUser(function(_id,done) {
	console.log("Deserialize user");
	userModel.findById(_id,function(err,user) {
		if(err) {
			done(err);
		}
		return done(null,user);
	})
})

//MIDDLEWARE

createToken = () => {
	let token = crypto.randomBytes(64);
	return token.toString("hex");
}

isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({message:"Forbidden!"});
	}
	if(req.isAuthenticated()) {
		return next();
	} else {
		req.logout();
		req.session.destroy();
		return res.status(403).json({message:"Forbidden"});
	}
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

app.post("/login",passport.authenticate("local-login",{failureRedirect:"/"}),function(req,res) {
	return res.status(200).json({token:req.session.token})
});

app.post("/logout",function(req,res) {
	if(req.session) {
		req.session.destroy();
		req.logout(function(err) {
			return res.status(200).json({message:"Success"});
		});
	} else {
		return res.status(404).json({message:"Not found"});
	}
})

app.use("/api",isUserLogged,apiroute);

app.listen(port);

console.log("Running in port",port);