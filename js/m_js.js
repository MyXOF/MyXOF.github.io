//function $(id){return document.getElementsByClassName(id);}
var autokey = false;
var moveL,moveR;
var flagL,flagR;
function MoveLPicture(elementClass,final_x,final_y,interval){
	if(!document.getElementsByClassName) return false;
  	if(!document.getElementsByClassName(elementClass)) return false;
  	var Elem = document.getElementsByClassName(elementClass);
    var elem = Elem[0];
    if(Elem.length == 0){
      return false;
    }
  	if(flagL) {
    	clearTimeout(moveL);
      
  	}
  	if(!elem.style.left){
  		elem.style.left = -455 + "px";
  	}
  	if(!elem.style.top){
  		elem.style.top = 0 + "px";
  	}
  	var xpos = parseInt(elem.style.left);
  	var ypos = parseInt(elem.style.top);

  	if((xpos == final_x) && (ypos == final_y)){
  		flagL = true;
      
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
  var repeat = "MoveLPicture('"+elementClass+"',"+final_x+","+final_y+","+interval+")";
  moveL = setTimeout(repeat,interval);
}

function MoveRPicture(elementClass,final_x,final_y,interval){
	if(!document.getElementsByClassName) return false;
  	if(!document.getElementsByClassName(elementClass)) return false;
  	var Elem = document.getElementsByClassName(elementClass);
    if(Elem.length == 0){
      return false;
    }
    var elem = Elem[0];
  	if(flagR) {
    	clearTimeout(moveR);
      
  	}
  	if(!elem.style.right){
  		elem.style.right = -455 + "px";
  	}
  	if(!elem.style.top){
  		elem.style.top = 0 + "px";
  	}
  	var xpos = parseInt(elem.style.right);
  	var ypos = parseInt(elem.style.top);

  	if((xpos == final_x) && (ypos == final_y)){
  		flagR = true;
      NextToCurrent();
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
  elem.style.right = xpos + "px";
  elem.style.top = ypos + "px";
  var repeat = "MoveRPicture('"+elementClass+"',"+final_x+","+final_y+","+interval+")";
  moveR = setTimeout(repeat,interval);
}

function manualPlay(txt,direction){
  var box = document.getElementsByClassName("box");
  box.onmouseover = function(){autokey = true;};
  box.onmouseout = function(){autokey = false;};
  if(direction == 1){
    var leftImg = document.getElementsByClassName("lcurrent");
    var rightImg = document.getElementsByClassName("rcurent");
    var curentNum = parseInt(leftImg[0].id);
    var nextNum = (curentNum + 1) % 5;

    var nextImgL = document.createElement("img");
    //debugger;
    nextImgL.src = txt[nextNum].leftpos;
    nextImgL.alt = "";
    var jqlimg = $(nextImgL);
    var nextImgR = document.createElement("img");
    nextImgR.src = txt[nextNum].rightpos;
    nextImgR.alt = "";
    var jqrimg = $(nextImgR);

    var ldiv = document.createElement('div');
    ldiv.id = nextNum;
    ldiv.className = "lnext";
    var jqldiv = $(ldiv);
    //jqldiv.id = nextNum;
    jqlimg.appendTo(jqldiv);
    jqldiv.appendTo($(".box1"));

    var rdiv = document.createElement('div');
    rdiv.id = nextNum;
    rdiv.className = "rnext";
    var jqrdiv = $(rdiv);
    //jqrdiv.id = nextNum;
    jqrimg.appendTo(jqrdiv);
    jqrdiv.appendTo($(".box2"));

    MoveLPicture("lnext",0,0,10);
    MoveRPicture("rnext",0,0,10);
    var txtChange = document.getElementsByClassName("text");
    txtChange[0].childNodes[0].innerHTML = txt[nextNum].txt;
    //NextToCurrent();
  }
  else{
    var leftImg = document.getElementsByClassName("lcurrent");
    var rightImg = document.getElementsByClassName("rcurent");
    var curentNum = parseInt(leftImg[0].id);
    var nextNum = (curentNum - 1) % 5;
    if(nextNum < 0){
      nextNum += 5;
    }

    var nextImgL = document.createElement("img");
    //debugger;
    nextImgL.src = txt[nextNum].leftpos;
    nextImgL.alt = "";
    var jqlimg = $(nextImgL);
    var nextImgR = document.createElement("img");
    nextImgR.src = txt[nextNum].rightpos;
    nextImgR.alt = "";
    var jqrimg = $(nextImgR);

    var ldiv = document.createElement('div');
    ldiv.id = nextNum;
    ldiv.className = "lnext";
    var jqldiv = $(ldiv);
    //jqldiv.id = nextNum;
    jqlimg.appendTo(jqldiv);
    jqldiv.appendTo($(".box1"));

    var rdiv = document.createElement('div');
    rdiv.id = nextNum;
    rdiv.className = "rnext";
    var jqrdiv = $(rdiv);
    //jqrdiv.id = nextNum;
    jqrimg.appendTo(jqrdiv);
    jqrdiv.appendTo($(".box2"));

    MoveLPicture("lnext",0,0,10);
    MoveRPicture("rnext",0,0,10);
    var txtChange = document.getElementsByClassName("text");
    txtChange[0].childNodes[0].innerHTML = txt[nextNum].txt;
    //NextToCurrent();
  }
}

function NextToCurrent(){
	//var leftImgC = document.getElementsByClassName("lcurrent");
	//var rightImgC = document.getElementsByClassName("rcurent");
	var leftImgN = document.getElementsByClassName("lnext");
	var rightImgN = document.getElementsByClassName("rnext");
  if((flagL != true) || (flagR != true))
  {
      return;
  }
	//leftImgC[0].parentNode.removeChild(leftImgC[0]);
	//rightImgC[0].parentNode.removeChild(rightImgC[0]);
  $('.lcurrent').remove();
  $('.rcurrent').remove();
	leftImgN[0].className = "lcurrent";
	rightImgN[0].className = "rcurrent";
  flagR = false;
  flagL = false;
	//leftImgN.style.z-index = 1;
	//rightImgN.style.z-index = 1;
  var LeftIndex = document.getElementsByClassName('lcurrent');
  storage.LeftImgIndex = LeftIndex[0].childNodes[0].src;

  var RightIndex = document.getElementsByClassName('rcurrent');
  storage.RightImgIndex = RightIndex[0].childNodes[0].src;
}


function autoPlay(){
	if(autokey){
		return false;
	}
  var txt = json.Picture;
	var leftImg = document.getElementsByClassName("lcurrent");
	var rightImg = document.getElementsByClassName("rcurent");
	var curentNum = parseInt(leftImg[0].id);
	var nextNum = (curentNum + 1) % 5;

	var nextImgL = document.createElement("img");
    //debugger;
  nextImgL.src = txt[nextNum].leftpos;
  nextImgL.alt = "";
  var jqlimg = $(nextImgL);
  var nextImgR = document.createElement("img");
  nextImgR.src = txt[nextNum].rightpos;
  nextImgR.alt = "";
  var jqrimg = $(nextImgR);

  var ldiv = document.createElement('div');
  ldiv.id = nextNum;
  ldiv.className = "lnext";
  var jqldiv = $(ldiv);
  //jqldiv.id = nextNum;
  jqlimg.appendTo(jqldiv);
  jqldiv.appendTo($(".box1"));

  var rdiv = document.createElement('div');
  rdiv.id = nextNum;
  rdiv.className = "rnext";
  var jqrdiv = $(rdiv);
  //jqrdiv.id = nextNum;
  jqrimg.appendTo(jqrdiv);
  jqrdiv.appendTo($(".box2"));

  MoveLPicture("lnext",0,0,5);
  MoveRPicture("rnext",0,0,5);
  NextToCurrent();
  var txtChange = document.getElementsByClassName("text");
  txtChange[0].childNodes[0].innerHTML = txt[nextNum].txt;
    
}

function updateComment(){
  var authorInfo = document.getElementsByClassName('AuthorInfo');
  var authorComment = document.getElementsByClassName('AuthorComment');
  var authorDate = document.getElementsByClassName('AuthorDate');
  //debugger;
  for(var i = 0;i < 3;i++)
  {
    authorInfo[i].childNodes[0].src = NextComment.COMMENT[i].imgpos;
    authorInfo[i].childNodes[1].innerText = NextComment.COMMENT[i].author;
    authorComment[i].innerText = NextComment.COMMENT[i].context;
    var m_id = NextComment.COMMENT[i].id;
    var n = parseInt(m_id);
    authorDate[i].childNodes[1].innerText = "#" + (n+1);
    authorDate[i].childNodes[5].innerText = NextComment.COMMENT[i].Date;
  }
}

