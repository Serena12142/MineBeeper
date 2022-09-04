const http = require('http');
const express = require('express');
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(__dirname+"/public"));
server.listen(8080,'0.0.0.0');
console.log("Server running on port 8080")

const fs = require('fs');
var highscores;
fs.readFile('highscores.json', 'utf8', (err, jsonString) => {
    	if (err) {
        	console.log("File read failed:", err);
		highscores={false:{easy:[{name:"",score:-1},{name:"",score:-1},{name:"",score:-1},{name:"",score:-1},{name:"",score:-1},],
				medium:[{name:"",score:-1},{name:"",score:-1},{name:"",score:-1},{name:"",score:-1},{name:"",score:-1},],
				hard:[{name:"",score:-1},{name:"",score:-1},{name:"",score:-1},{name:"",score:-1},{name:"",score:-1},]}
			,true:{easy:[{name:"",score:-1},{name:"",score:-1},{name:"",score:-1},{name:"",score:-1},{name:"",score:-1},],
				medium:[{name:"",score:-1},{name:"",score:-1},{name:"",score:-1},{name:"",score:-1},{name:"",score:-1},],
				hard:[{name:"",score:-1},{name:"",score:-1},{name:"",score:-1},{name:"",score:-1},{name:"",score:-1},]}};
    	}else{
    		highscores = JSON.parse(jsonString);
	}
});

io.on('connection',function(socket){
	socket.on('newscore',function(data){
		var blind=data.blind, level=data.level;
		var player = {name:data.name, score:data.score};
		highscores[blind][level][4]=player;
		for (var i=3;i>=0;i--){
			if (highscores[blind][level][i].score==-1 || highscores[blind][level][i].score>highscores[blind][level][i+1].score){
				highscores[blind][level][i+1]=highscores[blind][level][i];
				highscores[blind][level][i]=player;
			}
		}
		var jsonContent = JSON.stringify(highscores);
		fs.writeFile("highscores.json", jsonContent, 'utf8', function(err) {
  			if(err){
				console.log(err);
			}else{
				console.log("Highscore updated");
			}
		});
	});

	socket.on('highscore',function(data){
		var blind=data.blind, level=data.level;
		socket.emit("highscore",highscores[blind][level]);
	});

	socket.on('log',function(data){
		console.log(data);
	});
});
