const express = require("express");

const router = express.Router();
//DATABASE
let database = [];
let id = 100;

router.get("/shopping",function(request,response) {
	let tempDatabase = database.filter((item) => item.user === request.session.user)
	return response.status(200).json(tempDatabase);
});

router.post("/shopping",function(req,res) {
	let item = {
		id:id,
		type:req.body.type,
		count:req.body.count,
		price:req.body.price,
		user:req.session.user
	}
	database.push(item);
	id++;
	return res.status(201).json(item);
})

router.delete("/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			if(database[i].user !== req.session.user) {
				return res.status(409).json({message:"You are not authorized to remove this item"});
			}
			database.splice(i,1);
			return res.status(200).json({message:"Success"});
		}
	}
	return res.status(404).json({message:"Not found!"});
})

router.put("/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let item = {
		id:tempId,
		type:req.body.type,
		count:req.body.count,
		price:req.body.price,
		user:req.session.user
	}
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			if(database[i].user !== req.session.user) {
				return res.status(409).json({message:"You are not authorized to edit this item"});
			}			
			database.splice(i,1,item);
			return res.status(200).json({message:"Success"})
		}
	}
	return res.status(404).json({message:"Not found!"});
})

module.exports = router;