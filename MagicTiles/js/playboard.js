/*
 * message.js
 * 功能：实现开始游戏、游戏帮助等说明信息的蒙版显示、隐藏
 * 实现：赵志恒
 * 主要技术：CSS、jQuery
 * 主要函数功能说明：
 * build_Init 初始化下方的棋盘
 * build_Block 生成转盘上的待选块
 * build_Div 生成用于鼠标拖拽事件的Div
 * rebuild_Div 当块被拖走时在当前位置重建新的块
 * set_Mode 设定待选块的状态，未被选择或正在拖动
 * get_Coor 获取被拖动块的屏幕坐标
 * get_Toolblock 获取当前道具的作用域
*/

/*初始化下方的棋盘*/
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

/*生成min~max-1的随机数*/
function Rand(min, max){
	return Math.floor(Math.random() * (max - min) + min);
}

/*生成转盘上的待选块*/
function build_Block(height, width, blocks, id, colornum){
	if (!colornum){
		colornum = colortable.length;
	}
	if (height * width < blocks){
		blocks = height * width;
	}
	if (height == -1 && width == -1){
		var tmp = Rand(2, 4);
		height = tmp;
		width = tmp;
	}
	if (blocks == -1){
		blocks = Rand(2, height * width);
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

/*生成用于鼠标拖拽事件的Div*/
function build_Div(height, width, blocks, id, colornum){
	var table = build_Block(height, width, blocks, id, colornum);
	var div = $("<div class='blockcontainer'" + "id='" + id + "'></div>");
	div.append(table);
	return div;
}

/*当块被拖走时在当前位置重建新的块*/
function rebuild_Div(height, width, blocks, id, colornum){
	var table = build_Block(height, width, blocks, id, colornum);
	var div = $("#" + id);
	div.empty();
	div.append(table);
	return div;
}

/*设置棋盘一些格子的属性*/
function build_Attr(x, y, attr){
	if (!attr){
		attr = "valid";
	}
	var length = Math.min(x.length, y.length);
	for (var i = 0; i < length; ++i){
		set_Single(x[i], y[i], attr);
	}
}

/*设置单个格子的属性*/
function set_Single(x, y, attr){
	$("#" + x + "-" + y).attr("class", attr);
}

/*设置单个格子的值*/
function set_Value(x, y, value){
	$("#" + x + "-" + y).text(value);
}

/*设定道具的可见性*/
function set_Tools(id, attr){
	if (id){
		for (var i = 0; i < id.length; ++i){
			$("#" + id[i]).css("display", attr);
		}
	}
}

/*设定待选块的状态，未被选择或正在拖动*/
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

/*设定当前分数*/
function set_Score(score){
	$(".score").text("Score:" + score);
}

/*获得当前分数*/
function get_Score(){
	var tmp = $(".score").text();
	var value = tmp.replace(/[^0-9]/ig,"");
	if (tmp[6] == "-"){
		return -parseInt(value);
	}
	return parseInt(value);
}

/*设定计时器时间*/
function set_Timer(time, unit){
	if (!unit){
		unit = "s";
	}
	$(".timer").text(time + unit);
}

/*获取计时器时间*/
function get_Timer(){
	var value = $(".timer").text().replace(/[^0-9]/ig,"");
	return parseInt(value);
}

/*获取被拖动块的屏幕坐标*/
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

/*获取屏幕坐标对应的方格坐标*/
function get_Pos(left, top, width, height){
	for (var i = 0; i < height; ++i){
		for (var j = 0; j < width; ++j){
			var coor = get_Coor(i, j);
			if (Math.abs(coor.left - left) <= 20 &&
					Math.abs(coor.top - top) <= 20){
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

/*获取当前道具的作用域*/
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
	if (type == "Cross"){
		for (var i = x - 1; i <= x + 1; ++i)
			for (var j = y - 1; j <= y + 1; ++j){
				if ($("#" + i + "-" + j).attr("class") == "valid" && (i == x || j == y)){
					cx.push(i);
					cy.push(j);
				}
		}
	}
	if (type == "Bomb"){
		for (var i = 0; i < height; ++i)
			for (var j = 0; j < width; ++j){
				if ($("#" + i + "-" + j).attr("class") == "valid"){
					cx.push(i);
					cy.push(j);
				}
			}
	}

	if (type == "Female"){
		var dx = [-2, -2, -2, -1, -1, 0, 0, 0, 1, 2, 2, 2, 3];
		var dy = [-1, 0, 1, -1, 1, -1, 0, 1, 0, -1, 0, 1, 0];
		for (var i = 0; i < dx.length; ++i){
			if ($("#" + (x + dx[i]) + "-" + (y + dy[i])).attr("class") == "valid"){
				cx.push(x + dx[i]);
				cy.push(y + dy[i]);
			}
		}
	}
	if (type == "Male"){
		var dx = [-3, -3, -3, -2, -2, -1, -1, 0, 0, 0, 1, 1, 2, 2, 2];
		var dy = [1, 2, 3, 2, 3, 1, 3, -2, -1, 0, -2, 0, -2, -1, 0];
		for (var i = 0; i < dx.length; ++i){
			if ($("#" + (x + dx[i]) + "-" + (y + dy[i])).attr("class") == "valid"){
				cx.push(x + dx[i]);
				cy.push(y + dy[i]);
			}
		}
	}
	return {
		xs: cx,
		ys: cy
	}
}

/*使用道具并迭代消除过程*/
function use_Tools(x, y, type){ 
	var score = get_Score();
	if (score < 0){
	//	alert("No score");
		return false;
	}
	else{
		toolcost[type] += tooldelta[type];
		score -= toolcost[type];
		var coors = get_Toolblock(x, y, type);
		for (var i = 0; i < coors.xs.length; ++i){
			score += clear_Block(coors.xs[i], coors.ys[i]);
		}
		set_Score(score);
		return true;
	}
}

/*清除透明度属性*/
function clear_Opacity(width, height){
	$("td").css("opacity", "");
}

/*清除棋盘上坐标(x,y)的块*/
function clear_Block(x, y){
	var item = $("#" + x + "-" + y);
	var result = 0;
	if ($(item).text())
		result = parseInt($(item).text());
	$(item).text("");
	$(item).css("background-color", "");
	return result;
}

/*重置所有的道具*/
function clear_Tools(){
	var type = $(".selected").attr("id");
	if (type){
		set_Score(get_Score() + toolcost[type]);
		$(".score").css("color", "#000000");
		$(".selected").text($(".selected").attr("id"));
	}
	$(".tools").attr("class", "tools");
}

/*计算可用格子数*/
function count_Valid(){
	var height = $(".area-board tr").length;
	var width = $(".area-board td").length / height;
	var count = 0;
	for (var i = 0; i < height; ++i)
		for (var j = 0; j < width; ++j){
			if ($("#" + i + "-" + j).attr("class") == "valid"){
				count++;
			}
		}
	return count;
}
