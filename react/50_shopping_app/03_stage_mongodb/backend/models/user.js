const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	username:{type:String,unique:true},
	password:String
});

module.exports = mongoose.model("User",Schema);

/*
Multiple login sources user object

let Schema = mongoose.Schema({
	local:{
		username:{type:String,unique:true},
		password:String
	},
	facebook:{
		<Facebook stuff>
	},
	google:{
		<Google stuff>
	},
	...
})



*/