function displayWinLose(){
if (stage=="winLose"){
	clearCanvas();
	const time=Math.floor((gameSize.endTime-gameSize.startTime)/1000);
	const font=Math.min(window.innerWidth/20,window.innerHeight/10);

	//centerX-=font*3;
	screen.font=font+"px Monospace";
	screen.fillStyle="rgb(0,0,0)";
	if (gameSize.status=='win'){
		screen.fillText("You won!",centerX-font*5,centerY-font*1.5);
		screen.font=font*0.5+"px Monospace";
		screen.fillText("You used "+time+" seconds",centerX-font*5.5,centerY-font*1);
	}else{
		screen.fillText("You lost...",centerX-font*5.5,centerY-font);
	}

	if (mouse.x>centerX-font*4 && mouse.x<centerX-font*2 && mouse.y>centerY && mouse.y<centerY+font*0.6){
		screen.fillStyle="rgb(0,0,0)";
		screen.font=font*0.8+"px Monospace";
		screen.fillText("Replay",centerX-font*4.2,centerY+font*0.6);
	}else{
		screen.fillStyle="rgb(120,120,120)";
		screen.font=font*0.6+"px Monospace";
		screen.fillText("Replay",centerX-font*4,centerY+font*0.5);
	}
	if (mouse.x>centerX-font*3.7 && mouse.x<centerX-font*2.4 && mouse.y>centerY+font*0.8 && mouse.y<centerY+font*1.3){
		screen.fillStyle="rgb(0,0,0)";
		screen.font=font*0.8+"px Monospace";
		screen.fillText("Exit",centerX-font*3.9,centerY+font*1.3);
	}else{
		screen.fillStyle="rgb(120,120,120)";
		screen.font=font*0.6+"px Monospace";
		screen.fillText("Exit",centerX-font*3.7,centerY+font*1.2);
	}

	//centerX+=font*4.8;
	socket.emit("highscore",{blind:gameSize.blind,level:gameSize.level});
	screen.fillStyle="rgb(0,0,0)";
	screen.fillRect(centerX+font*0.8,centerY-font*3, font*3.8,font*5);
	screen.fillStyle="rgb(230,230,230)";
	screen.fillRect(centerX+font*0.9,centerY-font*2.9, font*3.6,font*4.8);
	screen.fillStyle="rgb(0,0,0)";
	screen.font=font*0.55+"px Monospace";
	screen.fillText("Leaderboard",centerX+font*1,centerY-font*2.2);
	screen.font=font*0.4+"px Monospace";
	for (var i=0, y=-font*1.4;i<5;i++,y+=font*0.7){
		if (highscore[i].score>=0){
			screen.fillText(highscore[i].name,centerX+font*1.1,centerY+y);
			screen.fillText(highscore[i].score+"s",centerX+font*3.3,centerY+y);
		}
	}
	//centerX-=font*4.8;


	if(mouse.clicked){
		mouse.clicked=false;
		mouse.doubleClick=false;
		mouse.right=false;
		if(mouse.left){
			mouse.left=false;
			if (mouse.x>centerX-font*4 && mouse.x<centerX-font*2 && mouse.y>centerY && mouse.y<centerY+font*0.6){
				gameSize.status="playing";
				gameSize.startTime=new Date().getTime();
				gameSize.endTime=0;
				gameSize.firstClick=true;
				gameSize.countDown=-1;
				gameSize.submitted=false;
				generateMines();
				stage="game";
			}else if (mouse.x>centerX-font*3.7 && mouse.x<centerX-font*2.4 && mouse.y>centerY+font*0.8 && mouse.y<centerY+font*1.3){
				stage="menu";
			}
		}
	}
	//centerX+=font*3;

	screen.stroke();
}
}