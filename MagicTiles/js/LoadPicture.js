var PICTURE_NUMBER = 7;
var PICTURE_READY = 0; 
$(document).ready(function(){
	var CurrentUrl = window.location.href;
	var head = GetHomePage(CurrentUrl);
	head = head + "image/"
	var ImgArray = new Array;
	
	ImgArray[0] = head + "areaboard.png";
	ImgArray[1] = head + "areatools.png";
	ImgArray[2] = head + "statusImg.png";
	ImgArray[3] = head + "logo.png";
	ImgArray[4] = head + "MenuImg.png";
	ImgArray[5] = head + "spinImg.png";
	ImgArray[6] = head + "door.png";

	for(var i = 0;i < PICTURE_NUMBER;i++){
		$.ajax(
			{url:ImgArray[i],success:function(){
				PICTURE_READY++;
				if(PICTURE_READY == PICTURE_NUMBER){
					$(".cover").fadeOut('slow');
					PICTURE_READY = 0;
				}
			}
		})
	}

	
	
});

function GetHomePage(url){
	var l = url.length;
	if(l < 0){
		return(0);
	}
	for(var i = l - 1;i >= 0;i--){
		if(url[i] == "/"){
			
			return(url.substring(0,i+1));
		}
	}
	return(0);
}