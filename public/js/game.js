function displayGame(){
if (stage=="game"){
	const size=gameSize.size;
	const fieldWidth=gameSize.column*size;
	const fieldHeight=gameSize.row*size;
	clearCanvas();
	
	var font=size/2;
	screen.font=font+'px TimesNewRoman';
	var x,y;
	var allClear=true;
	var minesLeft=gameSize.mines;
	for (var r=0;r<gameSize.row;r++){
		y=centerY-fieldHeight/2+r*size;
		for (var c=0;c<gameSize.column;c++){
			x=centerX-fieldWidth/2+c*size;
			if (gameMap[r][c].clicked){
				if (gameMap[r][c].mine){
					screen.drawImage(mineImg,x+1,y+1,size-1,size-1);
				}else{
					screen.drawImage(safeImg,x+1,y+1,size-1,size-1);
					if(gameMap[r][c].number>0 && !gameSize.blind){
						screen.fillStyle=numberColor[gameMap[r][c].number];
						screen.fillText(gameMap[r][c].number,x+size/2-font*0.2,y+size/2+font*0.3);
					}
				}
			}else{
				if (!gameMap[r][c].mine){
					allClear=false;
				}
				if(gameMap[r][c].flagged || (gameSize.status!="playing" && gameMap[r][c].mine)){
					if (gameSize.status=="lost" && gameMap[r][c].flagged && !gameMap[r][c].mine){
						screen.drawImage(wrongImg,x+1,y+1,size-1,size-1);
					}else if (gameMap[r][c].flagged){
						screen.drawImage(flagImg,x+1,y+1,size-1,size-1);			
						minesLeft--;
					}else{
						screen.drawImage(flagImg,x+1,y+1,size-1,size-1);
					}
				}else{
					screen.drawImage(noneImg,x+1,y+1,size-1,size-1);
				}				
			}
		}
	}
	
	screen.fillStyle="rgb(0,0,0)";
	for (var i=centerX-fieldWidth/2;i<=centerX+fieldWidth/2;i+=size){
		screen.fillRect(i,centerY-fieldHeight/2,1,fieldHeight);
	}
	for (var i=centerY-fieldHeight/2;i<=centerY+fieldHeight/2;i+=size){
		screen.fillRect(centerX-fieldWidth/2,i,fieldWidth,1);
	}

	if(mouse.clicked){
		mouse.clicked=false;
		if (gameSize.status=="playing"){
			var r=Math.floor((mouse.y-(centerY-fieldHeight/2))/size);
			var c=Math.floor((mouse.x-(centerX-fieldWidth/2))/size);
			if (r>=0 && c>=0 && r<gameSize.row && c<gameSize.column){
				inGameClick(r,c);
			}
		}else{
			mouse.doubleClick=false;
			mouse.left=false;
			mouse.right=false;
		}
	}
	
	var time;
	if (gameSize.status=="playing"){
		time=Math.floor((new Date().getTime()-gameSize.startTime)/1000);
	}else{
		time=Math.floor((gameSize.endTime-gameSize.startTime)/1000);
	}
	var seconds=time%60;
	if (seconds==0){
		seconds="00";
	}else if(seconds<10){
		seconds="0"+seconds;
	}
	var minutes=Math.floor(time/60)%60;
	if (minutes==0){
		minutes="00";
	}else if(minutes<10){
		minutes="0"+minutes;
	}
	var hours=Math.floor(time/3600);
	if (hours==0){
		hours="00";
	}else if(hours<10){
		hours="0"+hours;
	}
	font=window.innerHeight/30;
	screen.font=font+"px Monospace";
	screen.fillStyle="rgb(0,0,0)";
	screen.fillText("Time: "+hours+":"+minutes+":"+seconds,centerX-font*10.5,font*3);
	screen.fillText("Mines: "+minesLeft,centerX+font*4.5,font*3);

	if (allClear && gameSize.status=="playing"){
		gameSize.status="win";	
		gameSize.countDown=50;
		gameSize.endTime=new Date().getTime();
		//win sound
		winSound.load();
		winSound.play();
	}
	
	if (gameSize.status!="playing" && gameSize.countDown==0){
		if (gameSize.status=="win" && !gameSize.submitted && checkScore()){
			font=Math.floor(Math.min(window.innerWidth/11,window.innerHeight/11));
			screen.fillStyle="rgb(0,0,0)";
			screen.fillRect(centerX-font*3,centerY-font*1.4, font*6,font*2.8);
			screen.fillStyle="rgb(230,230,230)";
			screen.fillRect(centerX-font*2.9,centerY-font*1.3, font*5.8,font*2.6);
			screen.fillStyle="rgb(0,0,0)";
			screen.font=font*0.3+"px Monospace";
			screen.fillText("You are one of the top players.",centerX-font*2.6,centerY-font*0.5);
			screen.fillText("Please enter your name:",centerX-font*1.9,centerY-font*0.2);
			inputBox.style.left=centerX-font*1.2;
			inputBox.style.top=centerY;
			inputBox.style.width=font*2.4;
			inputBox.type="text";
			submitButton.style.left=centerX-30;
			submitButton.style.top=centerY+font*5/8;
			submitButton.style.width=60;
			submitButton.style.display="block";
		}else{
			stage="winLose";
		}	
	}else{
		gameSize.countDown--;
	}
	
	screen.stroke();
}
}

function showSurroundings(r0, c0){
	var arr=[];
	arr.push({row:r0,col:c0});
	for (var i=0;i<arr.length;i++){
		for (var r=Math.max(0,arr[i].row-1);r<Math.min(gameSize.row,arr[i].row+2);r++){
		for (var c=Math.max(0,arr[i].col-1);c<Math.min(gameSize.column,arr[i].col+2);c++){
			if (gameMap[r][c].number==0 && !gameMap[r][c].clicked){
				arr.push({row:r,col:c});
			}
			gameMap[r][c].clicked=true;
		}
		}
	}
}

function testFlag(r0, c0){
	var mineCount=0, wrong=false;
	for (var r=Math.max(0,r0-1);r<Math.min(gameSize.row,r0+2);r++){
	for (var c=Math.max(0,c0-1);c<Math.min(gameSize.column,c0+2);c++){
		if (gameMap[r][c].flagged && !gameMap[r][c].clicked){
			mineCount++;
			if (!gameMap[r][c].mine){
				wrong=true;
			}
		}
	}
	}

	if (mineCount==gameMap[r0][c0].number && gameMap[r0][c0].number!=0){
		for (var r=Math.max(0,r0-1);r<Math.min(gameSize.row,r0+2);r++){
		for (var c=Math.max(0,c0-1);c<Math.min(gameSize.column,c0+2);c++){
			if (!gameMap[r][c].flagged && !gameMap[r][c].clicked){
				gameMap[r][c].clicked=true;
				if (gameMap[r][c].number==0){
					showSurroundings(r,c);
				}
			}
		}
		}
		if (wrong){
			return -1;
		}else{
			return 0;
		}
	}else{
		return 1;
	}
}

function inGameClick(r,c){
	if (mouse.doubleClick || (mouse.left && mouse.right)){
		mouse.doubleClick=false;
		mouse.left=false;
		mouse.right=false;
		var succeed;
		if (!gameMap[r][c].mine && gameMap[r][c].clicked){
			succeed=testFlag(r,c);
		}
		if (succeed==0){
			//succeed sound
			succeedSound.load();
			succeedSound.play();
		}else if (succeed==1){
			failSound.load();
			failSound.play();
		}else if (succeed==-1){
			gameSize.status="lost";
			gameSize.countDown=50;
			gameSize.endTime=new Date().getTime();
			loseSound.load();
			loseSound.play();
		}
	}else if (mouse.left){
		mouse.left=false;
		if (gameMap[r][c].flagged){
			//flag sound
			flagSound.load();
			flagSound.play();
		}else{
			while(gameSize.firstClick && gameMap[r][c].number!=0){
				generateMines();
			}
			gameSize.firstClick=false;
			
			if (!gameMap[r][c].clicked){
				gameMap[r][c].clicked=true;
				if (gameMap[r][c].mine){
					gameSize.status="lost";
					gameSize.countDown=50;
					gameSize.endTime=new Date().getTime();
					loseSound.load();
					loseSound.play();
				}else if (gameMap[r][c].number==0){
					showSurroundings(r,c);
					//succeed sound
					if (gameSize.blind){
						//succeed sound
						succeedSound.load();
						succeedSound.play();
					}else{
						//click sound
						clickSound.load();
						clickSound.play();
					}
				}else{
					if (gameSize.blind){
						//number sound
						playNote(128+gameMap[r][c].number*64,100);
					}else{
						//click sound
						clickSound.load();
						clickSound.play();
					}
				}
			}else if(gameSize.blind){
				//number sound
				playNote(128+gameMap[r][c].number*64,100);
			}
		}
	}else if (mouse.right){
		mouse.right=false;
		if(gameMap[r][c].clicked){
			failSound.load();
			failSound.play();
		}else{
			if (gameMap[r][c].flagged){
				//flag sound
				flagSound.load();
				flagSound.play();
			}else{
				//unflag sound
				unflagSound.load();
				unflagSound.play();
			}
			gameMap[r][c].flagged=!gameMap[r][c].flagged;
		}
	}
}