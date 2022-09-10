const express = require("express");
const app =express();
const PORT = process.env.PORT || 3001
const path = require("path");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const server = require("http").createServer(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var uname;

app.get("/",(req,res)=>
{
	// res.sendFile(__dirname + '/index.html');
	res.render("index");
})

app.post("/chat",(req,res)=>
{
  uname = req.body.uname;
	// res.sendFile(__dirname + '/index.html');
	res.render("chat",{
		"username" : req.body.uname
	});
})

app.get("/logout",(req,res)=>
{
	res.render("logout");
})



app.set('view engine', 'hbs');
app.use('/public', express.static('public'));

server.listen('3001', () => {
  console.log('Server listening on Port 3000');
})

const io = require('socket.io')(server);
io.on("connection", (socket) => {
  console.log(uname+" New user connected! ");
  // console.log("COnnected");

	socket.on('message',(msg)=>
	{
		socket.broadcast.emit('message',msg)
	})
})
