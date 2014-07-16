var Ring_Num = 12;
var Ring_Radius = 350;
var FlagDoorOpen = false;
var DOOR_STATUS = 0;
var MoveD,MoveRW,MoveLW;

function CreateRing(ring,n){
	 	var Angle = 360 / Ring_Num;
	 	for(var i = 0;i < Ring_Num;i++){
	 		var Cube = document.createElement('div');
	 		Cube.className = "Cube";
	 		Cube.id = "c" + (n * Ring_Num + i);
	 		var transform = 'rotateY('+(i * Angle)+'deg) translateZ('+Ring_Radius+'px)';
	 		Cube.style.webkitTransform = transform;
	 		
	 		ring.appendChild(Cube);
		}
		$('#ring-1').append($('<div class = "blank"></div>'));	
		/*
		var Blank = document.createElement('div');
		Blank.className = "blank";
		ring.appendChild(Blank);*/
}

function MoveDoor(elementClass,final_x,final_y,interval){
	if(!document.getElementsByClassName) return false;
  	if(!document.getElementsByClassName(elementClass)) return false;
  	var Elem = document.getElementsByClassName(elementClass);
    var elem = Elem[0];
    if(Elem.length == 0){
      return false;
    }
  	if(FlagDoorOpen) {
  		//debugger;
    	clearTimeout(MoveD);
    	
     }
  	if(!elem.style.left){
  		elem.style.left = 0 + "px";
  	}
  	if(!elem.style.top){
  		elem.style.top = 0 + "px";
  	}
  	var xpos = parseInt(elem.style.left);
  	var ypos = parseInt(elem.style.top);

  	if((xpos == final_x) && (ypos == final_y)){
  		FlagDoorOpen = true;
  		DOOR_STATUS = 0;
      	return;
  	}
  	if (xpos < final_x) {
    	var dist = Math.ceil((final_x - xpos)/10);
    	xpos = xpos + dist;
  	}
  	if (xpos > final_x) {
    	var dist = Math.ceil((xpos - final_x)/10);
    	xpos = xpos - dist;
  }
  if (ypos < final_y) {
    	var dist = Math.ceil((final_y - ypos)/10);
    	ypos = ypos + dist;
  }
  if (ypos > final_y) {
    	var dist = Math.ceil((ypos - final_y)/10);
    	ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  var repeat = "MoveDoor('"+elementClass+"',"+final_x+","+final_y+","+interval+")";
  MoveD = setTimeout(repeat,interval);
}


function OpenDoor(txt){
	DOOR_STATUS = 1;
	FlagDoorOpen = false;
		Name = "." + txt;
		var width = $(Name).width();
		var height = $(Name).height();
		
		MoveDoor(txt,0-width,0,55);
		//debugger;

	
}

function CloseDoor(txt){
	DOOR_STATUS = 1;
	FlagDoorOpen = false;
	MoveDoor(txt,0,0,55);
	
	
}


function set_Period(time){
	$("#ring-1").css("-webkit-animation-play-state", "paused");
	$(".blank").css("-webkit-animation-play-state", "paused");
	$("#ring-1").css("-webkit-animation-duration", time + "s");
	$(".blank").css("-webkit-animation-duration", time + "s");
	$("#ring-1").css("-webkit-animation-play-state", "running");
	$(".blank").css("-webkit-animation-play-state", "running");
}
