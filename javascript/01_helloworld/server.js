const express = require("express");

let app = express();

app.use(express.static("public"));

app.get("/greeting/:name",function(req,res) {
	return res.status(200).json({"greeting":"Hello "+req.params.name})
})

app.listen(3000);

console.log("Running in port 3000");