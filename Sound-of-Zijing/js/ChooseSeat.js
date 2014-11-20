$(document).ready(function(){

	
	$('body').append(CreateRegion());
	$('.SeatUnit').click(function(){
		//alert("1");
		var jqSeatUnit = $(this);
		var this_col = jqSeatUnit.attr("id");
    	var this_row = jqSeatUnit.parent().attr("id");
    	var this_openid = JSGetStringFromURL("openid");
    	
	})

	function CreateRegion(){
		var jqRegion = $('<div class = "Region"></div>');
		jqRegion.append(CreateSeatLine(0,10));
		jqRegion.append(CreateSeatLine(1,10));
		jqRegion.append(CreateClearFix());
		return(jqRegion);
	}

	function CreateSeatLine(row,col){
		var jqSeatLine = $('<div class = "SeatLine"></div>');
		jqSeatLine.attr('id',row.toString());
		for(var i = 0;i < col;i++){
			jqSeatLine.append(CreateSeatUnit(i,true));
		}
		jqSeatLine.append(CreateClearFix());
		return(jqSeatLine);

	}

	function CreateSeatUnit(col,flag){

		var jqSeatUnit = $('<div class = "SeatUnit"></div>');	
		jqSeatUnit.attr('id',col.toString());
		if(flag){
			jqSeatUnit.addClass('Seat-Active');
		}
		else{
			jqSeatUnit.addClass('Seat-Disactive');
		}
		return(jqSeatUnit);

	}

	function CreateClearFix(){
		var jqClearFix = $('<div class = "ClearFix"></div>');
		return(jqClearFix);
	}

	function JSGetStringFromURL(name) 
	{ 
     	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
     	var r = window.location.search.substr(1).match(reg); 
     	if(r!=null){
     		return unescape(r[2]);
     	} 
     	return null; 
	}


});
