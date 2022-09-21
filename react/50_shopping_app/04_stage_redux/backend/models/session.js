const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	user:{type:String,index:true},
	token:String,
	ttl:Number
})

module.exports = mongoose.model("Session",Schema);