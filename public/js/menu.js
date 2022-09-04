function displayMenu(){
if (stage=="menu"){
	var proceed=false;
	
	clearCanvas();
	const font=Math.min(window.innerWidth/20,window.innerHeight/10);
	screen.font=font+"px Monospace";
	screen.fillStyle="rgb(0,0,0)";
	screen.fillText("Choose your level",centerX-font*4.5,centerY-font*2.6);
	
	if (!blind || (mouse.x>centerX-font*3 && mouse.x<centerX-font*0.4 && mouse.y>centerY-font*1.2 && mouse.y<centerY-font*0.6)){
		screen.fillStyle="rgb(0,0,0)";
		screen.font=font+"px Monospace";
		screen.fillText("Normal",centerX-font*3.2,centerY-font*0.6);
	}else{
		screen.fillStyle="rgb(128,128,128)";
		screen.font=font*0.8+"px Monospace";
		screen.fillText("Normal",centerX-font*3,centerY-font*0.6);
	}
	if (blind || (mouse.x>centerX+font*1 && mouse.x<centerX+font*3.2 && mouse.y>centerY-font*1.2 && mouse.y<centerY-font*0.6)){
		screen.fillStyle="rgb(0,0,0)";
		screen.font=font+"px Monospace";
		screen.fillText("Blind",centerX+font*0.8,centerY-font*0.6);
	}else{
		screen.fillStyle="rgb(128,128,128)";
		screen.font=font*0.8+"px Monospace";
		screen.fillText("Blind",centerX+font*1,centerY-font*0.6);
	}
	
	if (level=='easy' || (mouse.x>centerX-font*4.5 && mouse.x<centerX-font*2.7 && mouse.y>centerY+font*0.2 && mouse.y<centerY+font*1)){
		screen.fillStyle="rgb(0,0,0)";
		screen.font=font+"px Monospace";
		screen.fillText("Easy",centerX-font*4.7,centerY+font*0.9);
	}else{
		screen.fillStyle="rgb(128,128,128)";
		screen.font=font*0.8+"px Monospace";
		screen.fillText("Easy",centerX-font*4.5,centerY+font*0.8);
	}
	if (level=='medium' || (mouse.x>centerX-font*1.2 && mouse.x<centerX+font*1.5 && mouse.y>centerY+font*0.2 && mouse.y<centerY+font*1)){
		screen.fillStyle="rgb(0,0,0)";
		screen.font=font+"px Monospace";
		screen.fillText("Medium",centerX-font*1.4,centerY+font*0.9);
	}else{
		screen.fillStyle="rgb(128,128,128)";
		screen.font=font*0.8+"px Monospace";
		screen.fillText("Medium",centerX-font*1.2,centerY+font*0.8);
	}
	if (level=='hard' || (mouse.x>centerX+font*3 && mouse.x<centerX+font*4.8 && mouse.y>centerY+font*0.2 && mouse.y<centerY+font*1)){
		screen.fillStyle="rgb(0,0,0)";
		screen.font=font+"px Monospace";
		screen.fillText("Hard",centerX+font*2.8,centerY+font*0.9);
	}else{
		screen.fillStyle="rgb(128,128,128)";
		screen.font=font*0.8+"px Monospace";
		screen.fillText("Hard",centerX+font*3,centerY+font*0.8);
	}
	
	if (mouse.x>centerX-font*1.35 && mouse.x<centerX+font*1.45 && mouse.y>centerY+font*1.88 && mouse.y<centerY+font*2.68){
		screen.font=font+"px Monospace";
		screen.fillStyle="rgb(128,128,128)";
		screen.fillRect(centerX-font*1.5,centerY+font*1.73,font*3.1,font*1.1);
		screen.fillStyle="rgb(255,255,255)";
		screen.fillRect(centerX-font*1.35,centerY+font*1.88,font*2.8,font*0.8);
		screen.fillStyle="rgb(0,0,0)";
		screen.fillText("Start",centerX-font*1.3,centerY+font*2.6);
	}else{
		screen.font=font*0.8+"px Monospace";
		screen.fillStyle="rgb(128,128,128)";
		screen.fillRect(centerX-font*1.35,centerY+font*1.88,font*2.8,font*0.8);
		screen.fillStyle="rgb(255,255,255)";
		screen.fillText("Start",centerX-font*1.05,centerY+font*2.55);
	}

	if(mouse.clicked){
		mouse.clicked=false;
		mouse.doubleClick=false;
		mouse.right=false;
		if(mouse.left){
			mouse.left=false;
			if (mouse.x>centerX-font*4.5 && mouse.x<centerX-font*2.7 && mouse.y>centerY+font*0.2 && mouse.y<centerY+font*1){
				level="easy";
			}else if (mouse.x>centerX-font*1.2 && mouse.x<centerX+font*1.5 && mouse.y>centerY+font*0.2 && mouse.y<centerY+font*1){
				level="medium";
			}else if (mouse.x>centerX+font*3 && mouse.x<centerX+font*4.8 && mouse.y>centerY+font*0.2 && mouse.y<centerY+font*1){
				level="hard";
			}else if (mouse.x>centerX-font*3 && mouse.x<centerX-font*0.4 && mouse.y>centerY-font*1.2 && mouse.y<centerY-font*0.6){
				blind=false;
			}else if (mouse.x>centerX+font*1 && mouse.x<centerX+font*3.2 && mouse.y>centerY-font*1.2 && mouse.y<centerY-font*0.6){
				blind=true;
			}else if(level!='none' && mouse.x>centerX-font*1.35 && mouse.x<centerX+font*1.45 && mouse.y>centerY+font*1.88 && mouse.y<centerY+font*2.68){
				proceed=true;
				stage='game';
			}
		}
	}
	
if (proceed){	
	var row,column,mines,size;
	if (level=='easy'){
		row=9;
		column=9;
		mines=10;//10
	}else if (level=='medium'){
		row=16;
		column=16;
		mines=40;//40
	}else if (level=='hard'){
		row=16;
		column=30;
		mines=99;//99
	}


	size=Math.floor(Math.min(window.innerWidth/(column*1.2),window.innerHeight/(row*1.2)));
	gameSize={level:level,blind:blind,size:size,row:row,column:column,mines:mines,status:"playing",startTime:0,endTime:0,firstClick:true,countDown:-1,submitted:false};
	generateMines();
	stage="game";
	gameSize.startTime=new Date().getTime();
}
	screen.stroke();
}
}

function generateMines(){
	gameMap=[];
	for (var i=0;i<gameSize.row;i++){
		var arr=[];
		for (var j=0;j<gameSize.column;j++){
			arr.push({mine:false,clicked:false,flagged:false,number:0});
		}
		gameMap.push(arr);
	}
	for (var i=0;i<gameSize.mines;i++){
		var r=Math.floor(gameSize.row*Math.random());
		var c=Math.floor(gameSize.column*Math.random());
		while (gameMap[r][c].mine==true){
			r=Math.floor(gameSize.row*Math.random());
			c=Math.floor(gameSize.column*Math.random());
		}
		gameMap[r][c].mine=true;
	}
	for (var i=0;i<gameSize.row;i++){
	for (var j=0;j<gameSize.column;j++){
		for (var r=Math.max(0,i-1);r<Math.min(gameSize.row,i+2);r++){
		for (var c=Math.max(0,j-1);c<Math.min(gameSize.column,j+2);c++){
			if (gameMap[r][c].mine)
				gameMap[i][j].number+=1;
		}
		}
	}
	}
}