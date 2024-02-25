const express = require("express");
require("dotenv").config();
const Port = process.env.PORT;
const app = express();

app.use(express.json());

app.use("/", require("./routes"));

app.use((err, req, res, next) => {
	console.log(err);
	return res.status(500).json({ success: false, message: "Something went wrong"});
});


app.listen(Port, () => {
	console.log(`Server is up on Port ${Port}`)
});