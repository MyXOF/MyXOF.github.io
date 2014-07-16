var colortable = ["#3BA0FA", "#FF4647", "#F8D800",
				  "#FFAA00", "#00FF22"];
var toolcost = {
	"Row" : 30,
	"Column" : 20,
	"Color" : 100,
	"Block" : 40
};

function build_Init(height, width, initattr){
	if (!initattr){
		initattr = "valid";
	}
	var board = $("div.area-board");
	board.empty();
	board.append("<table class='playboard' border='0'>\n</table>");
	var table = $("table.playboard");
	for (var i = 0; i < height; ++i){
		var element=$("<tr></tr>");
		for (var j = 0; j < width; ++j){
			element.append("<td id='" + i + "-" + j + "'></td>");
		}
		table.append(element);
	}
	for (var i = 0; i < height; ++i){
		for (var j = 0; j < width; ++j){
			$("#" + i + "-" + j).attr("class", initattr);
		}
	}
}

function Rand(min, max){
	return Math.floor(Math.random() * (max - min) + min);
}

function build_Block(height, width, blocks, id, colornum){
	if (!colornum){
		colornum = colortable.length;
	}
	if (height * width < blocks){
		blocks = height * width;
	}
	var color = colortable[Rand(0, colornum)];
	var x = [], y = [];
	var count = 0;
	for (var i = 0; i < height; ++i){
		for (var j = 0; j < width; ++j){
			x[count] = i;
			y[count] = j;
			count++;
		}
	}
	for (var i = 0; i < blocks; ++i){
		var t = Rand(i, count);
		var tx = x[i], ty = y[i];
		x[i] = x[t]; y[i] = y[t];
		x[t] = tx; y[t] = ty;
	}
	var table = $("<table class='playblock' border='0'></table>");
	for (var i = 0; i < height; ++i){
		var element=$("<tr></tr>");
		for (var j = 0; j < width; ++j){
			element.append("<td id='" + id + "-" + i + "-" + j + "' class='invalid'>" + Rand(0, 10) + "</td>");
		}
		table.append(element);
	}
	for (var i = 0; i < blocks; ++i){
		$(table).find("#" + id + "-" + x[i] + "-" + y[i]).attr("class", "valid").css("background-color", color);
	}
	return table;
}

function build_Div(height, width, blocks, id, colornum){
	var table = build_Block(height, width, blocks, id, colornum);
	var div = $("<div class='blockcontainer'" + "id='" + id + "'></div>");
	div.append(table);
	return div;
}

function rebuild_Div(height, width, blocks, id, colornum){
	var table = build_Block(height, width, blocks, id, colornum);
	var div = $("#" + id);
	div.empty();
	div.append(table);
	return div;
}

function build_Attr(x, y, attr){
	if (!attr){
		attr = "valid";
	}
	var length = Math.min(x.length, y.length);
	for (var i = 0; i < length; ++i){
		set_Single(x[i], y[i], attr);
	}
}

function set_Single(x, y, attr){
	$("#" + x + "-" + y).attr("class", attr);
}

function set_Value(x, y, value){
	$("#" + x + "-" + y).text(value);
}

function set_Mode(id, mode){
	if (mode == "Move"){
		$("#" + id).find("table").attr("class", "playboard").css("margin","0");
		/*
		$("#" + id).find("td").css({
			"width":"50px",
			"height":"50px",
			"min-width":"50px",
			"min-height":"50px",
			"border":"2px solid #FFFFFF",
			"border-radius":"10%"
		});*/
	}
	if (mode == "Static"){
		$("#" + id).find("table").attr("class", "playblock");
		/*
		$("#" + id).find("td").css({
			"width":"auto",
			"height":"auto",
			"min-width":"0",
			"min-height":"0",
			"border":"1px solid #FFFFFF",
			"border-radius":"10%"
		});*/
	}
}

function set_Score(score){
	$(".score").text("Score:" + score);
}

function get_Score(){
	var value = $(".score").text().replace(/[^0-9]/ig,""); 
	return parseInt(value);
}

function set_Timer(time, unit){
	if (!unit){
		unit = "s";
	}
	$(".timer").text(time + unit);
}

function get_Timer(){
	var value = $(".timer").text().replace(/[^0-9]/ig,"");
	return parseInt(value);
}

function get_Coor(x, y, id){
	if (!id){
		id="";
	}
	var offsetX = $("#" + id + x + "-" + y).offset().left;
	var offsetY = $("#" + id + x + "-" + y).offset().top;
	return {
		left:offsetX,
		top:offsetY
	};
}

function get_Pos(left, top, width, height){
	for (var i = 0; i < height; ++i){
		for (var j = 0; j < width; ++j){
			var coor = get_Coor(i, j);
			if (Math.abs(coor.left - left) <= 10 &&
					Math.abs(coor.top - top) <= 10){
				return {
					x:i,
					y:j
				};
			}
		}
	}
	return {
		x:-1,
		y:-1
	}
}

function get_Toolblock(x, y, type){
	var cx = [], cy = [];
	var height = $(".area-board tr").length;
	var width = $(".area-board td").length / height;
	if (type == "Row"){
		for (var i = 0; i < width; ++i){
			if ($("#" + x + "-" + i).attr("class") == "valid"){
				cx.push(x);
				cy.push(i);
			}
		}
	}
	if (type == "Column"){
		for (var i = 0; i < height; ++i){
			if ($("#" + i + "-" + y).attr("class") == "valid"){
				cx.push(i);
				cy.push(y);
			}
		}
	}
	if (type == "Block"){
		for (var i = x - 1; i <= x + 1; ++i)
			for (var j = y - 1; j <= y + 1; ++j){
				if ($("#" + i + "-" + j).attr("class") == "valid"){
					cx.push(i);
					cy.push(j);
				}
		}
	}
	if (type == "Color"){
		for (var i = 0; i < height; ++i)
			for (var j = 0; j < width; ++j){
				if ($("#" + i + "-" + j).attr("class") == "valid")
					if ($("#" + i + "-" + j).css("background-color") == $("#" + x + "-" + y).css("background-color")){
						cx.push(i);
						cy.push(j);
					}
			}
	}
	return {
		xs: cx,
		ys: cy
	}
}

function use_Tools(x, y, type){ 
	var score = get_Score();
	if (!toolcost[type]){
		return ;
	}
	if (score < 0){
	//	alert("No score");
		return false;
	}
	else{
		score -= toolcost[type];
		var coors = get_Toolblock(x, y, type);
		for (var i = 0; i < coors.xs.length; ++i){
			score += clear_Block(coors.xs[i], coors.ys[i]);
		}
		set_Score(score);
		return true;
	}
}

function clear_Opacity(width, height){
	$("td").css("opacity", "");
}

function clear_Block(x, y){
	var item = $("#" + x + "-" + y);
	var result = 0;
	if ($(item).text())
		result = parseInt($(item).text());
	$(item).text("");
	$(item).css("background-color", "");
	return result;
}

function clear_Tools(){
	var type = $(".selected").text();
	if (type){
		set_Score(get_Score() + toolcost[type]);
		$(".score").css("color", "#000000");
	}
	$(".tools").attr("class", "tools");
}

$(document).ready(function(){
});
