
const socket = io();
socket.on("connection");

let name = document.getElementById("user").textContent;
let textarea =document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");


textarea.addEventListener('keyup',(e)=>
{
	if (e.key === "Enter") {
		sendMessage(e.target.value);
	}
})
//-----------------------To send message-----------------------
function sendMessage(message)
{
	let msg = {
		user : name,
		message : message.trim()
	}
	//Append
	appendMessage(msg,"outgoing");
	textarea.value='';

	//send to server
	socket.emit('message',msg)//defined in server.js
}
//--------------------Appending messages-----------------------
function appendMessage(msg,type){
	let mainDiv = document.createElement("div");
	let className = type;
	mainDiv.classList.add(className,'message')
 
	let markup = `
	<h6>${msg.user}</h6>
	<p>${msg.message}</p>
	`

	mainDiv.innerHTML = markup;

	messageArea.appendChild(mainDiv);
}


//-------------------Receive messsage-------------------------
socket.on('message',(msg)=>
{
	appendMessage(msg,'incoming')

})
